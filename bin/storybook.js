const path = require('path')
const { init } = require('@rispa/core')
const { searchRootProjectDir } = require('@rispa/core/lib/plugins')
const { startHandler } = require('../activator/UiKitPluginApi')
const createStorybookConfig = require('../.storybook/createConfig')

if (searchRootProjectDir(process.cwd())) {
  init(startHandler)
} else {
  createStorybookConfig([
    path.resolve(__dirname, '../atoms'),
    path.resolve(__dirname, '../molecules'),
  ])
}
