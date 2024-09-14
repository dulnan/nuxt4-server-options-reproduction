import {
  defineNuxtModule,
  createResolver,
  addTemplate,
  addServerHandler,
} from '@nuxt/kit'
import { relative } from 'pathe'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, nuxt) {
    // Resolves paths relative to the module.
    const resolver = createResolver(import.meta.url)

    const moduleTypesPath = relative(
      nuxt.options.buildDir,
      resolver.resolve('./types'),
    )

    const template = addTemplate({
      write: true,
      filename: 'example.serverOptions.ts',
      getContents: function () {
        return `
// Import the user's server options file.
import serverOptions from './../server/myModule.serverOptions'

// Import type from the module.
import type { ExampleModuleFunctionType } from '${moduleTypesPath}'

export const foobar: ExampleModuleFunctionType = () => {
  if (serverOptions.foobar) {
    return serverOptions.foobar()
  }
  return 'Default Value'
}`
      },
    })

    nuxt.options.alias['#my-module-server-options'] = template.dst
    nuxt.options.build.transpile.push(template.dst)

    // Add an example server handler.
    addServerHandler({
      handler: resolver.resolve('./runtime/server/test'),
      route: '/api/test',
    })
  },
})
