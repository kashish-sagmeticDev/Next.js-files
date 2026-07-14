export function filterPhotosByTitle(photos, searchTerm) {
  if (!searchTerm) return photos;
  return photos.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}