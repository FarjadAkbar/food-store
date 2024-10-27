import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type ImageFallbackProps = ImageProps & {
  fallbackSrc?: string; // Optional fallback image source
};

const ImageFallback = ({ src, fallbackSrc = 'https://placehold.co/600x400', alt, ...props }: ImageFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc); // Set fallback image when original fails to load
  };

  return <Image src={imgSrc} onError={handleError} alt={alt} {...props} />;
};

export default ImageFallback;
