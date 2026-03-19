// @ts-check
const boundaries = require('eslint-plugin-boundaries')
const tseslint = require('typescript-eslint')

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...tseslint.configs.recommended,
  {
    files: ['packages/*/src/**/*.{ts,tsx}'],
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'types',     pattern: ['packages/types/src/**'] },
        { type: 'data',      pattern: ['packages/data/src/**'] },
        { type: 'runtime',   pattern: ['packages/runtime/src/**'] },
        { type: 'config',    pattern: ['packages/config/src/**'] },
        { type: 'basics',    pattern: ['packages/components/src/basics/**'] },
        { type: 'elements',  pattern: ['packages/components/src/elements/**'] },
        { type: 'modules',   pattern: ['packages/components/src/modules/**'] },
        { type: 'wrappers',  pattern: ['packages/components/src/wrappers/**'] },
        { type: 'sections',  pattern: ['packages/sections/src/**'] },
        { type: 'themes',    pattern: ['packages/themes/src/**'] },
        { type: 'templates', pattern: ['packages/templates/src/**'] },
      ],
    },
    rules: {
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          // types → SENKITŐL nem importál
          { from: 'types', allow: [] },
          // themes → SENKITŐL nem importál (@spektra scope-ból)
          { from: 'themes', allow: [] },
          // data → csak types
          { from: 'data', allow: ['types'] },
          // runtime → types, data
          { from: 'runtime', allow: ['types', 'data'] },
          // B → E → M hierarchia
          { from: 'basics', allow: ['types'] },
          { from: 'elements', allow: ['types', 'basics'] },
          { from: 'modules', allow: ['types', 'basics', 'elements'] },
          { from: 'wrappers', allow: ['types'] },
          // sections → components + runtime (SectionDefinition)
          { from: 'sections', allow: ['types', 'basics', 'elements', 'modules', 'wrappers', 'runtime'] },
          // templates → types, runtime
          { from: 'templates', allow: ['types', 'runtime'] },
        ],
      }],
    },
  },
]
