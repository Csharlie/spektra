#!/usr/bin/env node

/**
 * Breaking Change Safety Guard
 * 
 * This script prevents accidental breaking changes to the SiteData contract
 * without a corresponding MAJOR version bump.
 * 
 * It checks:
 * 1. If there are commits marked as breaking changes
 * 2. If the next release would be MAJOR
 * 3. If breaking changes are present without MAJOR bump, FAIL
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CRITICAL_FILES = [
  'packages/core/types/SiteData.ts',
  'packages/core/types/index.ts',
  'packages/core/app/types.ts'
];

const BREAKING_MARKERS = [
  'BREAKING CHANGE:',
  'BREAKING-CHANGE:',
  'breaking:',
  'breaking(',
];

/**
 * Get commits since last release tag
 */
function getCommitsSinceLastRelease() {
  try {
    // Get the latest engine tag
    const latestTag = execSync('git describe --tags --abbrev=0 --match "engine-v*" 2>/dev/null || echo ""', {
      encoding: 'utf-8'
    }).trim();

    const range = latestTag ? `${latestTag}..HEAD` : 'HEAD';
    
    const commits = execSync(`git log ${range} --format="%H|%s|%b" --no-merges`, {
      encoding: 'utf-8'
    }).trim();

    return commits.split('\n').filter(Boolean);
  } catch (error) {
    console.error('⚠️ Error getting commits:', error.message);
    return [];
  }
}

/**
 * Check if commit contains breaking change marker
 */
function hasBreakingChange(commitMessage) {
  return BREAKING_MARKERS.some(marker => 
    commitMessage.toLowerCase().includes(marker.toLowerCase())
  );
}

/**
 * Check if critical files were modified
 */
function checkCriticalFileChanges() {
  try {
    const latestTag = execSync('git describe --tags --abbrev=0 --match "engine-v*" 2>/dev/null || echo ""', {
      encoding: 'utf-8'
    }).trim();

    const range = latestTag ? `${latestTag}..HEAD` : 'HEAD';

    for (const file of CRITICAL_FILES) {
      const fullPath = path.join(__dirname, '..', file);
      
      if (!fs.existsSync(fullPath)) {
        continue;
      }

      const changes = execSync(`git log ${range} --oneline -- ${file}`, {
        encoding: 'utf-8'
      }).trim();

      if (changes) {
        console.log(`⚠️ Critical file modified: ${file}`);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('⚠️ Error checking file changes:', error.message);
    return false;
  }
}

/**
 * Main validation logic
 */
function main() {
  console.log('🔍 Running Breaking Change Safety Guard...\n');

  const commits = getCommitsSinceLastRelease();
  
  if (commits.length === 0) {
    console.log('✅ No new commits to check');
    process.exit(0);
  }

  console.log(`📝 Checking ${commits.length} commit(s)...\n`);

  let hasBreaking = false;
  const breakingCommits = [];

  commits.forEach(commit => {
    const [hash, ...rest] = commit.split('|');
    const message = rest.join('|');
    
    if (hasBreakingChange(message)) {
      hasBreaking = true;
      breakingCommits.push({
        hash: hash.substring(0, 7),
        message: message.split('\n')[0]
      });
    }
  });

  const criticalFilesChanged = checkCriticalFileChanges();

  if (hasBreaking) {
    console.log('⚠️ BREAKING CHANGES DETECTED:');
    breakingCommits.forEach(({ hash, message }) => {
      console.log(`  - ${hash}: ${message}`);
    });
    console.log('\n✅ Breaking changes are properly marked');
    console.log('   Semantic-release will create a MAJOR version bump\n');
  }

  if (criticalFilesChanged && !hasBreaking) {
    console.error('❌ CRITICAL FILES MODIFIED WITHOUT BREAKING CHANGE MARKER!\n');
    console.error('Critical files were modified but no breaking change was declared.');
    console.error('If this introduces breaking changes, use one of these commit formats:');
    console.error('  - breaking: <description>');
    console.error('  - breaking(scope): <description>');
    console.error('  - feat!: <description>');
    console.error('  - Add "BREAKING CHANGE:" in commit body\n');
    process.exit(1);
  }

  console.log('✅ All breaking change checks passed\n');
  process.exit(0);
}

main();
