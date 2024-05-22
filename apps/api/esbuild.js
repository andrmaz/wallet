const {esbuildDecorators} = require('esbuild-decorators')

/** @type {import('esbuild').BuildOptions}  */
module.exports = {
  sourcemap: false,
  outExtension: {
    '.js': '.js',
  },
  plugins: [esbuildDecorators()],
}
