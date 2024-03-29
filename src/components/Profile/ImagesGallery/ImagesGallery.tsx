import CroppedImage from 'components/CroppedImage/CroppedImage';
import Gallery from 'components/Gallery/Gallery';
import { useSelector } from 'react-redux';
import { useIdParam } from 'utils/hooks/hooks';
import { selectUserById } from 'data/entities';

type ImagesGalleryProps = {
  className?: string;
  limit?: number;
};

export default function ImagesGallery({
  className,
  limit,
}: ImagesGalleryProps) {
  const id = useIdParam();

  const user = useSelector(selectUserById(id));

  const images = user ? user.images : [];

  const croppedImages = images.map(({ src, id: imageId }) => (
    <CroppedImage key={imageId} src={src} alt='' />
  ));

  return (
    <div className={className}>
      <Gallery limit={limit}>{croppedImages}</Gallery>
    </div>
  );
}
