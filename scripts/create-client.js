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
