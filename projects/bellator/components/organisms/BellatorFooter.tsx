import React from 'react';
import { cn } from '@spektra/core';
import { BellatorLogo } from '../atoms/BellatorLogo';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface BellatorFooterProps {
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

export const BellatorFooter: React.FC<BellatorFooterProps> = ({
  logoText = 'Bellator Gym',
  description,
  sections,
  copyright,
  socialLinks,
  className,
}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn('bg-black text-white relative overflow-hidden', className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, #FFDB16 40px, #FFDB16 42px)`
        }} />
      </div>

      {/* Top Yellow Border */}
      <div className="w-full h-1 bg-gym-yellow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <BellatorLogo size="lg" />
            </div>
            {description && (
              <p className="text-gray-400 leading-relaxed mb-6">
                {description}
              </p>
            )}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gym-yellow hover:bg-white text-black flex items-center justify-center transition-all group"
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-black text-gym-yellow text-lg mb-6 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-gym-yellow transition-colors font-medium relative group inline-block"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gym-yellow group-hover:w-full transition-all duration-300" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            {copyright || `© ${currentYear} ${logoText}. Minden jog fenntartva.`}
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-gym-yellow transition-colors font-medium">
              Adatvédelem
            </a>
            <a href="#" className="text-gray-500 hover:text-gym-yellow transition-colors font-medium">
              ÁSZF
            </a>
            <a href="#" className="text-gray-500 hover:text-gym-yellow transition-colors font-medium">
              Sütik
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
