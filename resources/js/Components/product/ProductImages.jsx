import { useState, useEffect } from 'react';

export default function ProductImages({ images, title }) {
  const [mainImage, setMainImage] = useState(null);

  // Initialize main image when component mounts or images change
  useEffect(() => {
    if (images && images.length > 0) {
      // Try to find primary image first, otherwise use first image
      const primary = images.find(img => img.is_primary) || images[0];
      setMainImage(primary.url || primary);
    }
  }, [images]);

  // Sort images by sort_order if available
  const sortedImages = images?.sort((a, b) => {
    const orderA = a.sort_order || 0;
    const orderB = b.sort_order || 0;
    return orderA - orderB;
  }) || [];

  // Handle case where images might be direct URLs (backward compatibility)
  const getImageUrl = (img) => {
    return typeof img === 'string' ? img : img.url;
  };

  if (!mainImage) {
    return (
      <div className="border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-96">
        <img
          src="/placeholder-image.jpg"
          alt="Placeholder"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="border rounded-lg overflow-hidden">
        <img
          src={getImageUrl(mainImage)}
          alt={title}
          className="w-full h-96 object-contain"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      </div>

      {/* Thumbnails - only show if more than one image */}
      {sortedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {sortedImages.map((img, index) => {
            const imgUrl = getImageUrl(img);
            return (
              <button
                key={img.id || index}
                onClick={() => setMainImage(img)}
                className={`border rounded-md overflow-hidden ${
                  getImageUrl(mainImage) === imgUrl ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
