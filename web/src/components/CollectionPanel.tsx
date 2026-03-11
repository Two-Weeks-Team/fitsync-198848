"use client";
import { useEffect, useState } from "react";
import { apiClient } from '@/lib/api';
import { ClockIcon } from '@heroicons/react/24/outline';

export default function CollectionPanel() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder endpoint – in MVP we reuse plans endpoint as mock history
    apiClient<any[]>('/api/v1/coach/today')
      .then((data) => setHistory([data]))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-card rounded-lg p-4 shadow-card animate-pulse">
        <div className="h-5 w-1/2 bg-muted" />
      </section>
    );
  }

  if (!history.length) {
    return (
      <section className="bg-card rounded-lg p-4 shadow-card">
        <p className="text-muted">No recent activity.</p>
      </section>
    );
  }

  return (
    <section className="bg-card rounded-lg p-4 shadow-card">
      <h2 className="text-lg font-semibold mb-3 text-foreground">Recent Plans</h2>
      <ul className="space-y-2">
        {history.map((plan, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-primary" />
            <span>{plan.workout?.title || 'AI Plan'} – {plan.nutrition?.total_calories} kcal</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
