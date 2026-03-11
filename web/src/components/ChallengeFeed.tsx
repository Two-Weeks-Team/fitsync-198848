"use client";
import { useEffect, useState } from "react";
import { fetchChallenges } from '@/lib/api';
import { CheckBadgeIcon, PlayIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function ChallengeFeed() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchChallenges()
      .then((data) => setChallenges(data.challenges))
      .catch(() => setChallenges([]))
      .finally(() => setLoading(false));
  }, []);

  const handleJoin = async (id: string) => {
    // optimistic UI; real implementation would POST to /challenges/{id}/join
    setJoined((prev) => new Set(prev).add(id));
  };

  if (loading) {
    return (
      <section className="bg-card rounded-lg p-4 shadow-card animate-pulse">
        <div className="h-6 w-3/4 bg-muted mb-2" />
        <div className="h-4 w-5/6 bg-muted mb-2" />
        <div className="h-4 w-2/3 bg-muted" />
      </section>
    );
  }

  return (
    <section className="bg-card rounded-lg p-4 shadow-card">
      <h2 className="text-xl font-semibold mb-3 text-foreground">Community Challenges</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {challenges.map((c) => (
          <div key={c.id} className="border border-border rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-medium text-primary">{c.title}</h3>
              <p className="text-sm text-muted mt-1">{c.description}</p>
            </div>
            <button
              onClick={() => handleJoin(c.id)}
              disabled={joined.has(c.id)}
              className={clsx(
                'mt-3 w-full flex items-center justify-center py-2 rounded-lg transition',
                joined.has(c.id) ? 'bg-muted text-muted' : 'bg-accent text-white hover:bg-accent/90'
              )}
            >
              {joined.has(c.id) ? (
                <>
                  <CheckBadgeIcon className="h-5 w-5 mr-1" /> Joined
                </>
              ) : (
                <>
                  <PlayIcon className="h-5 w-5 mr-1" /> Join
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
