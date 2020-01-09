import babel from 'rollup-plugin-babel'
import cssBundle from 'rollup-plugin-css-bundle'
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
    }
]
