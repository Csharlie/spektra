import React from 'react';
import { cn } from '@spektra/core';
import { SectionHeading } from '../atoms';
import { CoachCard } from '../molecules';

export interface Coach {
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties?: string[];
}

export interface CoachesProps {
  subtitle?: string;
  title: string;
  description?: string;
  coaches: Coach[];
  className?: string;
}

export const Coaches: React.FC<CoachesProps> = ({
  subtitle,
  title,
  description,
  coaches,
  className,
}) => {
  return (
    <section className={cn('py-20 md:py-32 bg-black', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle={subtitle}
          title={title}
          description={description}
          align="center"
          dark={true}
          className="mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <CoachCard
              key={index}
              name={coach.name}
              title={coach.title}
              bio={coach.bio}
              image={coach.image}
              specialties={coach.specialties}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
