import React from 'react';
import { cn } from '@spektra/core';
import { Star } from 'lucide-react';

export interface TestimonialCardProps {
  name: string;
  role?: string;
  content: string;
  image?: string;
  rating?: number;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  image,
  rating = 5,
  className,
}) => {
  return (
    <div className={cn(
      'bg-white p-8 border-l-4 border-gym-yellow shadow-lg hover:shadow-2xl transition-all',
      className
    )}>
      {rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                'w-5 h-5',
                index < rating ? 'text-gym-yellow fill-gym-yellow' : 'text-gray-300'
              )}
            />
          ))}
        </div>
      )}
      
      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
        "{content}"
      </blockquote>
      
      <div className="flex items-center gap-4">
        {image && (
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gym-yellow flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div>
          <p className="font-black text-black uppercase tracking-tight">
            {name}
          </p>
          {role && (
            <p className="text-sm text-gray-600">
              {role}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
