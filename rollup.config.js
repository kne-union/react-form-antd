import babel from 'rollup-plugin-babel'
import cssBundle from 'rollup-plugin-css-bundle'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'

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
            cssBundle({
                include: ['**/*.scss'],
                output: path.resolve('dist/style.scss')
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
            cssBundle({
                include: ['**/*.scss'],
                output: path.resolve('dist/style.scss')
            }),
            resolve(),
            commonjs()
        ]
    }
]
