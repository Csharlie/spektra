import React from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export interface AboutProps {
  title: string;
  subtitle?: string;
  content: string | React.ReactNode;
  image?: string;
  imagePosition?: 'left' | 'right';
  cta?: {
    text: string;
    onClick: () => void;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
  className?: string;
}

export const About: React.FC<AboutProps> = ({
  title,
  subtitle,
  content,
  image,
  imagePosition = 'right',
  cta,
  stats,
  className,
}) => {
  return (
    <section className={cn('py-20 bg-white', className)}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'grid md:grid-cols-2 gap-12 items-center',
            imagePosition === 'left' && 'md:grid-flow-dense'
          )}
        >
          <div className={imagePosition === 'left' ? 'md:col-start-2' : ''}>
            {subtitle && (
              <p className="text-primary-600 font-semibold text-lg mb-4">
                {subtitle}
              </p>
            )}
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            
            <div className="text-lg text-gray-600 leading-relaxed mb-8">
              {typeof content === 'string' ? (
                <p>{content}</p>
              ) : (
                content
              )}
            </div>
            
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl font-bold text-primary-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            
            {cta && (
              <Button size="lg" onClick={cta.onClick}>
                {cta.text}
              </Button>
            )}
          </div>
          
          {image && (
            <div
              className={cn(
                'relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl',
                imagePosition === 'left' && 'md:col-start-1'
              )}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
