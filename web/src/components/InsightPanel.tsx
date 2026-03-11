"use client";
import { useEffect, useState } from "react";
import { apiClient } from '@/lib/api';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function InsightPanel() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient<any[]>('/api/v1/recovery/alerts')
      .then((data) => setAlerts(data))
      .catch(() => setAlerts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-4 shadow-card animate-pulse">
        <div className="h-5 w-3/4 bg-muted" />
      </div>
    );
  }

  if (!alerts.length) {
    return null;
  }

  return (
    <section className="bg-card rounded-lg p-4 shadow-card">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start space-x-2 bg-accent/10 p-2 rounded">
          <ExclamationTriangleIcon className="h-5 w-5 text-accent flex-shrink-0" />
          <p className="text-sm text-foreground">{alert.message}</p>
        </div>
      ))}
    </section>
  );
}
