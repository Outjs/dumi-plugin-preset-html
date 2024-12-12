import { defineConfig } from 'tsup';

export default defineConfig([
  {
    name: 'compiler',
    entry: {
      compiler: 'src/compiler/browser.ts',
    },
    format: 'esm',
    outDir: 'lib',
    target: 'esnext',
    platform: 'browser',
    noExternal: ['hash-sum','cheerio'],
    treeshake: true,
  },
  {
    name: 'renderer',
    entry: {
      renderer: 'src/runtime/renderer.ts',
    },
    format: 'esm',
    outDir: 'lib',
    target: 'esnext',
    platform: 'browser',
    noExternal: ['hash-sum','cheerio'],
    treeshake: true,
  },
  {
    name: 'preflight',
    entry: {
      preflight: 'src/runtime/preflight.ts',
    },
    format: 'esm',
    outDir: 'lib',
    target: 'esnext',
    platform: 'browser',
    treeshake: true,
  },
  {
    name: 'previewer',
    entry: ['src/runtime/runtimePlugin.ts'],
    format: 'esm',
    outDir: 'lib',
    target: 'esnext',
    platform: 'browser',
    treeshake: true,
  },
]);
