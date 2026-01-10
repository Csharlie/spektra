import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '@spektra/core';

/**
 * Hero section component demonstrating integration with core UI.
 * 
 * ## When to use
 * - Landing page header with main value proposition
 * - Campaign or product launch pages
 * - Introduction to major site sections
 * 
 * ## When NOT to use
 * - Interior pages with complex navigation
 * - Data-heavy dashboards
 * - Secondary content areas
 * 
 * ## Integration notes
 * Hero uses core Button component and follows the design system.
 * It combines typography, spacing, and color tokens consistently.
 */
const meta = {
  title: 'Themes/Sections/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A hero section template that composes core UI components for landing pages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main headline text',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle above title',
    },
    description: {
      control: 'text',
      description: 'Supporting text below title',
    },
    backgroundImage: {
      control: 'text',
      description: 'Optional background image URL',
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hero with gradient background
 */
export const Default: Story = {
  args: {
    title: 'Build Something Amazing',
    description: 'Create beautiful, responsive websites with our powerful component library.',
    primaryCTA: {
      text: 'Get Started',
      onClick: () => console.log('Get Started clicked'),
    },
    secondaryCTA: {
      text: 'Learn More',
      onClick: () => console.log('Learn More clicked'),
    },
  },
};

/**
 * Hero with subtitle and single CTA
 */
export const WithSubtitle: Story = {
  args: {
    subtitle: 'Introducing Spektra',
    title: 'The Modern UI Framework',
    description: 'Build faster with pre-built components and templates designed for developers.',
    primaryCTA: {
      text: 'Start Building',
      onClick: () => console.log('Start Building clicked'),
    },
  },
};

/**
 * Hero with background image overlay
 */
export const WithBackgroundImage: Story = {
  args: {
    title: 'Transform Your Ideas',
    description: 'From concept to reality with our comprehensive design system.',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600',
    primaryCTA: {
      text: 'Explore',
      onClick: () => console.log('Explore clicked'),
    },
  },
};

/**
 * Minimal hero with single CTA
 */
export const Minimal: Story = {
  args: {
    title: 'Simple. Powerful. Yours.',
    description: 'Everything you need to create exceptional user experiences.',
    primaryCTA: {
      text: 'Get Started Free',
      onClick: () => console.log('Get Started Free clicked'),
    },
  },
};
