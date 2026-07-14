import PhotoGrid from '@/components/PhotoGrid';
import { fetchPhotos } from '@/utils/api';
import { PHOTOS_PER_PAGE } from '@/utils/constants';

async function getInitialPhotos() {
  const photos = await fetchPhotos(0, PHOTOS_PER_PAGE);
  return photos;
}

export default async function HomePage() {
  const initialPhotos = await getInitialPhotos();
  return <PhotoGrid initialPhotos={initialPhotos} />;
}
