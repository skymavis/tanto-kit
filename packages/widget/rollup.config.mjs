import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import typescript from 'rollup-plugin-typescript2';

const production = !process.env.ROLLUP_WATCH && process.env.NODE_ENV === 'production';

const config = defineConfig({
  input: ['src/index.ts'],
  output: [
    {
      dir: 'dist/mjs',
      format: 'esm',
      preserveModulesRoot: 'src',
      preserveModules: true,
      compact: true,
      minifyInternalExports: true,
      entryFileNames: '[name].mjs',
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModulesRoot: 'src',
      preserveModules: true,
      exports: 'named',
      entryFileNames: '[name].cjs',
    },
  ],
  external: id =>
    [
      'react',
      'react-dom',
      'react-is',
      'lodash.debounce',
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
      'boring-avatars',
      '@tanstack/react-query',
    ].some(pkg => id === pkg || id.startsWith(`${pkg}/`) || id.startsWith(`@${pkg}/`)),
  plugins: [
    peerDepsExternal(),
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
    resolve({
      browser: true,
      preferBuiltins: true,
      dedupe: ['react', 'react-dom', 'use-sync-external-store'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    nodePolyfills(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: ['@emotion/babel-plugin'],
      exclude: 'node_modules/**',
    }),
    production && terser(),
  ].filter(Boolean),
});

export default config;
