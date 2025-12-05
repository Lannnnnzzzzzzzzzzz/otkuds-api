import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Otakudesu API',
  description: 'REST API untuk scraping data anime dari Otakudesu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
