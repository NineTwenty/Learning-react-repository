import { CroppedImage } from 'common/components/CroppedImage/CroppedImage';
import { Gallery } from 'common/components/Gallery/Gallery';
import { useSelector } from 'react-redux';
import { useIdParam } from 'common/hooks/hooks';
import { selectUserById } from 'data/entities';

type ImagesGalleryProps = {
  className?: string;
  limit?: number;
};

export function ImagesGallery({ className, limit }: ImagesGalleryProps) {
  const id = useIdParam();

  const user = useSelector(selectUserById(id));

  const images = user ? user.images : [];

  const croppedImages = Array.isArray(images)
    ? images.map(({ src, id: imageId }) => (
        <CroppedImage key={imageId} src={src} alt='' />
      ))
    : images;

  return (
    <div className={className}>
      <Gallery limit={limit}>{croppedImages}</Gallery>
    </div>
  );
}
