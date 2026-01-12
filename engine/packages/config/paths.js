/**
 * Központi path konfiguráció
 * Ha átnevezed a package-eket, itt módosítsd!
 */

module.exports = {
  // Package names
  packages: {
    core: '@spektra/core',
    data: '@spektra/data',
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
    config: 'packages/config',
  },
  
  // Import aliases
  aliases: {
    '@core': 'packages/core',
    '@data': 'packages/data',
    '@ui': 'packages/core/components/ui',
    '@features': 'packages/core/components/features',
    '@sections': 'packages/core/components/sections',
  }
};
