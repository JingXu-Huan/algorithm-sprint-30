import { copyFile, mkdir } from "node:fs/promises";

const files = ["index.html", "styles.css", "app.js"];

await mkdir("dist", { recursive: true });
await Promise.all(files.map((file) => copyFile(`src/${file}`, `dist/${file}`)));

console.log(`Built ${files.length} files into dist/`);
