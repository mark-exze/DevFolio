/**
 * Security audit — scans source for sensitive values that should not
 * ship in a public repository.
 *
 * Run with:  node scripts/security-audit.js
 */

const fs = require('fs')
const path = require('path')

const ROOT = __dirname.replace(/\\scripts$/, '').replace(/\/scripts$/, '')
const SRC_DIR = path.join(ROOT, 'src')

const SENSITIVE_PATTERNS = [
  { name: 'student ID', regex: /\ba23-\d-\d{5}\b/i },
  { name: 'phone number', regex: /\b09\d{2}[-\s]?\d{3}[-\s]?\d{4}\b/ },
  { name: 'PH mobile prefix', regex: /\(\d{3}\)\s?\d{3}[-\s]?\d{4}/ },
  { name: 'private key block', regex: /BEGIN (RSA |OPENSSH |EC |DSA )?PRIVATE KEY/ },
  { name: 'API key literal', regex: /(api[_-]?key|apikey)\s*[:=]\s*['"][^'"]{16,}['"]/i },
  { name: 'token literal', regex: /(token|secret)\s*[:=]\s*['"][^'"]{16,}['"]/i },
  { name: 'password literal', regex: /password\s*[:=]\s*['"][^'"]+['"]/i },
]

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) files.push(full)
  }
  return files
}

let failures = 0
for (const file of walk(SRC_DIR)) {
  const content = fs.readFileSync(file, 'utf8')
  for (const { name, regex } of SENSITIVE_PATTERNS) {
    const match = content.match(regex)
    if (match) {
      failures += 1
      console.error(`[SECURITY] ${name} found in ${path.relative(ROOT, file)}: ${match[0].slice(0, 40)}`)
    }
  }
}

if (failures > 0) {
  console.error(`\nSecurity audit failed: ${failures} sensitive value(s) detected.`)
  process.exit(1)
}
console.log('Security audit passed: no sensitive values detected in src/.')