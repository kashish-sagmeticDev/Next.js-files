// components/AdminGuard.jsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ADMIN_PASSWORD = 'admin123'; // for demo only

export default function AdminGuard({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === ADMIN_PASSWORD) {
      setIsAuthorized(true);
    } else {
      const pwd = prompt('Enter admin password:');
      if (pwd === ADMIN_PASSWORD) {
        localStorage.setItem('adminAuth', pwd);
        setIsAuthorized(true);
      } else {
        toast.error('Unauthorized access');
        router.push('/');
      }
    }
  }, [router]);

  if (!isAuthorized) return null;
  return children;
}
