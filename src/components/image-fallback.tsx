import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type ImageFallbackProps = ImageProps & {
  fallbackSrc?: string; // Optional fallback image source
};

const ImageFallback = ({
  src,
  fallbackSrc = '/placholder.png',
  alt,
  layout = 'fill',
  objectFit = 'cover',
  ...props
}: ImageFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc); // Set fallback image when the original fails to load
  };

  return (
    <Image
      src={imgSrc}
      onError={handleError}
      alt={alt}
      layout={layout}
      objectFit={objectFit}
      {...props}
    />
  );
};

export default ImageFallback;
