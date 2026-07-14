// components/Header.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  const isActive = (path) => pathname === path;
  
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MyBlog
        </Link>
        <div className="space-x-6">
          <Link href="/" className={`hover:text-blue-600 ${isActive('/') ? 'text-blue-600' : 'text-gray-700'}`}>
            Home
          </Link>
          <Link href="/blog" className={`hover:text-blue-600 ${isActive('/blog') ? 'text-blue-600' : 'text-gray-700'}`}>
            Blog
          </Link>
          <Link href="/admin" className={`hover:text-blue-600 ${isActive('/admin') ? 'text-blue-600' : 'text-gray-700'}`}>
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}