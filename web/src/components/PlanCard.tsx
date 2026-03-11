"use client";
import { useEffect, useState } from "react";
import { fetchTodayPlan, swapExercise } from '@/lib/api';
import { PencilIcon, ArrowPathIcon, RefreshIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import SwapModal from '@/components/SwapModal';

export default function PlanCard() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [swapOpen, setSwapOpen] = useState(false);
  const [swapTarget, setSwapTarget] = useState<any>(null);

  const loadPlan = async () => {
    setLoading(true);
    try {
      const data = await fetchTodayPlan();
      setPlan(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlan();
  }, []);

  const handleSwap = async (replacement: string) => {
    if (!swapTarget) return;
    try {
      const payload = {
        type: 'exercise',
        original_id: swapTarget.id,
        replacement: { name: replacement, metadata: {} }
      };
      const result = await swapExercise(payload);
      setPlan(result.plan);
    } catch (e) {
      console.error(e);
    } finally {
      setSwapOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-card animate-pulse">
        <div className="h-8 w-3/4 bg-muted mb-4" />
        <div className="h-4 w-full bg-muted mb-2" />
        <div className="h-4 w-5/6 bg-muted" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-card">
        <p className="text-muted">No plan available for today.</p>
        <button
          onClick={loadPlan}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  const firstExercise = plan.workout?.exercises?.[0];

  return (
    <section className="bg-card rounded-lg p-6 shadow-card">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Today's AI Coach</h2>
        <button
          onClick={loadPlan}
          className="p-2 rounded-full bg-muted hover:bg-muted/80 transition"
          aria-label="Refresh plan"
        >
          <RefreshIcon className="h-5 w-5 text-foreground" />
        </button>
      </header>
      <div className="space-y-3">
        <div>
          <h3 className="font-medium text-primary">Workout</h3>
          <p>{plan.workout?.title || 'Custom HIIT'} – {plan.workout?.duration_min} min</p>
          {firstExercise && (
            <button
              onClick={() => {
                setSwapTarget(firstExercise);
                setSwapOpen(true);
              }}
              className="mt-2 flex items-center text-accent hover:underline"
            >
              <PencilIcon className="h-4 w-4 mr-1" aria-hidden="true" />
              Swap "{firstExercise.name}"
            </button>
          )}
        </div>
        <div>
          <h3 className="font-medium text-primary">Nutrition</h3>
          <p>{plan.nutrition?.total_calories} kcal total</p>
        </div>
      </div>
      {swapOpen && swapTarget && (
        <SwapModal
          currentName={swapTarget.name}
          onClose={() => setSwapOpen(false)}
          onConfirm={handleSwap}
        />
      )}
    </section>
  );
}
