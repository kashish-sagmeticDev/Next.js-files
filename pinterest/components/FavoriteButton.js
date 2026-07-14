'use client';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function FavoriteButton({ photoId }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const isFavorite = favorites.includes(photoId);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      setFavorites(favorites.filter(id => id !== photoId));
    } else {
      setFavorites([...favorites, photoId]);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:scale-110 transition"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}