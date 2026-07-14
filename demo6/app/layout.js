// app/layout.js
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastProvider from '@/components/ToastProvider';

export const metadata = {
  title: 'My Blog',
  description: 'A simple blog platform built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <ToastProvider />
        <main className="flex grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}