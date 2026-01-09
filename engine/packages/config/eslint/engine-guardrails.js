/**
 * ESLint Guardrails for ENGINE packages
 * 
 * PURPOSE: Enforce architectural discipline in the engine layer.
 * SCOPE: Apply ONLY to engine/** packages, NOT to projects.
 * 
 * RULES:
 * 1. No imports from projects/** (engine must be client-agnostic)
 * 2. No CMS-related imports (engine must be data-source-agnostic)
 * 3. No client/project names in string literals
 * 4. No CMS-related string literals
 */

module.exports = {
  extends: [
    './index.js',
    'plugin:@typescript-eslint/recommended',
  ],
  
  parser: '@typescript-eslint/parser',
  
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  
  plugins: ['@typescript-eslint'],
  
  rules: {
    /**
     * GUARDRAIL 1: Prevent imports from projects workspace
     * This ensures engine remains client-agnostic.
     */
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['**/projects/**', 'projects/**'],
            message: '❌ ENGINE VIOLATION: Engine code MUST NOT import from projects/. Keep engine client-agnostic.',
          },
          {
            group: ['*wordpress*', '*graphql*', '*apollo*', 'axios', '*cms*', '*wp*'],
            message: '❌ ENGINE VIOLATION: Engine code MUST NOT import CMS-specific libraries. Keep engine data-source-agnostic.',
          },
        ],
      },
    ],

    /**
     * GUARDRAIL 2: Prevent client/CMS names in string literals
     * This catches hardcoded client names or CMS references.
     */
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/bellator|autozeno/i]',
        message: '❌ ENGINE VIOLATION: Client names (bellator, autozeno) found in engine code. Engine must be client-agnostic.',
      },
      {
        selector: 'Literal[value=/wordpress|graphql|cms|wp-/i]',
        message: '❌ ENGINE VIOLATION: CMS-related literals (wordpress, graphql, cms) found in engine code. Engine must be data-source-agnostic.',
      },
      {
        selector: 'TemplateLiteral[quasis.*.value.raw=/bellator|autozeno/i]',
        message: '❌ ENGINE VIOLATION: Client names (bellator, autozeno) found in template string. Engine must be client-agnostic.',
      },
      {
        selector: 'TemplateLiteral[quasis.*.value.raw=/wordpress|graphql|cms|wp-/i]',
        message: '❌ ENGINE VIOLATION: CMS-related literals (wordpress, graphql, cms) found in template string. Engine must be data-source-agnostic.',
      },
    ],

    /**
     * Additional strictness for engine
     */
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    
    // TypeScript-specific
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
