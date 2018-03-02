const fs = require('fs')
const path = require('path')

const createStorybookConfig = storiesContexts => {
  const stories = storiesContexts
    .map(context => context.replace(/\\/g, '/'))
    .map(context => `require.context('${context}', true, /.stories.js$/)`)

  const configTemplatePath = path.resolve(__dirname, './config.template.js')
  const configPath = path.resolve(__dirname, './config.js')
  const configContent = String(fs.readFileSync(configTemplatePath))

  fs.writeFileSync(
    configPath,
    configContent.replace('// {storiesContexts}', stories.join(',\n')),
  )
}

module.exports = createStorybookConfig