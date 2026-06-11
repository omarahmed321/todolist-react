import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { basename } from "path";

// ── Helpers ──────────────────────────────────────────────────
const log   = (msg) => console.log(`[INFO] ${msg}`);
const ok    = (msg) => console.log(`[OK]   ${msg}`);
const warn  = (msg) => console.log(`[WARN] ${msg}`);
const error = (msg) => { console.error(`[ERROR] ${msg}`); process.exit(1); };

const run = (cmd, silent = false) => {
  try {
    execSync(cmd, { stdio: silent ? "pipe" : "inherit" });
  } catch (e) {
    error(`Command failed: ${cmd}`);
  }
};

const runOutput = (cmd) => {
  try {
    return execSync(cmd, { stdio: "pipe" }).toString().trim();
  } catch {
    return null;
  }
};

// ── 1. Check argument ────────────────────────────────────────
const REPO_URL = process.argv[2];
if (!REPO_URL) {
  console.log("Usage  : node deploy.js <repo-url>");
  console.log("Example: node deploy.js https://github.com/john/my-app.git");
  process.exit(1);
}

const REPO_NAME = basename(REPO_URL.replace(/\.git$/, ""));

log(`Project name : ${REPO_NAME}`);
log(`Repo URL     : ${REPO_URL}`);
console.log();

// ── 2. Check required tools ──────────────────────────────────
log("Checking required tools...");
if (!runOutput("node -v"))  error("Node.js not found!");
if (!runOutput("npm -v"))   error("npm not found!");
if (!runOutput("git --version")) error("git not found!");
ok(`Node ${runOutput("node -v")}`);
console.log();

// ── 3. Check package.json ────────────────────────────────────
if (!existsSync("package.json")) error("No package.json found! Make sure you are inside your project folder.");
ok("package.json found");
console.log();

// ── 4. npm install ───────────────────────────────────────────
log("Installing dependencies...");
run("npm install");
ok("npm install done");
console.log();

// ── 5. Install gh-pages ──────────────────────────────────────
log("Installing gh-pages...");
run("npm install --save-dev gh-pages");
ok("gh-pages installed");
console.log();

// ── 6. Patch vite.config ─────────────────────────────────────
log("Patching vite.config...");

let configFile = null;
if (existsSync("vite.config.ts")) configFile = "vite.config.ts";
else if (existsSync("vite.config.js")) configFile = "vite.config.js";
else error("vite.config.js or vite.config.ts not found!");

log(`Config file: ${configFile}`);

let config = readFileSync(configFile, "utf-8");

if (config.includes("base:")) {
  config = config.replace(/base:\s*['"][^'"]*['"]/, `base: '/${REPO_NAME}/'`);
  warn("base already existed — updated it");
} else {
  config = config.replace("defineConfig({", `defineConfig({\n  base: '/${REPO_NAME}/',`);
}

writeFileSync(configFile, config, "utf-8");
ok(`vite.config patched — base: '/${REPO_NAME}/'`);
console.log();

// ── 7. Add deploy script to package.json ─────────────────────
log("Adding deploy script to package.json...");
run('npm pkg set scripts.deploy="gh-pages -d dist"');
ok("scripts.deploy added");
console.log();

// ── 8. Build project ─────────────────────────────────────────
log("Building project (npm run build)...");
run("npm run build");
ok("Build done — dist folder ready");
console.log();

// ── 9. Setup Git ─────────────────────────────────────────────
log("Setting up Git...");

if (!existsSync(".git")) {
  log("Running git init...");
  run("git init");
  run("git branch -M main");
}

const currentRemote = runOutput("git remote get-url origin");
if (!currentRemote) {
  run(`git remote add origin "${REPO_URL}"`);
} else if (currentRemote !== REPO_URL) {
  warn(`origin exists with a different URL, updating it...`);
  run(`git remote set-url origin "${REPO_URL}"`);
}

ok("Git ready");
console.log();

// ── 10. Push code to main ────────────────────────────────────
log("Pushing code to GitHub (branch: main)...");

run("git add .");

const diff = runOutput("git diff --staged --name-only");
if (diff) {
  const date = new Date().toISOString().split("T")[0];
  run(`git commit -m "deploy: ${date}"`);
} else {
  warn("No changes to commit on main");
}

run("git push -u origin main");
ok("Code pushed to main");
console.log();

// ── 11. Deploy to gh-pages ───────────────────────────────────
log("Deploying dist to gh-pages branch...");
run("npm run deploy");
ok("gh-pages branch deployed!");
console.log();

// ── 12. Summary ──────────────────────────────────────────────
const githubUser = REPO_URL.replace("https://github.com/", "").split("/")[0];

console.log("================================================");
console.log("  Deploy complete!");
console.log("================================================");
console.log();
console.log("  Your site URL:");
console.log(`  https://${githubUser}.github.io/${REPO_NAME}/`);
console.log();
console.log("  Note: may take 2-3 minutes to go live.");
console.log(`  Check status at: https://github.com/${githubUser}/${REPO_NAME}/actions`);
console.log();
