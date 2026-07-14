'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          📌 PinClone
        </Link>
        <div className="flex gap-6">
          <Link
            href="/"
            className={`hover:text-pink-500 transition ${
              pathname === '/' ? 'text-pink-600 font-semibold' : 'text-gray-700'
            }`}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className={`hover:text-pink-500 transition ${
              pathname === '/favorites' ? 'text-pink-600 font-semibold' : 'text-gray-700'
            }`}
          >
            ❤️ Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}