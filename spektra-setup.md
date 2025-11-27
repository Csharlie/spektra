# 🚀 Spektra Turborepo - Teljes Projekt Fájlok

GitHub: https://github.com/Csharlie/spektra

## 📁 ROOT FÁJLOK

### `package.json` (root)
```json
{
  "name": "spektra",
  "version": "1.0.0",
  "private": true,
  "repository": {
    "type": "git",
    "url": "https://github.com/Csharlie/spektra"
  },
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "clean": "turbo run clean",
    "dev:client-a": "turbo run dev --filter=client-a",
    "build:client-a": "turbo run build --filter=client-a",
    "create-client": "node scripts/create-client.js"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.3.3"
  },
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

### `turbo.json`
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

### `pnpm-workspace.yaml`
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

### `.gitignore`
```
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production
build
dist
.next
out

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# Turbo
.turbo

# IDE
.vscode
.idea
*.swp
*.swo
*~
```

### `README.md` (root)
```markdown
# Spektra - Turborepo Monorepo

GitHub: https://github.com/Csharlie/spektra

Modern React monorepo with Turborepo, Vite, Tailwind CSS és WordPress integráció.

## 🚀 Gyors Indítás

\`\`\`bash
# 1. Függőségek telepítése
pnpm install

# 2. Client A fejlesztése
pnpm dev:client-a

# 3. Böngészőben nyisd meg
open http://localhost:3000
\`\`\`

## 📦 Projekt Struktúra

\`\`\`
spektra/
├── packages/           # Shared packages
│   ├── core/          # UI komponensek
│   ├── data/          # WordPress & API
│   ├── themes/        # Témák
│   └── config/        # Konfigurációk
├── apps/              # Alkalmazások
│   └── client-a/      # Landing page
└── scripts/           # Helper scriptek
\`\`\`

## 🛠️ Parancsok

### Development
\`\`\`bash
pnpm dev                    # Minden package dev mode
pnpm dev:client-a          # Csak client-a
\`\`\`

### Build
\`\`\`bash
pnpm build                  # Minden build
pnpm build:client-a        # Csak client-a build
\`\`\`

### Új Ügyfél
\`\`\`bash
pnpm create-client         # Interaktív ügyfél generátor
\`\`\`

### Utility
\`\`\`bash
pnpm lint                   # Lint minden package
pnpm clean                  # Clean build fájlok
\`\`\`

## 🎨 Testreszabás

### Path-ek átnevezése

Ha átnevezed a package-eket, módosítsd ezeket a fájlokat:

1. \`packages/config/paths.js\` ⭐ KÖZPONTI PATH CONFIG
2. \`pnpm-workspace.yaml\`
3. \`turbo.json\`

## 🔧 Konfiguráció

### WordPress integráció

\`\`\`bash
# apps/client-a/.env
VITE_WP_API_URL=https://your-wp.com/wp-json/wp/v2
VITE_WP_GRAPHQL_URL=https://your-wp.com/graphql
\`\`\`

## 📝 License

MIT
\`\`\`

---

## 📦 PACKAGES/CONFIG

### `packages/config/package.json`
```json
{
  "name": "@spektra/config",
  "version": "1.0.0",
  "main": "./index.js",
  "types": "./index.d.ts",
  "exports": {
    "./eslint": "./eslint/index.js",
    "./typescript": "./typescript/index.json",
    "./tailwind": "./tailwind/index.js",
    "./paths": "./paths.js"
  },
  "files": [
    "eslint",
    "typescript",
    "tailwind",
    "paths.js"
  ]
}
```

### `packages/config/paths.js` ⭐ KÖZPONTI PATH KEZELÉS
```javascript
/**
 * Központi path konfiguráció
 * Ha átnevezed a package-eket, itt módosítsd!
 */

module.exports = {
  // Package names
  packages: {
    core: '@spektra/core',
    data: '@spektra/data',
    themes: '@spektra/themes',
    config: '@spektra/config',
  },
  
  // Workspace paths
  workspace: {
    root: 'spektra',
    packages: 'packages',
    apps: 'apps',
    scripts: 'scripts',
  },
  
  // Package locations
  locations: {
    core: 'packages/core',
    data: 'packages/data',
    themes: 'packages/themes',
    config: 'packages/config',
  },
  
  // Import aliases
  aliases: {
    '@core': 'packages/core',
    '@data': 'packages/data',
    '@themes': 'packages/themes',
    '@ui': 'packages/core/components/ui',
    '@features': 'packages/core/components/features',
    '@sections': 'packages/core/components/sections',
  }
};
```

### `packages/config/eslint/index.js`
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
```

### `packages/config/typescript/base.json`
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "exclude": ["node_modules", "dist", "build"]
}
```

### `packages/config/typescript/react.json`
```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  }
}
```

### `packages/config/tailwind/base.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
```

---

## 📦 PACKAGES/CORE

### `packages/core/package.json`
```json
{
  "name": "@spektra/core",
  "version": "1.0.0",
  "type": "module",
  "main": "./index.ts",
  "types": "./index.ts",
  "exports": {
    ".": "./index.ts",
    "./components/*": "./components/*/index.ts",
    "./ui": "./components/ui/index.ts",
    "./features": "./components/features/index.ts",
    "./sections": "./components/sections/index.ts",
    "./hooks": "./hooks/index.ts",
    "./contexts": "./contexts/index.ts",
    "./utils": "./utils/index.ts",
    "./design-systems": "./design-systems/index.ts"
  },
  "scripts": {
    "dev": "vite build --watch",
    "build": "tsc && vite build",
    "lint": "eslint . --ext .ts,.tsx",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.0",
    "@spektra/config": "workspace:*"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### `packages/core/tsconfig.json`
```json
{
  "extends": "@spektra/config/typescript/react.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["./**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### `packages/core/vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'SpektraCore',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

### `packages/core/index.ts`
```typescript
// Components
export * from './components/ui';
export * from './components/features';
export * from './components/sections';
export * from './components/templates';

// Design Systems
export * from './design-systems';

// Hooks
export * from './hooks';

// Contexts
export * from './contexts';

// Utils
export * from './utils';
```

### `packages/core/utils/cn.ts`
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `packages/core/utils/helpers.ts`
```typescript
/**
 * Formázza a dátumot olvasható formátumra
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Slugify text for URLs
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};
```

### `packages/core/utils/index.ts`
```typescript
export * from './cn';
export * from './helpers';
```

---

## 🎨 CORE COMPONENTS - UI

### `packages/core/components/ui/Button.tsx`
```typescript
import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    isLoading = false,
    className,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
      ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-lg',
      xl: 'px-8 py-4 text-xl rounded-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### `packages/core/components/ui/Input.tsx`
```typescript
import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2 border rounded-lg transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            error ? 'border-red-500' : 'border-gray-300',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

### `packages/core/components/ui/Textarea.tsx`
```typescript
import React from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-2 border rounded-lg transition-colors resize-none',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            error ? 'border-red-500' : 'border-gray-300',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            className
          )}
          rows={4}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
```

### `packages/core/components/ui/Card.tsx`
```typescript
import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  padding = 'md',
  shadow = true,
  hover = false,
  className,
  ...props 
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200',
        shadow && 'shadow-lg',
        hover && 'transition-transform hover:scale-105',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```

### `packages/core/components/ui/index.ts`
```typescript
export * from './Button';
export * from './Input';
export * from './Textarea';
export * from './Card';
```

---

## 🎨 CORE COMPONENTS - FEATURES

### `packages/core/components/features/FeatureCard.tsx`
```typescript
import React from 'react';
import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';

export interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        'group p-6 bg-white rounded-xl border border-gray-200 shadow-sm',
        'hover:shadow-lg hover:border-primary-300 transition-all duration-300',
        className
      )}
    >
      {Icon && (
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
```

### `packages/core/components/features/ContactFormField.tsx`
```typescript
import React from 'react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

export interface ContactFormFieldProps {
  type?: 'text' | 'email' | 'tel' | 'textarea';
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export const ContactFormField: React.FC<ContactFormFieldProps> = ({
  type = 'text',
  name,
  label,
  placeholder,
  required = false,
  error,
}) => {
  const commonProps = {
    name,
    label,
    placeholder,
    required,
    error,
  };

  if (type === 'textarea') {
    return <Textarea {...commonProps} />;
  }

  return <Input type={type} {...commonProps} />;
};
```

### `packages/core/components/features/Logo.tsx`
```typescript
import React from 'react';
import { cn } from '../../utils/cn';

export interface LogoProps {
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  text = 'Spektra',
  className,
  size = 'md'
}) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={cn('font-display font-bold', sizes[size], className)}>
      <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
        {text}
      </span>
    </div>
  );
};
```

### `packages/core/components/features/index.ts`
```typescript
export * from './FeatureCard';
export * from './ContactFormField';
export * from './Logo';
```

---

## 🏗️ CORE COMPONENTS - SECTIONS

### `packages/core/components/sections/Hero.tsx`
```typescript
import React from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { ArrowRight } from 'lucide-react';

export interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCTA?: {
    text: string;
    onClick: () => void;
  };
  secondaryCTA?: {
    text: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  className,
}) => {
  return (
    <section
      className={cn(
        'relative min-h-[600px] flex items-center justify-center',
        'bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700',
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="container mx-auto px-4 py-20 text-center">
        {subtitle && (
          <p className="text-primary-200 font-semibold text-lg mb-4 animate-fade-in">
            {subtitle}
          </p>
        )}
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          {primaryCTA && (
            <Button
              size="xl"
              variant="primary"
              onClick={primaryCTA.onClick}
              className="bg-white text-primary-700 hover:bg-gray-100"
            >
              {primaryCTA.text}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
          
          {secondaryCTA && (
            <Button
              size="xl"
              variant="outline"
              onClick={secondaryCTA.onClick}
              className="border-white text-white hover:bg-white/10"
            >
              {secondaryCTA.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
```

### `packages/core/components/sections/Features.tsx`
```typescript
import React from 'react';
import { FeatureCard, FeatureCardProps } from '../features/FeatureCard';
import { cn } from '../../utils/cn';

export interface FeaturesProps {
  title: string;
  subtitle?: string;
  features: Omit<FeatureCardProps, 'className'>[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const Features: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  className,
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={cn('py-20 bg-gray-50', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {subtitle && (
            <p className="text-primary-600 font-semibold text-lg mb-4">
              {subtitle}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>
        
        <div className={cn('grid grid-cols-1 gap-8', gridCols[columns])}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
```

### `packages/core/components/sections/About.tsx`
```typescript
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
```

### `packages/core/components/sections/Contact.tsx`
```typescript
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ContactFormField } from '../features/ContactFormField';
import { cn } from '../../utils/cn';
import { Mail, Phone, MapPin } from 'lucide-react';

export interface ContactProps {
  title: string;
  subtitle?: string;
  description?: string;
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  className?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const Contact: React.FC<ContactProps> = ({
  title,
  subtitle,
  description,
  onSubmit,
  contactInfo,
  className,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'A név megadása kötelező';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Az email cím megadása kötelező';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Érvénytelen email cím';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Az üzenet megadása kötelező';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className={cn('py-20 bg-gray-50', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {subtitle && (
            <p className="text-primary-600 font-semibold text-lg mb-4">
              {subtitle}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600">{description}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Köszönjük az üzenetet!
                </h3>
                <p className="text-gray-600 mb-6">
                  Hamarosan felvesszük Önnel a kapcsolatot.
                </p>
                <Button onClick={() => setSubmitSuccess(false)}>
                  Új üzenet küldése
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <ContactFormField
                  type="text"
                  name="name"
                  label="Név"
                  placeholder="Az Ön neve"
                  required
                  error={errors.name}
                />
                
                <ContactFormField
                  type="email"
                  name="email"
                  label="Email cím"
                  placeholder="pelda@email.com"
                  required
                  error={errors.email}
                />
                
                <ContactFormField
                  type="tel"
                  name="phone"
                  label="Telefonszám"
                  placeholder="+36 20 123 4567"
                  error={errors.phone}
                />
                
                <ContactFormField
                  type="textarea"
                  name="message"
                  label="Üzenet"
                  placeholder="Írja le, miben tudunk segíteni..."
                  required
                  error={errors.message}
                />
                
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                >
                  Üzenet küldése
                </Button>
              </form>
            )}
          </div>

          {contactInfo && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Kapcsolat
                </h3>
                <div className="space-y-4">
                  {contactInfo.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Email</div>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {contactInfo.phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Telefon</div>
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {contactInfo.address && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Cím</div>
                        <p className="text-gray-600">{contactInfo.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
```

### `packages/core/components/sections/Navigation.tsx`
```typescript
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
```

### `packages/core/components/sections/Footer.tsx`
```typescript
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
    <footer className={cn('bg-gray-900 text-white', className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            {logo ? (
              <img src={logo} alt={logoText} className="h-8 mb-4" />
            ) : (
              <div className="mb-4">
                <Logo text={logoText} size="md" className="text-white" />
              </div>
            )}
            {description && (
              <p className="text-gray-400 text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
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
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {copyright || `© ${currentYear} ${logoText}. Minden jog fenntartva.`}
          </p>
          
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
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
```

### `packages/core/components/sections/index.ts`
```typescript
export * from './Hero';
export * from './Features';
export * from './About';
export * from './Contact';
export * from './Navigation';
export * from './Footer';
```

---

## 📄 CORE COMPONENTS - TEMPLATES

### `packages/core/components/templates/LandingPageTemplate.tsx`
```typescript
import React from 'react';
import { Navigation, NavigationProps } from '../sections/Navigation';
import { Footer, FooterProps } from '../sections/Footer';

export interface LandingPageTemplateProps {
  navigation: NavigationProps;
  footer: FooterProps;
  children: React.ReactNode;
}

export const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({
  navigation,
  footer,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation {...navigation} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer {...footer} />
    </div>
  );
};
```

### `packages/core/components/templates/index.ts`
```typescript
export * from './LandingPageTemplate';
```

---

## 🎨 DESIGN SYSTEMS

### `packages/core/design-systems/base/theme.ts`
```typescript
export const baseTheme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      display: 'Lexend, system-ui, sans-serif',
      mono: 'Fira Code, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
  },
};

export type Theme = typeof baseTheme;
```

### `packages/core/design-systems/base/tokens.ts`
```typescript
export const tokens = {
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export type Tokens = typeof tokens;
```

### `packages/core/design-systems/base/index.ts`
```typescript
export * from './theme';
export * from './tokens';
```

### `packages/core/design-systems/index.ts`
```typescript
export * from './base';
```

---

## 🔗 CONTEXTS

### `packages/core/contexts/DesignSystemContext.tsx`
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { baseTheme, Theme } from '../design-systems/base/theme';

interface DesignSystemContextType {
  currentSystem: 'base' | 'material' | 'radix';
  theme: Theme;
  switchDesignSystem: (system: 'base' | 'material' | 'radix') => void;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

export interface DesignSystemProviderProps {
  children: React.ReactNode;
  initialSystem?: 'base' | 'material' | 'radix';
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({ 
  children, 
  initialSystem = 'base' 
}) => {
  const [currentSystem, setCurrentSystem] = useState(initialSystem);
  const [theme, setTheme] = useState<Theme>(baseTheme);

  useEffect(() => {
    setTheme(baseTheme);
  }, [currentSystem]);

  const switchDesignSystem = (system: 'base' | 'material' | 'radix') => {
    setCurrentSystem(system);
  };

  return (
    <DesignSystemContext.Provider value={{ 
      currentSystem, 
      theme, 
      switchDesignSystem 
    }}>
      {children}
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
};
```

### `packages/core/contexts/index.ts`
```typescript
export * from './DesignSystemContext';
```

---

## 🪝 HOOKS

### `packages/core/hooks/useDesignSystem.ts`
```typescript
import { useDesignSystem as useDesignSystemContext } from '../contexts/DesignSystemContext';

export const useDesignSystem = useDesignSystemContext;
```

### `packages/core/hooks/index.ts`
```typescript
export * from './useDesignSystem';
```

---

## 📦 PACKAGES/DATA

### `packages/data/package.json`
```json
{
  "name": "@spektra/data",
  "version": "1.0.0",
  "type": "module",
  "main": "./index.ts",
  "types": "./index.ts",
  "exports": {
    ".": "./index.ts",
    "./wp": "./wp/index.ts",
    "./json": "./json/index.ts"
  },
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc",
    "lint": "eslint . --ext .ts,.tsx",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "axios": "^1.6.7",
    "@apollo/client": "^3.9.0",
    "graphql": "^16.8.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "typescript": "^5.3.3",
    "@spektra/config": "workspace:*",
    "react": "^18.3.1"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

### `packages/data/tsconfig.json`
```json
{
  "extends": "@spektra/config/typescript/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "."
  },
  "include": ["./**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### `packages/data/wp/rest/client.ts`
```typescript
import axios, { AxiosInstance } from 'axios';

export class WordPressRestClient {
  private client: AxiosInstance;

  constructor(baseURL: string, authToken?: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
    });
  }

  async getPosts(params = {}) {
    const response = await this.client.get('/posts', { params });
    return response.data;
  }

  async getPost(id: number | string) {
    const response = await this.client.get(`/posts/${id}`);
    return response.data;
  }

  async getPages(params = {}) {
    const response = await this.client.get('/pages', { params });
    return response.data;
  }

  async getPage(id: number | string) {
    const response = await this.client.get(`/pages/${id}`);
    return response.data;
  }

  async getCategories(params = {}) {
    const response = await this.client.get('/categories', { params });
    return response.data;
  }
}
```

### `packages/data/wp/rest/hooks.ts`
```typescript
import { useState, useEffect } from 'react';
import { WordPressRestClient } from './client';

export const useRestPosts = (
  client: WordPressRestClient,
  params = {}
) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await client.getPosts(params);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [client, JSON.stringify(params)]);

  return { posts, loading, error };
};
```

### `packages/data/wp/rest/index.ts`
```typescript
export * from './client';
export * from './hooks';
```

### `packages/data/wp/graphql/client.ts`
```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const createWordPressGraphQLClient = (
  graphqlUrl: string,
  authToken?: string
) => {
  const httpLink = createHttpLink({
    uri: graphqlUrl,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : '',
      }
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};
```

### `packages/data/wp/graphql/queries.ts`
```typescript
import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($first: Int = 10) {
    posts(first: $first) {
      nodes {
        id
        title
        excerpt
        slug
        date
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      content
      date
    }
  }
`;
```

### `packages/data/wp/graphql/index.ts`
```typescript
export * from './client';
export * from './queries';
```

### `packages/data/wp/index.ts`
```typescript
export * from './rest';
export * from './graphql';
```

### `packages/data/json/index.ts`
```typescript
export const fetchJSON = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};
```

### `packages/data/index.ts`
```typescript
export * from './wp';
export * from './json';
```

---

## 🎨 PACKAGES/THEMES

### `packages/themes/package.json`
```json
{
  "name": "@spektra/themes",
  "version": "1.0.0",
  "type": "module",
  "main": "./index.ts",
  "exports": {
    ".": "./index.ts",
    "./corporate": "./corporate/index.ts",
    "./ecommerce": "./ecommerce/index.ts"
  },
  "scripts": {
    "build": "tsc",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@spektra/core": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@spektra/config": "workspace:*"
  }
}
```

### `packages/themes/tsconfig.json`
```json
{
  "extends": "@spektra/config/typescript/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "."
  },
  "include": ["./**/*"]
}
```

### `packages/themes/corporate/theme.ts`
```typescript
import { Theme } from '@spektra/core';

export const corporateTheme: Partial<Theme> = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
  },
};
```

### `packages/themes/corporate/index.ts`
```typescript
export * from './theme';
```

### `packages/themes/ecommerce/theme.ts`
```typescript
import { Theme } from '@spektra/core';

export const ecommerceTheme: Partial<Theme> = {
  colors: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    secondary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
  },
};
```

### `packages/themes/ecommerce/index.ts`
```typescript
export * from './theme';
```

### `packages/themes/index.ts`
```typescript
export * from './corporate';
export * from './ecommerce';
```

---

## 🚀 APPS/CLIENT-A

### `apps/client-a/package.json`
```json
{
  "name": "client-a",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@spektra/core": "workspace:*",
    "@spektra/data": "workspace:*",
    "@spektra/themes": "workspace:*",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.1",
    "@spektra/config": "workspace:*",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.0"
  }
}
```

### `apps/client-a/tsconfig.json`
```json
{
  "extends": "@spektra/config/typescript/react.json",
  "compilerOptions": {
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["./**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### `apps/client-a/vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
  },
});
```

### `apps/client-a/tailwind.config.js`
```javascript
const baseConfig = require('@spektra/config/tailwind/base');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "../../packages/core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
    },
  },
  plugins: baseConfig.plugins,
};
```

### `apps/client-a/postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### `apps/client-a/.env.example`
```env
# WordPress konfiguráció (opcionális)
VITE_WP_API_URL=https://your-wordpress.com/wp-json/wp/v2
VITE_WP_GRAPHQL_URL=https://your-wordpress.com/graphql
VITE_WP_AUTH_TOKEN=

# Design System
VITE_DESIGN_SYSTEM=base

# Site konfiguráció
VITE_SITE_NAME=Client A
VITE_SITE_URL=http://localhost:3000
```

### `apps/client-a/index.html`
```html
<!doctype html>
<html lang="hu">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Client A - Landing Page</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Lexend:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

### `apps/client-a/main.tsx`
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { DesignSystemProvider } from '@spektra/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DesignSystemProvider initialSystem="base">
      <App />
    </DesignSystemProvider>
  </React.StrictMode>,
);
```

### `apps/client-a/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-white text-gray-900 antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Lexend', system-ui, sans-serif;
  }
}

@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.6s ease-in;
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }
  
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  
  .animation-delay-400 {
    animation-delay: 400ms;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

### `apps/client-a/App.tsx`
```typescript
import React from 'react';
import HomePage from './pages/Home';

function App() {
  return <HomePage />;
}

export default App;
```

### `apps/client-a/config/site.ts`
```typescript
export const siteConfig = {
  name: import.meta.env.VITE_SITE_NAME || 'Client A',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:3000',
  description: 'Professzionális megoldások vállalkozásoknak',
  
  contact: {
    email: 'info@clienta.hu',
    phone: '+36 20 123 4567',
    address: '1234 Budapest, Példa utca 12.',
  },
  
  social: {
    facebook: 'https://facebook.com/clienta',
    instagram: 'https://instagram.com/clienta',
    linkedin: 'https://linkedin.com/company/clienta',
  },
};
```

### `apps/client-a/config/navigation.ts`
```typescript
export const navigationLinks = [
  { label: 'Főoldal', href: '#home' },
  { label: 'Szolgáltatások', href: '#features' },
  { label: 'Rólunk', href: '#about' },
  { label: 'Kapcsolat', href: '#contact' },
];

export const footerSections = [
  {
    title: 'Cég',
    links: [
      { label: 'Rólunk', href: '#about' },
      { label: 'Csapatunk', href: '#team' },
      { label: 'Karrier', href: '#career' },
      { label: 'Sajtó', href: '#press' },
    ],
  },
  {
    title: 'Szolgáltatások',
    links: [
      { label: 'Webfejlesztés', href: '#web' },
      { label: 'Marketing', href: '#marketing' },
      { label: 'Consulting', href: '#consulting' },
      { label: 'Support', href: '#support' },
    ],
  },
  {
    title: 'Jogi',
    links: [
      { label: 'Adatvédelem', href: '#privacy' },
      { label: 'Felhasználási feltételek', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
    ],
  },
];
```

---

## 🏠 HOME PAGE

### `apps/client-a/pages/Home/index.tsx`
```typescript
import React from 'react';
import {
  LandingPageTemplate,
  Hero,
  Features,
  About,
  Contact,
} from '@spektra/core';
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { siteConfig } from '../../config/site';
import { navigationLinks, footerSections } from '../../config/navigation';

const HomePage: React.FC = () => {
  const handleContactSubmit = async (data: any) => {
    console.log('Contact form submitted:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LandingPageTemplate
      navigation={{
        logoText: siteConfig.name,
        links: navigationLinks.map(link => ({
          ...link,
          onClick: () => scrollToSection(link.href),
        })),
        cta: {
          text: 'Kapcsolat',
          onClick: () => scrollToSection('#contact'),
        },
      }}
      footer={{
        logoText: siteConfig.name,
        description: siteConfig.description,
        sections: footerSections,
        copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. Minden jog fenntartva.`,
        socialLinks: [
          {
            icon: <Facebook className="w-5 h-5" />,
            href: siteConfig.social.facebook,
            label: 'Facebook',
          },
          {
            icon: <Instagram className="w-5 h-5" />,
            href: siteConfig.social.instagram,
            label: 'Instagram',
          },
          {
            icon: <Linkedin className="w-5 h-5" />,
            href: siteConfig.social.linkedin,
            label: 'LinkedIn',
          },
        ],
      }}
    >
      <div id="home">
        <Hero
          subtitle="Üdvözöljük"
          title="Innováció és Megbízhatóság"
          description="Professzionális megoldások, amelyek segítenek vállalkozásának növekedésében és sikerében"
          primaryCTA={{
            text: 'Kezdjük el',
            onClick: () => scrollToSection('#contact'),
          }}
          secondaryCTA={{
            text: 'Tudjon meg többet',
            onClick: () => scrollToSection('#features'),
          }}
        />
      </div>

      <div id="features">
        <Features
          subtitle="Miért válasszon minket?"
          title="Szolgáltatásaink"
          columns={3}
          features={[
            {
              icon: Zap,
              title: 'Gyors megoldások',
              description: 'Hatékony és gyors implementáció, hogy vállalkozása időben elérje céljait.',
            },
            {
              icon: Shield,
              title: 'Biztonság',
              description: 'Magas szintű adatbiztonság és megfelelés az iparági szabványoknak.',
            },
            {
              icon: TrendingUp,
              title: 'Növekedés',
              description: 'Skálázható megoldások, amelyek együtt növekednek a vállalkozásával.',
            },
            {
              icon: Users,
              title: 'Szakértő csapat',
              description: 'Tapasztalt szakemberek, akik elkötelezettek az Ön sikere iránt.',
            },
            {
              icon: Target,
              title: 'Célzott stratégia',
              description: 'Személyre szabott megközelítés, amely az Ön egyedi igényeire épül.',
            },
            {
              icon: Award,
              title: 'Minőség',
              description: 'Kiváló minőségű szolgáltatások és folyamatos innováció.',
            },
          ]}
        />
      </div>

      <div id="about">
        <About
          subtitle="Rólunk"
          title="Kik vagyunk?"
          content={
            <>
              <p className="mb-4">
                Több mint 10 éve segítünk vállalkozásoknak digitális megoldásokkal. 
                Csapatunk tapasztalt szakemberekből áll, akik szenvedélyesen dolgoznak 
                azon, hogy ügyfeleink sikeresek legyenek.
              </p>
              <p>
                Hiszünk abban, hogy a technológia és a kreativitás kombinációjával 
                egyedülálló értéket tudunk teremteni. Minden projekthez egyedi 
                megközelítéssel állunk, figyelembe véve az ügyfél specifikus igényeit.
              </p>
            </>
          }
          stats={[
            { value: '500+', label: 'Elégedett ügyfél' },
            { value: '10+', label: 'Év tapasztalat' },
            { value: '50+', label: 'Csapattagok' },
            { value: '98%', label: 'Ügyfél elégedettség' },
          ]}
          cta={{
            text: 'Ismerjen meg minket',
            onClick: () => scrollToSection('#contact'),
          }}
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
          imagePosition="right"
        />
      </div>

      <div id="contact">
        <Contact
          subtitle="Kapcsolat"
          title="Vegye fel velünk a kapcsolatot"
          description="Szívesen válaszolunk kérdéseire és segítünk projektje megvalósításában."
          onSubmit={handleContactSubmit}
          contactInfo={siteConfig.contact}
        />
      </div>
    </LandingPageTemplate>
  );
};

export default HomePage;
```

### `apps/client-a/README.md`
```markdown
# Client A - Landing Page

## Fejlesztés

\`\`\`bash
# Fejlesztői mód
pnpm dev

# Build
pnpm build

# Preview
pnpm preview
\`\`\`

## Konfiguráció

1. Másold le a \`.env.example\` fájlt \`.env\` néven
2. Állítsd be a környezeti változókat
3. Módosítsd a \`config/\` fájlokat a saját tartalommal

## Tartalom testreszabása

- **Site config**: \`config/site.ts\`
- **Navigáció**: \`config/navigation.ts\`
- **Főoldal**: \`pages/Home/index.tsx\`
- **Stílusok**: \`tailwind.config.js\`
\`\`\`

---

## 🛠️ SCRIPTS

### `scripts/create-client.js`
```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createClient() {
  console.log('🚀 Spektra - Új ügyfél projekt létrehozása\n');

  const clientName = await question('Ügyfél neve (pl. client-b): ');
  const siteName = await question('Oldal neve (pl. Client B): ');
  
  const clientDir = path.join(__dirname, '..', 'apps', clientName);

  if (fs.existsSync(clientDir)) {
    console.log(`❌ A ${clientName} mappa már létezik!`);
    rl.close();
    return;
  }

  console.log(`\n📦 ${clientName} projekt létrehozása...\n`);

  const templateDir = path.join(__dirname, '..', 'apps', 'client-a');
  
  fs.cpSync(templateDir, clientDir, { recursive: true });

  const packageJsonPath = path.join(clientDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = clientName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  fs.copyFileSync(
    path.join(clientDir, '.env.example'),
    path.join(clientDir, '.env')
  );

  const siteConfigPath = path.join(clientDir, 'config', 'site.ts');
  let siteConfig = fs.readFileSync(siteConfigPath, 'utf8');
  siteConfig = siteConfig.replace(/Client A/g, siteName);
  siteConfig = siteConfig.replace(/client-a/g, clientName);
  fs.writeFileSync(siteConfigPath, siteConfig);

  console.log(`✅ ${clientName} projekt sikeresen létrehozva!\n`);
  console.log('Következő lépések:');
  console.log(`1. cd apps/${clientName}`);
  console.log(`2. Szerkeszd a .env fájlt`);
  console.log(`3. Szerkeszd a config/ fájlokat`);
  console.log(`4. pnpm dev --filter=${clientName}\n`);

  rl.close();
}

createClient().catch(console.error);
```

### `scripts/sync-deps.js`
```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Spektra - Függőségek szinkronizálása...\n');

const workspaceRoot = path.join(__dirname, '..');
const appsDir = path.join(workspaceRoot, 'apps');

const apps = fs.readdirSync(appsDir).filter(file => {
  return fs.statSync(path.join(appsDir, file)).isDirectory();
});

console.log(`Talált alkalmazások: ${apps.join(', ')}\n`);

apps.forEach(app => {
  const packageJsonPath = path.join(appsDir, app, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`⚠️  ${app}: package.json nem található`);
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const deps = packageJson.dependencies || {};
  const workspaceDeps = Object.keys(deps).filter(dep => 
    deps[dep] === 'workspace:*'
  );

  if (workspaceDeps.length > 0) {
    console.log(`✅ ${app}: ${workspaceDeps.length} workspace függőség`);
    workspaceDeps.forEach(dep => {
      console.log(`   - ${dep}`);
    });
  } else {
    console.log(`ℹ️  ${app}: nincs workspace függőség`);
  }
  
  console.log('');
});

console.log('✅ Szinkronizálás kész!\n');
```

---

## 📖 PROJEKT BEÁLLÍTÁS ÉS HASZNÁLAT

### Telepítési lépések:

```bash
# 1. Repository klónozása
git clone https://github.com/Csharlie/spektra.git
cd spektra

# 2. Függőségek telepítése
pnpm install

# 3. Core package build (első alkalommal)
pnpm build --filter=@spektra/core

# 4. Data package build (első alkalommal)
pnpm build --filter=@spektra/data

# 5. Client-A fejlesztés indítása
pnpm dev:client-a

# 6. Böngésző megnyitása
open http://localhost:3000
```

### Gyakori parancsok:

```bash
# Minden package fejlesztése
pnpm dev

# Csak egy konkrét app
pnpm dev:client-a

# Build minden package
pnpm build

# Csak egy app build
pnpm build:client-a

# Új ügyfél létrehozása
pnpm create-client

# Linting
pnpm lint

# Clean (build fájlok törlése)
pnpm clean
```

---

## 🎯 STRUKTÚRA ÁTNEVEZÉSE / TESTRESZABÁSA

Ha át szeretnéd nevezni a package-eket vagy máshová helyezni őket:

### 1. **Módosítsd a központi config-ot:**

`packages/config/paths.js`:
```javascript
module.exports = {
  packages: {
    core: '@spektra/ui-library',  // <- Átnevezed
    data: '@spektra/api',          // <- Átnevezed
    // ...
  },
  // ...
};
```

### 2. **Frissítsd a workspace config-ot:**

`pnpm-workspace.yaml`:
```yaml
packages:
  - 'libs/*'        # <- Ha másik mappába raknád
  - 'applications/*' # <- Ha másik mappába raknád
```

### 3. **Frissítsd a package neveket:**

`packages/core/package.json`:
```json
{
  "name": "@spektra/ui-library"  // <- Új név
}
```

### 4. **Frissítsd az importokat:**

`apps/client-a/package.json`:
```json
{
  "dependencies": {
    "@spektra/ui-library": "workspace:*"  // <- Új név
  }
}
```

### 5. **Futtatsd a sync scriptet:**

```bash
node scripts/sync-deps.js
```

---

## ✅ CHECKLIST - Projekt létrehozáshoz

### Root szint:
- [ ] `package.json`
- [ ] `turbo.json`
- [ ] `pnpm-workspace.yaml`
- [ ] `.gitignore`
- [ ] `README.md`

### packages/config:
- [ ] `package.json`
- [ ] `paths.js` (központi path config)
- [ ] `eslint/index.js`
- [ ] `typescript/base.json`
- [ ] `typescript/react.json`
- [ ] `tailwind/base.js`

### packages/core:
- [ ] `package.json`
- [ ] `tsconfig.json`
- [ ] `vite.config.ts`
- [ ] `index.ts`
- [ ] `utils/` (cn.ts, helpers.ts, index.ts)
- [ ] `components/ui/` (Button, Input, Textarea, Card)
- [ ] `components/features/` (FeatureCard, ContactFormField, Logo)
- [ ] `components/sections/` (Hero, Features, About, Contact, Navigation, Footer)
- [ ] `components/templates/` (LandingPageTemplate)
- [ ] `design-systems/base/` (theme.ts, tokens.ts)
- [ ] `contexts/` (DesignSystemContext.tsx)
- [ ] `hooks/` (useDesignSystem.ts)

### packages/data:
- [ ] `package.json`
- [ ] `tsconfig.json`
- [ ] `index.ts`
- [ ] `wp/rest/` (client.ts, hooks.ts, index.ts)
- [ ] `wp/graphql/` (client.ts, queries.ts, index.ts)
- [ ] `json/index.ts`

### packages/themes:
- [ ] `package.json`
- [ ] `tsconfig.json`
- [ ] `index.ts`
- [ ] `corporate/` (theme.ts, index.ts)
- [ ] `ecommerce/` (theme.ts, index.ts)

### apps/client-a:
- [ ] `package.json`
- [ ] `tsconfig.json`
- [ ] `vite.config.ts`
- [ ] `tailwind.config.js`
- [ ] `postcss.config.js`
- [ ] `.env.example`
- [ ] `index.html`
- [ ] `main.tsx`
- [ ] `App.tsx`
- [ ] `index.css`
- [ ] `config/` (site.ts, navigation.ts)
- [ ] `pages/Home/index.tsx`
- [ ] `README.md`

### scripts:
- [ ] `create-client.js`
- [ ] `sync-deps.js`

---

## 🎉 KÉSZ!

A Spektra Turborepo projekt most teljes és használatra kész!

### Következő lépések:

1. ✅ Másold ki az összes fájlt
2. ✅ Futtasd: `pnpm install`
3. ✅ Buildeld a core-t: `pnpm build --filter=@spektra/core`
4. ✅ Indítsd el: `pnpm dev:client-a`
5. ✅ Nyisd meg: `http://localhost:3000`

### Testreszabás:

1. Módosítsd: `apps/client-a/config/site.ts`
2. Módosítsd: `apps/client-a/config/navigation.ts`
3. Add hozzá a saját képeidet
4. Változtasd meg a színeket: `packages/config/tailwind/base.js`

### Új ügyfél hozzáadása:

```bash
pnpm create-client
```

---

## 📚 További információk:

- **GitHub**: https://github.com/Csharlie/spektra
- **Turborepo Docs**: https://turbo.build/repo/docs
- **Vite Docs**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **React**: https://react.dev

---

**Projekt készítve:** Spektra Turborepo Monorepo  
**Verzió:** 1.0.0  
**License:** MIT
```