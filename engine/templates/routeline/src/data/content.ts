/**
 * Content data
 * 
 * Placeholder for routeline template.
 * All text content, copy, and labels should be defined here.
 * Replace with project-specific content when creating a new project.
 */

export interface RoutelineContent {
  navigation: {
    home: string;
    products: string;
  };
  landing: {
    title: string;
    description: string;
  };
  products: {
    title: string;
    description: string;
  };
}

/**
 * Default content stub
 */
export const content: RoutelineContent = {
  navigation: {
    home: 'Home',
    products: 'Products',
  },
  landing: {
    title: 'Welcome to Routeline',
    description: 'This template demonstrates routing with AppShell.',
  },
  products: {
    title: 'Products',
    description: 'Product listing goes here.',
  },
};
