import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

export interface GalleryProps {
  subtitle?: string;
  title: string;
  description?: string;
  images: GalleryImage[];
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
  showCategories?: boolean;
  className?: string;
  imageClassName?: string;
  filterButtonClassName?: string;
  activeFilterClassName?: string;
}

export const Gallery: React.FC<GalleryProps> = ({
  subtitle,
  title,
  description,
  images,
  columns = { mobile: 2, tablet: 3, desktop: 4 },
  gap = 'gap-4',
  showCategories = true,
  className,
  imageClassName,
  filterButtonClassName,
  activeFilterClassName,
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))] as string[];
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  const gridColsClasses = cn(
    `grid-cols-${columns.mobile}`,
    `md:grid-cols-${columns.tablet}`,
    `lg:grid-cols-${columns.desktop}`
  );

  return (
    <section 
      data-ui-id="gallery-section"
      data-ui-class="gallery-section"
      data-ui-role="gallery"
      className={cn('py-20 md:py-32 bg-white', className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div 
          data-ui-id="gallery-header"
          data-ui-class="section-header"
          data-ui-role="section-header"
          className="text-center mb-12"
        >
          {subtitle && (
            <p 
              data-ui-id="gallery-subtitle"
              data-ui-class="section-subtitle"
              data-ui-role="subtitle"
              className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-2"
            >
              {subtitle}
            </p>
          )}
          <h2 
            data-ui-id="gallery-title"
            data-ui-class="section-title"
            data-ui-role="heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          >
            {title}
          </h2>
          {description && (
            <p 
              data-ui-id="gallery-description"
              data-ui-class="section-description"
              data-ui-role="description"
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {description}
            </p>
          )}
        </div>
        
        {/* Category Filters */}
        {showCategories && categories.length > 1 && (
          <div 
            data-ui-id="gallery-filters"
            data-ui-class="filter-group"
            data-ui-role="category-filters"
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category || 'all')}
                data-ui-id={`gallery-filter-${category}`}
                data-ui-class="filter-button"
                data-ui-role="filter-button"
                className={cn(
                  'px-6 py-2 font-semibold uppercase tracking-wider text-sm transition-all rounded-md',
                  filter === category
                    ? activeFilterClassName || 'bg-primary-600 text-white'
                    : filterButtonClassName || 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        {/* Image Grid */}
        <div 
          data-ui-id="gallery-grid"
          data-ui-class="gallery-grid"
          data-ui-role="image-grid"
          className={cn('grid', gridColsClasses, gap)}
        >
          {filteredImages.map((image, index) => (
            <div
              key={index}
              data-ui-id={`gallery-item-${index}`}
              data-ui-class="gallery-item"
              data-ui-role="gallery-image"
              className={cn(
                'relative aspect-square overflow-hidden cursor-pointer group rounded-lg',
                imageClassName
              )}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          data-ui-id="gallery-lightbox"
          data-ui-class="lightbox-modal"
          data-ui-role="lightbox"
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            data-ui-id="gallery-lightbox-close"
            data-ui-class="close-button"
            data-ui-role="close-button"
            className="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
