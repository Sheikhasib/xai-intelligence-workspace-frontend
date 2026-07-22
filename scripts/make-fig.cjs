const fs = require('fs');
const crypto = require('crypto');
const { execSync } = require('child_process');

const uid = () => crypto.randomUUID();

// Minimal valid Figma document with all required fields
const doc = {
  type: 'DOCUMENT',
  id: uid(),
  name: 'Xai - Intelligence Workspace',
  visible: true,
  locked: false,
  opacity: 1,
  blendMode: 'PASS_THROUGH',
  children: [{
    type: 'CANVAS',
    id: uid(),
    name: 'Design System',
    visible: true,
    locked: false,
    opacity: 1,
    blendMode: 'PASS_THROUGH',
    backgroundColor: { r: 0.05, g: 0.07, b: 0.09 },
    children: [],
  }],
};

const meta = { version: '1.0.0', fileVersion: 1 };

const tmp = './_fig_test';
fs.mkdirSync(tmp, { recursive: true });
fs.writeFileSync(tmp + '/document.json', JSON.stringify({ document: doc }) + '\n', 'utf8');
fs.writeFileSync(tmp + '/meta.json', JSON.stringify(meta) + '\n', 'utf8');

const p1 = (tmp + '/document.json').replace(/'/g, "''");
const p2 = (tmp + '/meta.json').replace(/'/g, "''");
const out = './Xai-Test.fig';
execSync(`powershell.exe -Command "Compress-Archive -Path '${p1}','${p2}' -DestinationPath '${out}' -Force"`);
console.log('Done. Size:', fs.statSync(out).size, 'bytes');
