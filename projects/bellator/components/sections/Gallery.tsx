import React from 'react';
import { Gallery as CoreGallery, GalleryProps as CoreGalleryProps } from '@spektra/core';
import { SectionHeading } from '../atoms';

// Bellator-specific wrapper that maintains the same interface
export interface GalleryProps extends Omit<CoreGalleryProps, 'filterButtonClassName' | 'activeFilterClassName' | 'showCategories' | 'imageClassName'> {
  // Keep the same props interface for backward compatibility
}

export const Gallery: React.FC<GalleryProps> = ({
  subtitle,
  title,
  description,
  images,
  className,
}) => {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle={subtitle}
          title={title}
          description={description}
          align="center"
          className="mb-12"
        />
        
        <CoreGallery
          images={images}
          title="" // Title already shown by SectionHeading
          subtitle=""
          description=""
          filterButtonClassName="bg-white border-2 border-gray-300 text-gray-900 hover:border-gym-yellow font-bold uppercase text-sm"
          activeFilterClassName="bg-gym-yellow border-2 border-gym-yellow text-black font-black"
          imageClassName="border-4 border-gym-yellow hover:border-black transition-all duration-300 rounded-none"
          className="py-0" // Remove padding since we have our own section wrapper
          showCategories={true}
          gap="gap-6"
        />
      </div>
    </section>
  );
};
