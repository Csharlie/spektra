import React, { useState } from 'react';
import { Button } from '@spektra/core';
import { cn } from '@spektra/core';
import { Menu, X } from 'lucide-react';
import { BellatorLogo } from '../atoms/BellatorLogo';

export interface BellatorNavigationLink {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface BellatorNavigationProps {
  links: BellatorNavigationLink[];
  cta?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

export const BellatorNavigation: React.FC<BellatorNavigationProps> = ({
  links,
  cta,
  className,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={cn("bg-black/50 border-b border-gray-800 shadow-xl backdrop-blur-md font-['Lexend'] fixed w-full top-0 z-50", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <BellatorLogo size="md" />
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="text-white hover:text-primary font-light transition-colors"
              >
                {link.label}
              </a>
            ))}
            {cta && (
              <Button onClick={cta.onClick} size="md" className="bg-primary text-bold hover:bg-primary/80 rounded-none">
                {cta.text}
              </Button>
            )}
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className={cn(
          "lg:hidden transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-[calc(100vh-6rem)] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="py-4 border-t border-gray-800 overflow-y-auto">
            <div className="flex flex-col space-y-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-primary font-medium"
                >
                  {link.label}
                </a>
              ))}
              {cta && (
                <Button onClick={cta.onClick} fullWidth className="bg-primary text-black hover:bg-primary/90">
                  {cta.text}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
