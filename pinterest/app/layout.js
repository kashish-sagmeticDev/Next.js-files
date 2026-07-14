import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Pinterest Clone',
  description: 'A photo gallery with favorites, drag & drop, and infinite scroll',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}