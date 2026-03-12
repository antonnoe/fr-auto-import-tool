import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Je Nederlandse auto importeren en immatriculeren in Frankrijk',
  description: 'MVP gids voor Nederlandse/EU voertuigen naar Franse registratie.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
