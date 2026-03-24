import React, { useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Logo } from '../elements/Logo'
import { Button } from '../basics/Button'
import { cn } from '../utils/cn'
import { Menu, X } from 'lucide-react'

export const navVariants = cva(
  'fixed top-0 left-0 right-0 z-50 font-sans border-b',
  {
    variants: {
      variant: {
        light: 'bg-background/75 backdrop-blur-sm border-border',
        dark: 'bg-background border-border',
        transparent: 'bg-transparent border-transparent',
      },
    },
    defaultVariants: {
      variant: 'light',
    },
  },
)

export interface NavigationLink {
  label: string
  href: string
  onClick?: () => void
}

export interface NavigationBarProps extends VariantProps<typeof navVariants> {
  logo?: string
  logoText?: string
  logoLink?: string
  onLogoClick?: () => void
  links: NavigationLink[]
  cta?: {
    text: string
    onClick: () => void
  }
  className?: string
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  logo,
  logoText = 'Spektra',
  logoLink = '/',
  onLogoClick,
  links,
  cta,
  variant,
  className,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav
      data-ui-component="navigation-bar"
      data-ui-role="navigation"
      className={cn(navVariants({ variant }), className)}
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          <a
            href={logoLink}
            onClick={(e) => {
              if (onLogoClick) {
                e.preventDefault()
                onLogoClick()
              }
            }}
            className="flex-shrink-0 cursor-pointer"
          >
            {logo ? (
              <img src={logo} alt={logoText} className="h-8" />
            ) : (
              <Logo text={logoText} size="md" className="font-sans" />
            )}
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault()
                    link.onClick()
                  }
                }}
                className="text-foreground hover:text-accent font-medium transition-colors"
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
            data-ui-type="button"
            data-ui-id="nav-mobile-toggle"
            data-ui-action="toggle"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden top-0 left-0 right-0 border-t border-border py-8 px-4">
            <div className="flex flex-col space-y-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    if (link.onClick) {
                      e.preventDefault()
                      link.onClick()
                    }
                    setMobileMenuOpen(false)
                  }}
                  data-ui-type="link"
                  data-ui-action="navigate"
                  className="text-foreground hover:text-accent font-medium"
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
  )
}
