import typescript from '@rollup/plugin-typescript'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
    },
    {
      format: 'umd',
      file: 'dist/index.umd.js',
      name: 'ds',
    },
    {
      format: 'cjs',
      file: 'dist/index.cjs.js',
    },
  ],
  plugins: [typescript()],
}

export default config
