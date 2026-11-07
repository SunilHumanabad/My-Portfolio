// Tiny zero-dependency static server for previewing the exported site in /out.
// Usage: npm run build && npm start   (PORT=4000 npm start to change the port)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'out');
const port = Number(process.env.PORT) || 3000;
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml',
};

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = normalize(join(root, url));
  if (!file.startsWith(root)) return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
  } catch {
    file = (await stat(`${file}.html`).catch(() => null)) ? `${file}.html` : join(root, '404.html');
  }
  try {
    const body = await readFile(file);
    res.writeHead(file.endsWith('404.html') && !url.endsWith('404.html') ? 404 : 200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
    });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found — run `npm run build` first.');
  }
}).listen(port, () => console.log(`Serving ./out at http://localhost:${port}`));
