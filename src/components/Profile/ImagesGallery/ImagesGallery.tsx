import { CroppedImage } from 'components/common/CroppedImage/CroppedImage';
import { Gallery } from 'components/common/Gallery/Gallery';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserById } from 'data/entities';

type ImagesGalleryProps = {
  className?: string;
  limit?: number;
};

export const ImagesGallery = ({ className, limit }: ImagesGalleryProps) => {
  const { id } = useParams<{ id: string | undefined }>();

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
};
