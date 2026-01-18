#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// ========================================
// READLINE INTERFACE
// ========================================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

// ========================================
// VALIDATION
// ========================================

function validateFolderName(name: string): boolean {
  if (!name) {
    return false;
  }
  const validPattern = /^[a-z0-9-]+$/;
  return validPattern.test(name);
}

function validateDisplayName(name: string): boolean {
  return name.length > 0;
}

// ========================================
// FILE OPERATIONS
// ========================================

function copyDirectoryRecursive(source: string, target: string): void {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const items = fs.readdirSync(source);

  for (const item of items) {
    // Skip node_modules directory
    if (item === 'node_modules') {
      continue;
    }

    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      copyDirectoryRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function updatePackageJson(targetDir: string, folderName: string): void {
  const packageJsonPath = path.join(targetDir, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.error('⚠️  Figyelmeztetés: package.json nem található a célmappában.');
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  packageJson.name = folderName;

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n',
    'utf-8'
  );
}

function createOrUpdateEnvFile(targetDir: string, displayName: string): void {
  const envPath = path.join(targetDir, '.env');
  let envContent = '';

  // Read existing .env if present
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  }

  // Parse existing env variables
  const envLines = envContent.split('\n');
  const envMap = new Map<string, string>();

  for (const line of envLines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key) {
        envMap.set(key.trim(), valueParts.join('='));
      }
    }
  }

  // Set or update VITE_SITE_NAME
  envMap.set('VITE_SITE_NAME', displayName);

  // Rebuild env file content
  const newEnvLines: string[] = [];
  for (const [key, value] of envMap.entries()) {
    newEnvLines.push(`${key}=${value}`);
  }

  fs.writeFileSync(envPath, newEnvLines.join('\n') + '\n', 'utf-8');
}

function updateWorkspaceConfig(folderName: string): void {
  const rootDir = process.cwd();
  const workspaceYamlPath = path.join(rootDir, 'projects', 'pnpm-workspace.yaml');

  if (!fs.existsSync(workspaceYamlPath)) {
    console.error('⚠️  Figyelmeztetés: pnpm-workspace.yaml nem található.');
    return;
  }

  let yamlContent = fs.readFileSync(workspaceYamlPath, 'utf-8');
  const lines = yamlContent.split('\n');
  
  // Check if project already in workspace
  const projectEntry = `  - '${folderName}'`;
  if (yamlContent.includes(projectEntry)) {
    return; // Already added
  }

  // Find packages: line and add new project
  const packagesIndex = lines.findIndex(line => line.trim() === 'packages:');
  if (packagesIndex !== -1) {
    // Insert after packages: line
    lines.splice(packagesIndex + 1, 0, projectEntry);
    fs.writeFileSync(workspaceYamlPath, lines.join('\n'), 'utf-8');
  }
}

// ========================================
// MAIN LOGIC
// ========================================

async function main(): Promise<void> {
  console.log('🚀 Új projekt létrehozása\n');

  // 1. Ask for folder name
  let folderName = '';
  while (true) {
    folderName = await question('Projekt mappa név (csak kisbetűk, számok, kötőjelek): ');

    if (!folderName) {
      console.error('❌ A mappa név nem lehet üres!\n');
      continue;
    }

    if (!validateFolderName(folderName)) {
      console.error('❌ Érvénytelen mappa név! Csak kisbetűk, számok és kötőjelek engedélyezettek.\n');
      continue;
    }

    // Check if target already exists
    const rootDir = process.cwd();
    const targetDir = path.join(rootDir, 'projects', folderName);

    if (fs.existsSync(targetDir)) {
      console.error(`❌ A célmappa már létezik: projects/${folderName}\n`);
      continue;
    }

    break;
  }

  // 2. Ask for display name
  let displayName = '';
  while (true) {
    displayName = await question('Weboldal / márka megjelenítendő név: ');

    if (!validateDisplayName(displayName)) {
      console.error('❌ A megjelenítendő név nem lehet üres!\n');
      continue;
    }

    break;
  }

  // 3. Ask for template
  let template = '';
  while (true) {
    console.log('\nElérhető template-ek:');
    console.log('  1. baseline  - Alap sablon (egyszerű, routing nélkül)');
    console.log('  2. routeline - Routing-al és AppShell komponenssel');
    
    const choice = await question('\nVálassz template-et (1 vagy 2): ');

    if (choice === '1' || choice.toLowerCase() === 'baseline') {
      template = 'baseline';
      break;
    } else if (choice === '2' || choice.toLowerCase() === 'routeline') {
      template = 'routeline';
      break;
    } else {
      console.error('❌ Érvénytelen választás! Válassz 1 vagy 2-t.\n');
    }
  }

  rl.close();

  console.log('\n📦 Projekt létrehozása...\n');

  // 4. Define paths
  const rootDir = process.cwd();
  const sourceDir = path.join(rootDir, 'engine', 'templates', template);
  const targetDir = path.join(rootDir, 'projects', folderName);

  // 5. Validate source exists
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Hiba: A ${template} sablon nem található!`);
    console.error(`   Keresett útvonal: ${sourceDir}`);
    process.exit(1);
  }

  // 5. Copy template
  console.log(`📁 Template:  ${template}`);
  console.log(`📁 Forrás:    ${sourceDir}`);
  console.log(`📁 Cél:       ${targetDir}\n`);

  try {
    copyDirectoryRecursive(sourceDir, targetDir);
    console.log('✅ Fájlok sikeresen másolva');
  } catch (error) {
    console.error('❌ Hiba a másolás során:', error);
    process.exit(1);
  }

  // 6. Update package.json
  console.log('📝 package.json frissítése...');
  try {
    updatePackageJson(targetDir, folderName);
    console.log('✅ package.json frissítve');
  } catch (error) {
    console.error('❌ Hiba a package.json frissítése során:', error);
    process.exit(1);
  }

  // 7. Create/update .env
  console.log('🔧 Környezeti változók konfigurálása...');
  try {
    createOrUpdateEnvFile(targetDir, displayName);
    console.log('✅ .env fájl létrehozva/frissítve');
  } catch (error) {
    console.error('❌ Hiba a .env fájl létrehozása során:', error);
    process.exit(1);
  }

  // 8. Update workspace config
  console.log('📦 Workspace konfiguráció frissítése...');
  try {
    updateWorkspaceConfig(folderName);
    console.log('✅ pnpm-workspace.yaml frissítve');
  } catch (error) {
    console.error('⚠️  Figyelmeztetés: workspace config frissítése sikertelen:', error);
  }

  // 9. Success
  console.log('\n✅ Projekt sikeresen létrehozva!\n');
  console.log(`📦 Mappa név:        ${folderName}`);
  console.log(`🏷️  Megjelenített név: ${displayName}`);
  console.log(`📍 Helye:            projects/${folderName}\n`);
  console.log('Következő lépések:');
  console.log(`  cd projects`);
  console.log('  pnpm install');
  console.log(`  cd ${folderName}`);
  console.log('  pnpm dev\n');
}

// ========================================
// ENTRY POINT
// ========================================

main().catch((error) => {
  console.error('❌ Váratlan hiba:', error);
  process.exit(1);
});
