import { x } from 'tinyexec'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  declaration: 'node16',
  entries: ['src/index.ts'],
  hooks: {
    'rollup:build': async () => {
      await x('npm', ['run', 'build:style'])
    },
  },
})
