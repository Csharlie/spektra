import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LandingLayout } from '@spektra/core';
import { corporateTheme } from '../corporate/theme';

describe('CorporateTheme Integration', () => {
  it('renders LandingLayout with corporate theme colors', () => {
    const mockNavigation = {
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ],
      logoText: 'Corporate',
    };

    const mockFooter = {
      sections: [
        {
          title: 'Links',
          links: [{ label: 'Privacy', href: '/privacy' }],
        },
      ],
      copyright: '2026 Corporate Inc.',
    };

    render(
      <LandingLayout navigation={mockNavigation} footer={mockFooter}>
        <div>Test Content</div>
      </LandingLayout>
    );

    expect(screen.getByText('Corporate')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('2026 Corporate Inc.')).toBeInTheDocument();
  });

  it('corporateTheme contains required color structure', () => {
    expect(corporateTheme.colors).toBeDefined();
    expect(corporateTheme.colors?.primary).toBeDefined();
    expect(corporateTheme.colors?.secondary).toBeDefined();
    expect(corporateTheme.colors?.primary?.['600']).toBe('#0284c7');
  });
});
