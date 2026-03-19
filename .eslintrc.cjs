// @ts-check
/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    plugins: {
      boundaries: require('eslint-plugin-boundaries'),
    },
    settings: {
      'boundaries/elements': [
        { type: 'types',     pattern: 'packages/types/*' },
        { type: 'data',      pattern: 'packages/data/*' },
        { type: 'runtime',   pattern: 'packages/runtime/*' },
        { type: 'config',    pattern: 'packages/config/*' },
        { type: 'basics',    pattern: 'packages/components/src/basics/*' },
        { type: 'elements',  pattern: 'packages/components/src/elements/*' },
        { type: 'modules',   pattern: 'packages/components/src/modules/*' },
        { type: 'wrappers',  pattern: 'packages/components/src/wrappers/*' },
        { type: 'sections',  pattern: 'packages/sections/*' },
        { type: 'themes',    pattern: 'packages/themes/*' },
        { type: 'templates', pattern: 'packages/templates/*' },
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
];
