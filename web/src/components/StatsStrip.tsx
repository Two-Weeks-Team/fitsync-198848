"use client";
import { useEffect, useState } from "react";
import { fetchTodayPlan } from '@/lib/api';
import { ClockIcon, FireIcon, HeartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function StatsStrip() {
  const [stats, setStats] = useState<{ steps?: number; calories?: number; heartRate?: number }>(
    {}
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation we would hit a metrics endpoint; using plan data as placeholder
    fetchTodayPlan()
      .then((data) => {
        setStats({
          steps: data.workout?.exercises?.reduce((a: number, e: any) => a + (e?.reps || 0), 0) || 0,
          calories: data.nutrition?.total_calories,
          heartRate: 72 // placeholder static value
        });
      })
      .catch(() => setStats({}))
      .finally(() => setLoading(false));
  }, []);

  const items = [
    {
      label: 'Steps',
      value: stats.steps?.toLocaleString() ?? '--',
      icon: <FootstepsIcon className="h-5 w-5" />
    },
    {
      label: 'Calories',
      value: stats.calories?.toLocaleString() ?? '--',
      icon: <FireIcon className="h-5 w-5" />
    },
    {
      label: 'HR',
      value: stats.heartRate ? `${stats.heartRate} bpm` : '--',
      icon: <HeartIcon className="h-5 w-5" />
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className={clsx(
            'bg-card rounded-lg p-4 shadow-card flex flex-col items-center text-center',
            loading && 'animate-pulse'
          )}
        >
          {item.icon}
          <span className="mt-2 text-sm font-medium text-muted">{item.label}</span>
          <span className="text-lg font-semibold text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function FootstepsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M2 12h20M2 6h20M2 18h20" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
