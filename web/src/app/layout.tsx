import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { Merriweather } from 'next/font/google';
import { AuthProvider } from '@/context/AuthProvider';
import NavigationBar from '@/components/NavigationBar';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter'
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather'
});

export const metadata = {
  title: 'FitSync',
  description: 'Your health data’s smartest coach – sync, plan, thrive.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="bg-background min-h-screen flex flex-col font-sans text-foreground">
        <AuthProvider>
          <div className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-6">
            {children}
          </div>
        </AuthProvider>
        <NavigationBar />
      </body>
    </html>
  );
}
