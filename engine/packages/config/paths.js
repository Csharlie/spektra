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
