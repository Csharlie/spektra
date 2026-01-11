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
  console.log('🚀 Spektra - Új projekt létrehozása\n');

  const projectName = await question('Projekt neve (pl. new-client): ');
  const siteName = await question('Oldal neve (pl. New Client): ');
  
  const projectDir = path.join(__dirname, '..', 'projects', projectName);

  if (fs.existsSync(projectDir)) {
    console.log(`❌ A ${projectName} mappa már létezik!`);
    rl.close();
    return;
  }

  console.log(`\n📦 ${projectName} projekt létrehozása a baseline template alapján...\n`);

  // Use the canonical template from engine/templates/baseline
  const templateDir = path.join(__dirname, '..', 'engine', 'templates', 'baseline');
  
  if (!fs.existsSync(templateDir)) {
    console.log(`❌ A template nem található: ${templateDir}`);
    rl.close();
    return;
  }

  // Copy template to new project (exclude node_modules and dist)
  fs.cpSync(templateDir, projectDir, { 
    recursive: true,
    filter: (src) => {
      const basename = path.basename(src);
      return basename !== 'node_modules' && basename !== 'dist';
    }
  });

  // Update package.json with project name
  const packageJsonPath = path.join(projectDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = projectName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Update site.ts with project-specific data
  const siteConfigPath = path.join(projectDir, 'src', 'data', 'site.ts');
  let siteConfig = fs.readFileSync(siteConfigPath, 'utf8');
  siteConfig = siteConfig.replace(/Spektra Project/g, siteName);
  siteConfig = siteConfig.replace(/spektra-project/g, projectName);
  fs.writeFileSync(siteConfigPath, siteConfig);

  // Update index.html with project name
  const indexHtmlPath = path.join(projectDir, 'index.html');
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  indexHtml = indexHtml.replace(/Spektra Project/g, siteName);
  fs.writeFileSync(indexHtmlPath, indexHtml);

  console.log(`✅ ${projectName} projekt sikeresen létrehozva!\n`);
  console.log('Következő lépések:');
  console.log(`1. cd projects/${projectName}`);
  console.log(`2. pnpm install`);
  console.log(`3. Szerkeszd a src/data/site.ts fájlt (brand, színek, kapcsolat)`);
  console.log(`4. Szerkeszd a src/data/content.ts fájlt (tartalom)`);
  console.log(`5. pnpm dev\n`);
  console.log('📚 Dokumentáció: engine/templates/baseline/README.md\n');

  rl.close();
}

createClient().catch(console.error);
