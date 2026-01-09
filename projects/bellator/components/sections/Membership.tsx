import React from 'react';
import { cn } from '@spektra/core';
import { SectionHeading } from '../atoms';
import { PricingCard } from '../molecules';

export interface MembershipPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface MembershipProps {
  subtitle?: string;
  title: string;
  description?: string;
  plans: MembershipPlan[];
  onSelectPlan?: (planName: string) => void;
  className?: string;
}

export const Membership: React.FC<MembershipProps> = ({
  subtitle,
  title,
  description,
  plans,
  onSelectPlan,
  className,
}) => {
  return (
    <section className={cn('py-20 md:py-32 bg-gray-100', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle={subtitle}
          title={title}
          description={description}
          align="center"
          className="mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              highlighted={plan.highlighted}
              cta={onSelectPlan ? {
                text: 'Választom',
                onClick: () => onSelectPlan(plan.name),
              } : undefined}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            * Minden bérlet tartalmazza az öltöző és zuhanyozó használatát
          </p>
          <p className="text-gray-600 text-sm mt-2">
            * Személyi edzés díja külön kerül felszámításra
          </p>
        </div>
      </div>
    </section>
  );
};
