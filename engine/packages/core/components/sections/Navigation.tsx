import React, { useState } from 'react';
import { Logo } from '../features/Logo';
import { Button } from '../primitives/Button';
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
  logoLink?: string;
  onLogoClick?: () => void;
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
  logoLink = '/',
  onLogoClick,
  links,
  cta,
  className,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav 
      data-ui-id="main-navigation"
      data-ui-role="navigation"
      className={cn('bg-white sticky top-0 z-50 font-sans border-b border-gray-200', className)}
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          <a
            href={logoLink}
            onClick={(e) => {
              if (onLogoClick) {
                e.preventDefault();
                onLogoClick();
              }
            }}
            data-ui-id="nav-logo"
            data-ui-role="logo"
            className="flex-shrink-0 cursor-pointer"
          >
            {logo ? (
              <img src={logo} alt={logoText} className="h-8" />
            ) : (
              <Logo text={logoText} size="md" className="font-sans" />
            )}
          </a>

          <div 
            data-ui-id="nav-links-desktop"
            data-ui-role="nav-links"
            className="hidden md:flex items-center space-x-8"
          >
            {links.map((link, index) => (
              <a
                key={index}
                data-ui-id={`nav-link-${index}`}
                data-ui-class="nav-link"
                data-ui-role="link"
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
              <Button 
                data-ui-id="nav-cta"
                data-ui-class="primary-cta"
                data-ui-role="cta-button"
                onClick={cta.onClick} 
                size="md"
              >
                {cta.text}
              </Button>
            )}
          </div>

          <button
            data-ui-id="nav-mobile-toggle"
            data-ui-role="toggle-button"
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
          <div 
            data-ui-id="nav-mobile-menu"
            data-ui-role="mobile-menu"
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 py-4 px-4"
          >
            <div className="flex flex-col space-y-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  data-ui-id={`nav-mobile-link-${index}`}
                  data-ui-class="nav-link"
                  data-ui-role="link"
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
                <Button 
                  data-ui-id="nav-mobile-cta"
                  data-ui-class="primary-cta"
                  data-ui-role="cta-button"
                  onClick={cta.onClick} 
                  fullWidth
                >
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
