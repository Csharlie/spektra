/**
 * FeatureHighlight Organism
 * 
 * PURPOSE:
 * This is a baseline project-level organism that demonstrates the correct
 * atomic structure for project-specific UI components.
 * 
 * ARCHITECTURAL INTENT:
 * - This organism exists intentionally as a canonical example
 * - It is structured for future promotion to the engine core
 * - It must remain project-scoped until reused by multiple projects
 * - It demonstrates how to compose atoms and molecules correctly
 * 
 * PROMOTION CRITERIA:
 * When 2+ projects need this exact pattern, it should be:
 * 1. Moved to engine/packages/core/components/organisms/
 * 2. Made available as a reusable engine component
 * 3. Imported by projects rather than duplicated
 * 
 * CONSTRAINTS:
 * - NO hardcoded text, labels, or links
 * - NO engine imports (stays project-level)
 * - NO CMS logic (pure presentational)
 * - Fully data-driven via props
 */

import React from 'react';
import { Title } from '../atoms/Title';
import { Text } from '../atoms/Text';
import { IconText } from '../molecules/IconText';
import { CTAGroup, CTAGroupProps } from '../molecules/CTAGroup';

export interface FeatureItem {
  icon: React.ReactNode;
  text: string;
}

export interface FeatureHighlightProps {
  title: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  description: string;
  features: FeatureItem[];
  actions?: CTAGroupProps;
  className?: string;
}

/**
 * FeatureHighlight organism
 * 
 * Represents a clear UX intent: highlighting product/service features
 * Composes atoms (Title, Text) and molecules (IconText, CTAGroup)
 */
export const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  title,
  titleLevel = 2,
  description,
  features,
  actions,
  className = '',
}) => {
  return (
    <section className={className}>
      <div>
        <Title text={title} level={titleLevel} />
        <Text content={description} />
      </div>
      
      <div>
        {features.map((feature, index) => (
          <IconText
            key={index}
            icon={feature.icon}
            text={feature.text}
          />
        ))}
      </div>
      
      {actions && <CTAGroup {...actions} />}
    </section>
  );
};
