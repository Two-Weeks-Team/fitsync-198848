"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import PlanCard from '@/components/PlanCard';
import ChallengeFeed from '@/components/ChallengeFeed';
import InsightPanel from '@/components/InsightPanel';
import CollectionPanel from '@/components/CollectionPanel';
import StatePanel from '@/components/StatePanel';

export default function HomePage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  // Simple auth guard – in a real app you would check a cookie or JWT
  useEffect(() => {
    // placeholder: assume user is authenticated after 500ms
    const t = setTimeout(() => setIsAuth(true), 500);
    return () => clearTimeout(t);
  }, []);

  if (isAuth === null) {
    return <StatePanel state="loading" />;
  }

  if (!isAuth) {
    // redirect to login (not implemented in demo)
    router.push('/login');
    return null;
  }

  return (
    <main className="container mx-auto p-4 space-y-6">
      <Hero />
      <StatsStrip />
      <PlanCard />
      <InsightPanel />
      <ChallengeFeed />
      <CollectionPanel />
    </main>
  );
}
