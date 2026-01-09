/**
 * @spektra/core - Public API
 * 
 * This file defines the ONLY public exports from the Spektra engine.
 * Projects MUST import from '@spektra/core' root only.
 * Deep imports are not supported and subject to breaking changes.
 */

// ============================================================================
// APP
// ============================================================================
export { App } from './app/App';
export type { AppProps } from './app/App';

// ============================================================================
// DESIGN SYSTEM
// ============================================================================
export {
  DesignSystemProvider,
  useDesignSystem,
  type DesignSystemContextType,
  type DesignSystemProviderProps,
} from './design-system/DesignSystemContext';

export { baseTheme, type Theme } from './design-system/base/theme';

// ============================================================================
// COMPONENTS - UI
// ============================================================================
export { Button } from './components/ui/Button';
export { Card } from './components/ui/Card';
export { Input } from './components/ui/Input';
export { Textarea } from './components/ui/Textarea';

// ============================================================================
// COMPONENTS - FEATURES
// ============================================================================
export { FeatureCard } from './components/features/FeatureCard';
export { ContactFormField } from './components/features/ContactFormField';
export { Logo } from './components/features/Logo';

// ============================================================================
// COMPONENTS - SECTIONS
// ============================================================================
export { Hero } from './components/sections/Hero';
export { Features } from './components/sections/Features';
export { About } from './components/sections/About';
export { Contact } from './components/sections/Contact';
export { Navigation } from './components/sections/Navigation';
export { Footer } from './components/sections/Footer';
export { Gallery } from './components/sections/Gallery';

// ============================================================================
// COMPONENTS - TEMPLATES
// ============================================================================
export { LandingPageTemplate } from './components/templates/LandingPageTemplate';

// ============================================================================
// HOOKS
// ============================================================================
export { useDocumentTitle } from './hooks/useDocumentTitle';
export { useMetaDescription } from './hooks/useMetaDescription';

// ============================================================================
// TYPES
// ============================================================================
export type {
  SiteData,
  SiteInfo,
  ThemeConfig,
  Page,
  Section,
  NavigationItem,
  PageMeta,
} from './types/SiteData';

// ============================================================================
// UTILS
// ============================================================================
export { cn } from './utils/cn';
export * from './utils/helpers';
