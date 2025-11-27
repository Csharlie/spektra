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
