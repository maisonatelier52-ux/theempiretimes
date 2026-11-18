const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const workspace = 'c:\\Users\\p1kochi\\Downloads\\static 4';
const logFile = path.join(workspace, 'scratch', 'server.log');
const out = fs.openSync(logFile, 'a');
const err = fs.openSync(logFile, 'a');

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const child = spawn(npx, ['next', 'start', '-p', '3000'], {
  cwd: workspace,
  detached: true,
  stdio: ['ignore', out, err],
  shell: true
});

child.unref();

console.log('Spawned detached next server in', workspace, 'with PID:', child.pid);
