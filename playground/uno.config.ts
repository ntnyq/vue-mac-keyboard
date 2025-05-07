/**
 * @file UnoCSS config
 */

import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetWind3(),
    presetIcons({
      autoInstall: true,
      scale: 1.2,
      extraProperties: {
        color: 'inherit',
        // Avoid crushing of icons in crowded situations
        'min-width': '1.2em',
      },
    }),
  ],

  shortcuts: {
    'bg-base': 'bg-$c-bg-base',
    'border-base': 'border-$c-border',
    'border-bg-base': 'border-$c-bg-base',
    'text-base': 'text-$c-text-base',
    'btn-action':
      'min-w-[140px] rounded-md bg-$c-text-base px-3 py-2 text-$c-bg-base transition hover:opacity-90',
    'btn-icon':
      'h-10 w-10 inline-flex items-center justify-center text-lg rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700',
  },
})
