import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import typescript from 'rollup-plugin-typescript2';

const config = defineConfig({
  input: ['src/index.ts'],
  output: [
    {
      dir: 'dist/mjs',
      format: 'esm',
      sourcemap: false,
      compact: true,
      minifyInternalExports: true,
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: false,
    },
  ],
  external: id =>
    [
      'react',
      'react-dom',
      'react-is',
      'lodash.debounce',
      'use-callback-ref',
      'use-resize-observer',
      'vaul',
      'detect-browser',
      'qr-code-styling',
      '@sky-mavis/tanto-connect',
      '@sky-mavis/tanto-wagmi',
      '@emotion',
      '@radix-ui',
      'motion',
      'viem',
      'wagmi',
    ].some(pkg => id === pkg || id.startsWith(`${pkg}/`) || id.startsWith(`@${pkg}/`)),
  plugins: [
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
    resolve({
      browser: true,
      preferBuiltins: true,
      dedupe: ['react', 'react-dom', 'use-sync-external-store'],
    }),
    nodePolyfills(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: ['@emotion/babel-plugin'],
      exclude: 'node_modules/**',
    }),
  ],
});

export default config;
