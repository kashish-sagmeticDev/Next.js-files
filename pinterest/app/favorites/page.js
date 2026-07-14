'use client';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PhotoCard from '@/components/PhotoCard';
import Masonry from 'react-masonry-css';
import { fetchPhotoById } from '@/utils/api';

const breakpointColumns = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function FavoritesPage() {
  const [favorites] = useLocalStorage('favorites', []);
  const [favPhotos, setFavPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavorites() {
      if (!favorites || favorites.length === 0) {
        setFavPhotos([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Convert IDs to numbers and remove duplicates
        const uniqueIds = [...new Set(favorites.map(id => Number(id)))];
        
        // Fetch each photo using the app API (Picsum) and skip missing IDs
        const promises = uniqueIds.map(async (id) => {
          try {
            const data = await fetchPhotoById(id);
            return { success: true, data };
          } catch (err) {
            console.error(`Failed to fetch photo ${id}:`, err);
            return { success: false, id };
          }
        });

        const results = await Promise.all(promises);

        // Extract only successful photo objects
        const successfulPhotos = results
          .filter(r => r.success)
          .map(r => r.data);
        
        if (successfulPhotos.length === 0 && uniqueIds.length > 0) {
          setError('Could not load any favorite photos. The API may be slow.');
        } else if (successfulPhotos.length < uniqueIds.length) {
          console.warn(`Only ${successfulPhotos.length} of ${uniqueIds.length} favorites loaded.`);
        }
        
        setFavPhotos(successfulPhotos);
      } catch (err) {
        console.error('Fatal error loading favorites:', err);
        setError('Something went wrong while loading your favorites.');
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, [favorites]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mb-4"></div>
        <p className="text-gray-500">Loading your favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/" className="text-pink-500 underline">
          ← Go back to gallery
        </Link>
      </div>
    );
  }

  if (favPhotos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-xl text-gray-600 mb-4">No favorites yet. ❤️</p>
        <Link href="/" className="text-pink-500 underline text-lg">
          Browse photos and click the heart icon
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex w-full -ml-4"
        columnClassName="pl-4 flex-1"
      >
        {favPhotos.map(photo => (
          <div key={photo.id} className="mb-4">
            <PhotoCard photo={photo} />
          </div>
        ))}
      </Masonry>
    </div>
  );
}