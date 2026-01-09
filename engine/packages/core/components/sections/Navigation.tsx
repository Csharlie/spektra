import React, { useState } from 'react';
import { Logo } from '../features/Logo';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { Menu, X } from 'lucide-react';

export interface NavigationLink {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface NavigationProps {
  logo?: string;
  logoText?: string;
  links: NavigationLink[];
  cta?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  logo,
  logoText = 'Spektra',
  links,
  cta,
  className,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={cn('bg-white border-b border-gray-200 sticky top-0 z-50', className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {logo ? (
              <img src={logo} alt={logoText} className="h-8" />
            ) : (
              <Logo text={logoText} size="md" />
            )}
          </div>

          <div className="hidden md:flex items-center space-x-8">
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
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            {cta && (
              <Button onClick={cta.onClick} size="md">
                {cta.text}
              </Button>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
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
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  {link.label}
                </a>
              ))}
              {cta && (
                <Button onClick={cta.onClick} fullWidth>
                  {cta.text}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
