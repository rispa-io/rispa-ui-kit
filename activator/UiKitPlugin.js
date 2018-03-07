const path = require('path')
const { PluginInstance } = require('@rispa/core')
const WebpackPluginApi = require('@rispa/webpack')
const RenderServerPluginApi = require('@rispa/render-server')
const commonWebpackConfig = require('./webpack/common.wpc')
const ssrCache = require('../ssr-cache')
const createStorybookConfig = require('../.storybook/createConfig')

class UiKitPlugin extends PluginInstance {
  constructor(context) {
    super(context)

    this.webpack = context.get(WebpackPluginApi.pluginName)
    this.renderServer = context.get(RenderServerPluginApi.pluginName)

    this.storiesContexts = [
      path.resolve(__dirname, '../atoms'),
      path.resolve(__dirname, '../molecules'),
    ]
  }

  start() {
    this.webpack.addCommonConfig(commonWebpackConfig)

    this.renderServer.setCache(ssrCache)
  }

  addStories(stories) {
    this.storiesContexts = this.storiesContexts.concat(stories)
  }

  createStorybookConfig() {
    createStorybookConfig(this.storiesContexts)
  }
}

module.exports = UiKitPlugin
