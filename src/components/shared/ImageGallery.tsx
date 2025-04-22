
import { FC, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image with zoom capability */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <AspectRatio ratio={1 / 1} className="bg-white">
          <img
            src={images[mainImage]}
            alt={`${productName} - Image ${mainImage + 1}`}
            className="object-cover w-full h-full transition-all duration-300 hover:scale-110"
          />
        </AspectRatio>
      </div>

      {/* Thumbnail gallery */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                mainImage === index
                  ? 'border-jewelry-gold'
                  : 'border-gray-200 hover:border-jewelry-lightgold'
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
