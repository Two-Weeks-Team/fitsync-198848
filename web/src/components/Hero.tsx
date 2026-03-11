"use client";
import { useEffect, useState } from "react";
import { fetchTodayPlan } from '@/lib/api';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface PlanSummary {
  workout: { title?: string; duration_min?: number };
  nutrition: { total_calories?: number };
}

export default function Hero() {
  const [plan, setPlan] = useState<PlanSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayPlan()
      .then((data) => {
        setPlan({
          workout: {
            title: data.workout?.title || 'Your AI‑crafted workout',
            duration_min: data.workout?.duration_min
          },
          nutrition: { total_calories: data.nutrition?.total_calories }
        });
      })
      .catch(() => setPlan(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-primary text-white rounded-lg p-6 shadow-card flex items-center justify-between animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Good morning, fit friend!</h1>
        {loading ? (
          <p className="mt-2 animate-pulse">Loading today’s plan…</p>
        ) : plan ? (
          <p className="mt-2 text-sm">
            {plan.workout.title} – {plan.workout.duration_min} min • {plan.nutrition.total_calories} kcal
          </p>
        ) : (
          <p className="mt-2 text-sm">Unable to fetch plan. Try again later.</p>
        )}
      </div>
      <SparklesIcon className="h-12 w-12 opacity-70" aria-hidden="true" />
    </section>
  );
}
