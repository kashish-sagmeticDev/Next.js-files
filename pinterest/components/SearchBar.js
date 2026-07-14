'use client';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

export default function SearchBar({ onSearch, delay = 300 }) {  
  const [term, setTerm] = useState('');
  const debouncedTerm = useDebounce(term, delay); 

  useEffect(() => {
    if (typeof onSearch === 'function') {  
      onSearch(debouncedTerm);
    }
  }, [debouncedTerm, onSearch]);

  return (
    <div className="relative">  
      <input
        type="text"
        placeholder="Search photos by title..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full md:w-96 px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      {term && (  
        <button
          onClick={() => setTerm('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}