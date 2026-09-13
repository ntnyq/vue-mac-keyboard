import { x } from 'tinyexec'
import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  platform: 'browser',
  hooks: {
    // eslint-disable-next-line ntnyq/prefer-object-method-syntax -- object-shorthand requires longform for quoted hook names.
    'build:done': async () => {
      await x('npm', ['run', 'build:style'])
    },
  },
})
