#!/usr/bin/env node
/**
 * Build and pack the site for GoDaddy cPanel deployment.
 * Output: godaddy-deploy.zip (contents of dist/) in project root.
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const zipPath = path.join(rootDir, "godaddy-deploy.zip");

console.log("Building project...");
execSync("npm run build", { cwd: rootDir, stdio: "inherit" });

if (!fs.existsSync(distDir)) {
  console.error("dist/ not found after build.");
  process.exit(1);
}

console.log("Creating godaddy-deploy.zip...");
const output = fs.createWriteStream(zipPath);
const archive = archiver("zip", { zlib: { level: 9 } });

archive.pipe(output);
archive.directory(distDir, false);
archive.finalize();

output.on("close", () => {
  console.log(`Done. Upload ${path.basename(zipPath)} to cPanel and extract into public_html.`);
});

archive.on("error", (err) => {
  console.error(err);
  process.exit(1);
});
