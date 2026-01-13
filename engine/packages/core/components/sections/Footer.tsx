import React from 'react';
import { Logo } from '../features/Logo';
import { cn } from '../../utils/cn';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: string;
  logoText?: string;
  description?: string;
  sections: FooterSection[];
  copyright?: string;
  socialLinks?: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logo,
  logoText = 'Spektra',
  description,
  sections,
  copyright,
  socialLinks,
  className,
}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      data-ui-id="main-footer"
      data-ui-role="footer"
      className={cn('bg-gray-900 text-white', className)}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div 
            data-ui-id="footer-brand"
            data-ui-role="brand-section"
            className="lg:col-span-1"
          >
            {logo ? (
              <img src={logo} alt={logoText} className="h-8 mb-4" />
            ) : (
              <div className="mb-4">
                <Logo text={logoText} size="md" className="text-white" />
              </div>
            )}
            {description && (
              <p 
                data-ui-id="footer-description"
                data-ui-role="description"
                className="text-gray-400 text-sm leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>

          {sections.map((section, index) => (
            <div 
              key={index}
              data-ui-id={`footer-section-${index}`}
              data-ui-class="footer-section"
              data-ui-role="link-group"
            >
              <h3 
                data-ui-id={`footer-section-title-${index}`}
                data-ui-role="heading"
                className="font-bold text-lg mb-4"
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      data-ui-id={`footer-link-${index}-${linkIndex}`}
                      data-ui-class="footer-link"
                      data-ui-role="link"
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p 
            data-ui-id="footer-copyright"
            data-ui-role="copyright"
            className="text-gray-400 text-sm mb-4 md:mb-0"
          >
            {copyright || `© ${currentYear} ${logoText}. Minden jog fenntartva.`}
          </p>
          
          {socialLinks && socialLinks.length > 0 && (
            <div 
              data-ui-id="footer-social-links"
              data-ui-role="social-links"
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  data-ui-id={`footer-social-${index}`}
                  data-ui-class="social-link"
                  data-ui-role="link"
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
