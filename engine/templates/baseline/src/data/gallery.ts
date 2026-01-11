/**
 * Gallery data for Baseline
 * All gallery images and configuration
 * Matches the original Client A gallery
 */

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export interface GalleryConfig {
  images: GalleryImage[];
  categories: string[];
  layout: {
    columns: number;
    gap: string;
    aspectRatio: string;
  };
}

/**
 * Baseline gallery data
 * Exact match with original Client A implementation
 */
export const galleryConfig: GalleryConfig = {
  images: [
    { 
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop', 
      alt: 'Dashboard design', 
      category: 'Web Design' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop', 
      alt: 'Team collaboration', 
      category: 'Strategy' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop', 
      alt: 'Office workspace', 
      category: 'Consulting' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop', 
      alt: 'Team meeting', 
      category: 'Strategy' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop', 
      alt: 'Code development', 
      category: 'Development' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop', 
      alt: 'Business planning', 
      category: 'Consulting' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop', 
      alt: 'Mobile app design', 
      category: 'Web Design' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&auto=format&fit=crop', 
      alt: 'Creative workspace', 
      category: 'Development' 
    },
  ],
  categories: ['All', 'Web Design', 'Development', 'Strategy', 'Consulting'],
  layout: {
    columns: 3,
    gap: '1rem',
    aspectRatio: '16/9',
  },
};
