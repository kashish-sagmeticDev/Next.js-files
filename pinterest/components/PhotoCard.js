'use client';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

// Generate a pseudo-random height between 200 and 500px based on photo id
function getRandomHeight(id) {
  const hash = (id * 2654435761) % 101; // simple deterministic "random"
  return 200 + (hash % 301); // between 200 and 500
}

export default function PhotoCard({ photo }) {
  const imageHeight = getRandomHeight(photo.id);

  return (
    <div
      className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <Link href={`/photo/${photo.id}`}>
        <div className="relative w-full" style={{ height: `${imageHeight}px` }}>
          <img
            src={photo.thumbnailUrl}
            alt={photo.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </Link>
      <FavoriteButton photoId={photo.id} />
      <p className="p-2 text-sm truncate bg-white/80 absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition">
        {photo.title}
      </p>
    </div>
  );
}