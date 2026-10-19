import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const base = "/projekty/navrhy/autoskola-nova";
const dist = new URL("../dist/", import.meta.url);

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(path);
      continue;
    }
    if (!/\.(html|css)$/.test(entry.name)) continue;

    let content = await readFile(path, "utf8");
    if (entry.name.endsWith(".html")) {
      content = content
        .replace(/(\b(?:href|src|content)=["'])\/(?!\/)/g, `$1${base}/`)
        .replace(/(\burl=)\/(?!\/)/g, `$1${base}/`);
    }
    content = content.replace(/(url\(["']?)\/(?!\/)/g, `$1${base}/`);
    await writeFile(path, content);

    const unprefixedRootUrl =
      /(\b(?:href|src|content)=["']|\burl=|url\(["']?)\/(?!\/|projekty\/navrhy\/autoskola-nova\/)/;
    if (unprefixedRootUrl.test(content)) {
      throw new Error(`Unprefixed root URL in ${path}`);
    }
  }
}

await visit(dist.pathname);
console.log(`Built site URLs prefixed with ${base}/`);
