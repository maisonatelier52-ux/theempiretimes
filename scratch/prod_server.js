const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Prevent unexpected termination
process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason);
});
process.on('exit', (code) => {
  console.log('process.exit called with code:', code);
});
if (process.stdin.isTTY) {
  process.stdin.resume();
}

// Keep event loop active indefinitely
setInterval(() => {}, 1000 * 60 * 60);

const dev = false;
const hostname = '0.0.0.0';
const port = 3000;

const app = next({ dev, hostname, port, dir: process.cwd() });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  server.listen(port, hostname, () => {
    console.log(`> Custom Next.js production server ready on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
