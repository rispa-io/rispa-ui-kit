const babelJest = require('babel-jest')
const babelConfig = require('@rispa/babel/config')

module.exports = babelJest.createTransformer(babelConfig)
