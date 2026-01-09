import React from 'react';
import { cn } from '@spektra/core';
import { SectionHeading } from '../atoms';
import { ProgramCard } from '../molecules';
import { LucideIcon } from 'lucide-react';

export interface Program {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  image?: string;
}

export interface ProgramsProps {
  subtitle?: string;
  title: string;
  description?: string;
  programs: Program[];
  className?: string;
}

export const Programs: React.FC<ProgramsProps> = ({
  subtitle,
  title,
  description,
  programs,
  className,
}) => {
  return (
    <section className={cn('py-20 md:py-32 bg-gray-50', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle={subtitle}
          title={title}
          description={description}
          align="center"
          className="mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              icon={program.icon}
              title={program.title}
              description={program.description}
              features={program.features}
              image={program.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
