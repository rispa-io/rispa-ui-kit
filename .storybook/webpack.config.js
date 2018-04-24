const path = require('path')
const fs = require('fs-extra')
const commonLoaders = require('../activator/webpack/common-loaders')

const babelConfig = fs.readJsonSync(path.resolve(__dirname, '../.babelrc'))

const babelLoader = require.resolve('babel-loader')

const classNamesLoader = path.resolve(__dirname, '../activator/webpack/classnames-loader.js')

module.exports = baseConfig => Object.assign(
  {},
  baseConfig,
  {
    resolve: {
      modulesDirectories: [
        'node_modules',
      ],
      extensions: ['.json', '.js', ''],
    },
    module: {
      loaders: commonLoaders.concat([
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            `${babelLoader}?${JSON.stringify(babelConfig)}`,
          ],
        },
        {
          test: /\.sss$/,
          loaders: [
            classNamesLoader,
            'style-loader',
            'css-loader?modules=true&importLoaders=1&localIdentName=[name]_[local]',
            'postcss-loader',
          ],
        },
      ]),
    },
  }
)
