const { PluginApi } = require('@rispa/core')

class UiKitPluginApi extends PluginApi {
  static startHandler(context) {
    const instance = context.get(UiKitPluginApi.pluginName)

    return instance.createStorybookConfig()
  }

  createStorybookConfig() {
    this.instance.createStorybookConfig()
  }

  addStories(stories) {
    this.instance.addStories(stories)
  }
}

UiKitPluginApi.pluginName = '@rispa/ui-kit'

module.exports = UiKitPluginApi
