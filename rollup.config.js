import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import autoExternal from 'rollup-plugin-auto-external';
import cleaner from 'rollup-plugin-cleaner';
import dts from 'rollup-plugin-dts';
import externals from 'rollup-plugin-node-externals';
import renameNodeModules from 'rollup-plugin-rename-node-modules';
import { terser } from 'rollup-plugin-terser';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import typescript from 'rollup-plugin-typescript2';
import visualizer from 'rollup-plugin-visualizer';

const sourceRoot = 'src';
const outputFolder = 'lib';
const typesOutputFolder = `${outputFolder}/dts`;

export default [
  // This config builds the package
  // and the d.ts files:
  {
    input: [`${sourceRoot}/index.ts`],
    output: [
      {
        dir: `${outputFolder}/cjs`,
        format: 'cjs',
        sourcemap: false
      },
      {
        dir: outputFolder,
        format: 'esm',
        sourcemap: false
      }
    ],
    plugins: [
      autoExternal(),
      cleaner({
        targets: [outputFolder]
      }),
      commonjs(),
      externals({ peerDeps: true }),
      json(),
      renameNodeModules(),
      resolve(),
      terser(),
      typescriptPaths({
        preserveExtensions: true,
        tsConfigPath: 'tsconfig.build.json'
      }),
      typescript({
        tsconfig: 'tsconfig.build.json',
        useTsconfigDeclarationDir: true
      }),
      visualizer({
        filename: 'bundle-analysis.html'
      })
    ],
    external: ['typescript']
  },
  // This config will combine all d.ts files
  // created by the previous config into
  // a single 'index.d.ts' file in the 'lib'
  // folder:
  {
    // Path to your declaration files root
    // in the built destination:
    input: `${typesOutputFolder}/index.d.ts`,
    output: [{ file: `${outputFolder}/index.d.ts`, format: 'es' }],
    plugins: [
      dts(),
      // After the build remove the folder
      // with the separate d.ts files:
      {
        buildEnd() {
          fs.rmSync(typesOutputFolder, { force: true, recursive: true });
        }
      }
    ]
  }
];

