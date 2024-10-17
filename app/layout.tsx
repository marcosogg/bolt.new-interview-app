import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Q&A Application',
  description: 'A single-user full-stack web application for managing questions and answers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
