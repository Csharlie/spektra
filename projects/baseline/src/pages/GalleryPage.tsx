/**
 * GalleryPage - Project-Level Demonstration Page
 * 
 * PURPOSE:
 * This page exists ONLY at the project level to demonstrate how project-specific
 * pages should compose and render project-level organisms with proper data flow.
 * 
 * ARCHITECTURAL INTENT:
 * - This is NOT an engine template (remains in projects/baseline/src/pages/)
 * - Demonstrates correct data → UI flow using the Spektra architecture
 * - Shows how to use project-level organisms (FeatureHighlight) with typed data
 * - Serves as a teaching example for proper component composition
 * 
 * PROMOTION PATH:
 * If this page pattern is needed by 2+ projects with the same structure,
 * it may be promoted to an engine template. Until then, it remains project-scoped.
 * 
 * DATA FLOW:
 * Data comes from projects/baseline/src/data/content.ts → featureHighlight
 * This ensures NO hardcoded UI text and maintains proper separation of concerns.
 * 
 * CONSTRAINTS:
 * - NO engine imports (templates, sections, features)
 * - NO hardcoded content
 * - NO CMS or platform abstractions
 * - Pure UI composition using project organisms
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureHighlight, FeatureItem } from '../ui/organisms/FeatureHighlight';
import { baselineContent } from '../data/content';
import { Sparkles, Lock, Zap, Globe, ArrowLeft } from 'lucide-react';

/**
 * Icon mapping for FeatureHighlight
 * Maps icon names from data to actual Lucide React components
 */
const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Lock,
  Zap,
  Globe,
};

/**
 * GalleryPage Component
 * 
 * Demonstrates:
 * - How to use project-level organisms
 * - Proper data flow from content.ts
 * - Icon mapping strategy
 * - Type-safe props handling
 */
const GalleryPage: React.FC = () => {
  const { featureHighlight } = baselineContent;

  // Transform data structure to match FeatureHighlight's expected props
  const features: FeatureItem[] = featureHighlight.features.map((feature) => {
    const IconComponent = iconMap[feature.iconName] || Sparkles;
    return {
      icon: <IconComponent className="w-6 h-6" />,
      text: feature.text,
    };
  });

  // Prepare CTA actions if they exist
  const actions = featureHighlight.actions
    ? {
        primaryAction: featureHighlight.actions.primary
          ? {
              label: featureHighlight.actions.primary.text,
              href: featureHighlight.actions.primary.href,
              variant: 'primary' as const,
            }
          : undefined,
        secondaryAction: featureHighlight.actions.secondary
          ? {
              label: featureHighlight.actions.secondary.text,
              href: featureHighlight.actions.secondary.href,
              variant: 'secondary' as const,
            }
          : undefined,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple page header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vissza a főoldalra
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Galéria</h1>
          <p className="mt-2 text-gray-600">
            Project-level oldal a FeatureHighlight organizmus bemutatására
          </p>
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FeatureHighlight
          title={featureHighlight.title}
          titleLevel={2}
          description={featureHighlight.description}
          features={features}
          actions={actions}
          className="bg-white rounded-lg shadow-sm p-8 space-y-8"
        />

        {/* Additional context for demonstration */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Architektúra Megjegyzés
          </h2>
          <p className="text-blue-800">
            Ez az oldal projekt-szinten létezik (projects/baseline/src/pages/),
            és bemutatja a helyes adatáramlást: data/content.ts → GalleryPage → FeatureHighlight organism.
            Ha ezt a mintát 2+ projekt használná, akkor promóválható engine template-té.
          </p>
        </div>
      </main>
    </div>
  );
};

export default GalleryPage;
