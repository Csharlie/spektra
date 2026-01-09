import React from 'react';
import { cn } from '@spektra/core';
import { SectionHeading } from '../atoms';
import { TestimonialCard } from '../molecules';

export interface Testimonial {
  name: string;
  role?: string;
  content: string;
  image?: string;
  rating?: number;
}

export interface TestimonialsProps {
  subtitle?: string;
  title: string;
  description?: string;
  testimonials: Testimonial[];
  className?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  subtitle,
  title,
  description,
  testimonials,
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
