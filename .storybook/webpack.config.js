const path = require('path')
const fs = require('fs-extra')
const commonLoaders = require('../activator/webpack/common-loaders')

const babelLoader = require.resolve('babel-loader')

const classNamesLoader = path.resolve(__dirname, '../activator/webpack/classnames-loader.js')

const babelrcConfig = fs.readJsonSync(path.resolve(__dirname, '../.babelrc'))

module.exports = baseConfig => Object.assign(
  {},
  baseConfig,
  {
    resolve: {
      modules: [
        'node_modules',
      ],
      extensions: ['.json', '.js', '*'],
    },
    module: {
      rules: commonLoaders.concat([
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            `${babelLoader}?${JSON.stringify(babelrcConfig)}`,
          ],
        },
        {
          test: /\.sss$/,
          use: [
            classNamesLoader,
            'style-loader',
            'css-loader?modules=true&importLoaders=1&localIdentName=[name]_[local]',
            'postcss-loader',
          ],
        },
        {
          test: /\.stories\.jsx?$/,
          loaders: [require.resolve('@storybook/addon-storysource/loader')],
          enforce: 'pre',
        },
      ]),
    },
  }
)
