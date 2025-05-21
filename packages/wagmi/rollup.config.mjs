import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';

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
  external: ['@wagmi/core', 'viem', '@sky-mavis/tanto-connect'],
  plugins: [
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
});

export default config;
