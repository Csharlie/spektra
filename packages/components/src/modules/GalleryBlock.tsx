import React, { useState } from 'react'
import { cn } from '../utils/cn'
import { X } from 'lucide-react'

export interface GalleryImage {
  src: string
  alt: string
  category?: string
}

export interface GalleryBlockProps {
  subtitle?: string
  title: string
  description?: string
  images: GalleryImage[]
  columns?: {
    mobile?: 1 | 2 | 3
    tablet?: 2 | 3 | 4
    desktop?: 2 | 3 | 4 | 5 | 6
  }
  gap?: string
  showCategories?: boolean
  className?: string
  imageClassName?: string
  filterButtonClassName?: string
  activeFilterClassName?: string
}

const mobileColsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
}
const tabletColsMap: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}
const desktopColsMap: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({
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
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const categories = [
    'all',
    ...Array.from(new Set(images.map((img) => img.category).filter(Boolean))),
  ] as string[]
  const filteredImages = filter === 'all' ? images : images.filter((img) => img.category === filter)

  const gridColsClasses = cn(
    mobileColsMap[columns.mobile ?? 2],
    tabletColsMap[columns.tablet ?? 3],
    desktopColsMap[columns.desktop ?? 4],
  )

  return (
    <section className={cn('py-20 md:py-32 bg-white', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {subtitle && (
            <p className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-2">
              {subtitle}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
          )}
        </div>

        {showCategories && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category || 'all')}
                className={cn(
                  'px-6 py-2 font-semibold uppercase tracking-wider text-sm transition-all rounded-md',
                  filter === category
                    ? activeFilterClassName || 'bg-primary-600 text-white'
                    : filterButtonClassName || 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className={cn('grid', gridColsClasses, gap)}>
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                'relative aspect-square overflow-hidden cursor-pointer group rounded-lg',
                imageClassName,
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

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
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
  )
}
