import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss';

import path from 'path';
import pkg from './package.json'

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true
            }
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            postcss({

            })
        ]
    },
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.umd,
                name: "ReactFormAntd",
                format: 'umd',
                sourcemap: true
            },
            {
                file: pkg['umd:min'],
                name: "ReactFormAntd",
                format: 'umd',
                sourcemap: true,
                plugins: [terser()]
            }
        ],
        plugins: [
            external(),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            postcss({}),
            resolve(),
            commonjs()
        ]
    }
]
