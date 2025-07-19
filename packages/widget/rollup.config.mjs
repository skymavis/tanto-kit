import fs from 'node:fs';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

const production = !process.env.ROLLUP_WATCH && process.env.NODE_ENV === 'production';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (!packageJson.version) {
  throw new Error('package.json is missing version');
}

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
      'lodash.omit',
      'use-resize-observer',
      'vaul',
      'ua-parser-js',
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
      'uuid',
      'zod',
      'react-hook-form',
      '@hookform/resolvers',
      'input-otp',
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
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: ['@emotion/babel-plugin'],
      exclude: 'node_modules/**',
    }),
    production && terser(),
    replace({
      __sdkVersion: `'${packageJson.version}'`,
      __sdkName: `'${packageJson.name}'`,
      preventAssignment: true,
    }),
  ].filter(Boolean),
});

export default config;
