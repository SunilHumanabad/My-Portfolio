import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Claude Code skills, their local runtimes, and generated reports are not app code.
    '.claude/**',
    'graphify-out/**',
    '*-audit/**',
  ]),
]);
