import { ApolloProvider } from 'vue-apollo'
import { VuexORMPlugin } from '@vuex-orm/core'
import { mixin as storeMixin } from './mixins/Store'
import { mixin as repositoryMixin } from './mixins/Repository'

export interface Options {
  apolloProvider?: ApolloProvider
}

export const VuexORMApollo: VuexORMPlugin = {
  install(store, components, options: Options = {}) {
    storeMixin(store, options.apolloProvider)
    repositoryMixin(components.Repository)
  }
}
