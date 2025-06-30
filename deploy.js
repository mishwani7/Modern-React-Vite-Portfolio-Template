#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";

console.log("🚀 Starting deployment process...");

try {
  // Build React app for production
  console.log("📦 Building for production...");
  execSync("npm run build", { stdio: "inherit" });

  // Check if build folder exists
  if (!fs.existsSync("./build")) {
    throw new Error("Build folder not found!");
  }

  // Change directory to build folder
  process.chdir("./build");

  // Initialize git if it does not exist in build folder
  if (!fs.existsSync(".git")) {
    console.log("🔧 Initializing git in build folder...");
    execSync("git init", { stdio: "inherit" });
  }

  // Add all files
  console.log("📝 Adding files...");
  execSync("git add .", { stdio: "inherit" }); // Commit changes with timestamp
  const timestamp = new Date().toISOString();
  console.log("💾 Committing changes...");
  try {
    execSync(`git commit -m "Deploy React build - ${timestamp}"`, {
      stdio: "inherit",
    });
  } catch (error) {
    if (error.status === 1) {
      console.log("ℹ️ No changes to commit, proceeding with deployment...");
    } else {
      throw error;
    }
  }

  // Check if remote origin exists, add if not
  try {
    execSync("git remote get-url origin", { stdio: "pipe" });
  } catch {
    console.log("🔗 Adding remote repository...");
    execSync(
      "git remote add origin https://github.com/mishwani7/abu.github.io.git",
      { stdio: "inherit" }
    );
  }
  // Force push to main branch
  console.log("🚢 Deploying to main branch...");
  execSync("git push -f origin HEAD:main", { stdio: "inherit" });
  console.log("✅ Deployment completed successfully!");
  console.log(
    "🌐 Your site files are now on the main branch at: https://github.com/mishwani7/abu.github.io"
  );
} catch (error) {console.error("❌ Deployment failed:", error.message);
  process.exit(1);
}
