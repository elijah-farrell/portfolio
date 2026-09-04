import { build } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const settingsSrc = fs.readFileSync(
  path.join(root, "src/config/settings.ts"),
  "utf8"
);
const servicesEnabled = /services:\s*\{[^}]*enabled:\s*true/.test(settingsSrc);

await build({
  root,
  configFile: path.join(root, "vite.config.ts"),
  build: {
    ssr: path.join("src", "entry-server.tsx"),
    outDir: ssrDir,
    emptyOutDir: true,
    minify: false,
    cssCodeSplit: false,
    copyPublicDir: false,
  },
  ssr: {
    noExternal: true,
  },
});

const ssrEntry = path.join(ssrDir, "entry-server.js");
if (!fs.existsSync(ssrEntry)) {
  throw new Error(`SSR bundle missing at ${ssrEntry}`);
}

const { render } = await import(pathToFileURL(ssrEntry).href);
const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
const rootRe = /<div id="root">\s*<\/div>/;

if (!rootRe.test(template)) {
  throw new Error('Could not find <div id="root"></div> in dist/index.html');
}

const routes = ["/"];
if (servicesEnabled) routes.push("/services");

for (const url of routes) {
  const appHtml = render(url);
  if (typeof appHtml !== "string" || appHtml.length < 200) {
    throw new Error(`Prerender produced too little HTML for ${url}`);
  }
  if (!appHtml.includes("Elijah")) {
    throw new Error(`Prerendered ${url} is missing expected page content`);
  }

  const html = template.replace(rootRe, `<div id="root">${appHtml}</div>`);
  if (url === "/") {
    fs.writeFileSync(path.join(distDir, "index.html"), html);
  } else {
    const dir = path.join(distDir, url.slice(1));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
  }
  console.log(`Prerendered ${url} (${appHtml.length} chars)`);
}

fs.rmSync(ssrDir, { recursive: true, force: true });
