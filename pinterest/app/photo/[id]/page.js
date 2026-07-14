import { fetchPhotoById } from '@/utils/api';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import { notFound } from 'next/navigation';

export default async function PhotoPage({ params }) {
  const { id } = params;
  let photo;
  try {
    photo = await fetchPhotoById(id);
  } catch (err) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden">
        <img src={photo.url} alt={photo.title} className="w-full object-contain max-h-[70vh]" />
        <div className="p-6 relative">
          <div className="absolute top-4 right-4">
            <FavoriteButton photoId={photo.id} />
          </div>
          <h1 className="text-2xl font-bold pr-12">{photo.title}</h1>
          <Link href="/" className="inline-block mt-6 text-pink-500 hover:underline">
            ← Back to gallery
          </Link>
        </div>
      </div>
    </div>
  );
}