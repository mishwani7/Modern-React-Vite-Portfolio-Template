#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting deployment process...');

try {
  // Ensure we have a clean build
  console.log('📦 Building for production...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check if dist folder exists
  if (!fs.existsSync('./dist')) {
    throw new Error('Build folder not found!');
  }

  // Navigate to dist folder
  process.chdir('./dist');

  // Initialize git if not already initialized
  if (!fs.existsSync('.git')) {
    console.log('🔧 Initializing git in dist folder...');
    execSync('git init', { stdio: 'inherit' });
  }

  // Add all files
  console.log('📝 Adding files...');
  execSync('git add .', { stdio: 'inherit' });

  // Commit
  const timestamp = new Date().toISOString();
  console.log('💾 Committing changes...');
  execSync(`git commit -m "Deploy React build - ${timestamp}"`, { stdio: 'inherit' });

  // Add remote if not exists
  try {
    execSync('git remote get-url origin', { stdio: 'pipe' });
  } catch (e) {
    console.log('🔗 Adding remote repository...');
    execSync('git remote add origin https://github.com/mishwani7/abu.github.io.git', { stdio: 'inherit' });
  }

  // Force push to gh-pages branch
  console.log('🚢 Deploying to GitHub Pages...');
  execSync('git push -f origin HEAD:gh-pages', { stdio: 'inherit' });

  console.log('✅ Deployment completed successfully!');
  console.log('🌐 Your site should be available at: https://mishwani7.github.io/abu.github.io/');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
