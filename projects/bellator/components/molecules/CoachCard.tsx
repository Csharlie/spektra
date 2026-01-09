import React from 'react';
import { cn } from '@spektra/core';

export interface CoachCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties?: string[];
  className?: string;
}

export const CoachCard: React.FC<CoachCardProps> = ({
  name,
  title,
  bio,
  image,
  specialties,
  className,
}) => {
  return (
    <div className={cn(
      'group relative bg-black text-white overflow-hidden hover:shadow-2xl transition-all',
      className
    )}>
      <div className="relative h-96 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        
        {/* Yellow accent bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gym-yellow transform origin-bottom scale-y-100 group-hover:scale-y-[3] transition-transform duration-300" />
      </div>
      
      <div className="p-6 relative">
        <h3 className="text-2xl font-black mb-1 uppercase tracking-tight">
          {name}
        </h3>
        <p className="text-gym-yellow font-bold text-sm mb-4 uppercase tracking-wide">
          {title}
        </p>
        
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {bio}
        </p>
        
        {specialties && specialties.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Specialitások:
            </p>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gym-yellow/10 border border-gym-yellow/30 text-gym-yellow text-xs font-semibold"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
