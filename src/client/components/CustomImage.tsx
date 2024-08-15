import { useState } from 'react';
import Image from 'next/image';

const CustomImage = ({ src, alt, width, height }: any) => {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
  };

  return (
    <>
      {!isError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={true}
          onLoadingComplete={(result) => {
            if (result.naturalWidth === 0) handleError();
          }}
          onError={handleError}
        />
      )}
    </>
  );
};

export default CustomImage;
