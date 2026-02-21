import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { AiAssistant } from '@/components/chat/AiAssistant';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Vishwa Veda | Holistic Ayurvedic Healthcare',
  description: 'Manage your Ayurvedic therapy, book doctors, and chat with AI for personalized wellness.',
  icons: {
    icon: '/logo png.png',
    apple: '/logo png.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <AiAssistant />
        <Toaster />
      </body>
    </html>
  );
}
