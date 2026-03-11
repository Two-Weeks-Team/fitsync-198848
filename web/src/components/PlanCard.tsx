// "use client" ensures client‑side rendering
"use client";

import { useEffect, useState } from "react";
import { fetchTodayPlan } from '@/lib/api';
import { PencilIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function PlanCard() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadPlan = async () => {
    setLoading(true);
    try {
      const data = await fetchTodayPlan();
      setPlan(data);
    } catch {
      setPlan(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPlan();
  }, []);

  return (
    <section className="bg-card rounded-lg p-4 shadow-card">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-foreground">Today’s Plan</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => {/* placeholder for edit action */}}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition"
            aria-label="Edit plan"
          >
            <PencilIcon className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={loadPlan}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition"
            aria-label="Refresh plan"
          >
            <ArrowPathIcon className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>
      {loading ? (
        <p className={clsx('text-muted', 'animate-pulse')}>Loading…</p>
      ) : plan ? (
        <div className="space-y-1">
          <p className="text-sm text-foreground">
            {plan.workout?.title || 'Workout'} – {plan.workout?.duration_min ?? '--'} min
          </p>
          <p className="text-sm text-foreground">
            {plan.nutrition?.total_calories ?? '--'} kcal
          </p>
        </div>
      ) : (
        <p className="text-muted">No plan available.</p>
      )}
    </section>
  );
}
