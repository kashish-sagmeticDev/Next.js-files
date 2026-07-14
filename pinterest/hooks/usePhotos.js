import { useState, useEffect, useCallback } from 'react';
import { fetchPhotos } from '@/utils/api';
import { PHOTOS_PER_PAGE } from '@/utils/constants';

export function usePhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const start = (page - 1) * PHOTOS_PER_PAGE;
      const newPhotos = await fetchPhotos(start);
      if (newPhotos.length < PHOTOS_PER_PAGE) setHasMore(false);
      setPhotos(prev => [...prev, ...newPhotos]);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Initial load
  useEffect(() => {
    loadMore();
  }, []);

  return { photos, loading, hasMore, loadMore };
}