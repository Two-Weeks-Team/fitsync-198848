"use client";
import Link from 'next/link';
import { HomeIcon, TrophyIcon, BoltIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { href: '/', icon: HomeIcon, label: 'Home' },
  { href: '/challenges', icon: TrophyIcon, label: 'Challenges' },
  { href: '/coach', icon: BoltIcon, label: 'Coach' },
  { href: '/profile', icon: UserCircleIcon, label: 'Profile' }
];

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-card border-t border-border p-2 md:hidden">
      <ul className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link href={item.href} className="flex flex-col items-center text-sm">
                <Icon
                  className={clsx('h-6 w-6', isActive ? 'text-primary' : 'text-muted')}
                />
                <span className={clsx(isActive ? 'text-primary' : 'text-muted')}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
