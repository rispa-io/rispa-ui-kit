import { configure, addDecorator, setAddon } from '@storybook/react'
import { withBackgrounds } from '@storybook/addon-backgrounds'
import infoAddon, { setDefaults, withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withOptions } from '@storybook/addon-options'
import { withNotes } from '@storybook/addon-notes'
import { themes } from '@storybook/components'

const isTest = process.env.NODE_ENV === 'test'

const addAll = () => {
  addDecorator(withBackgrounds([
    { name: 'White', value: '#fff', default: true },
    { name: 'Black Magic', value: '#333' },
  ]))
  addDecorator(
    withOptions({
      theme: themes.dark,
    })
  )

  setDefaults({ header: false, inline: true })
  setAddon(infoAddon)

  addDecorator(withKnobs)
  addDecorator(withInfo)
  addDecorator(withNotes)
}

const addTest = () => {
  setAddon({
    addWithInfo(storyName, info, storyFn) {
      const detectedStory = typeof info === 'function' ? info : storyFn
      return this.add.call(this, storyName, detectedStory)
    },
  })
}

if (isTest) {
  addTest()
} else {
  addAll()
}

const contexts = [
  // {storiesContexts}
]

const loadStories = () => {
  contexts.forEach(context => {
    context.keys().forEach(module => context(module))
  })
}

configure(loadStories, module)
