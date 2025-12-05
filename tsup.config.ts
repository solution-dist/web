import { defineConfig } from 'tsup';

export default defineConfig({
    entry               : ['src/main.ts'],
    format              : ['cjs', 'esm'],
    dts                 : true,
    splitting           : false,
    sourcemap           : true,
    clean               : true,
    minify              : true,
    treeshake           : true,
    external            : [
        // Bun runtime
        'bun', 'bun:sqlite',

        // Dependencies
        '@je-es/server',
    ],
    target              : 'node23',
    outDir              : 'dist',
    platform            : 'node',
    banner              : {
        js              : '#!/usr/bin/env bun'
    },
});