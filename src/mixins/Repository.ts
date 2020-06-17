import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'vue-apollo'
import { Repository } from '@vuex-orm/core'

export function mixin(repository: typeof Repository): void {
  if (!repository.prototype.hasOwnProperty('apolloProvider')) {
    Object.defineProperty(repository.prototype, 'apolloProvider', {
      get(): ApolloProvider {
        return this.store.$apolloProvider
      }
    })
  }

  if (!repository.prototype.hasOwnProperty('apollo')) {
    Object.defineProperty(repository.prototype, 'apollo', {
      get(): ApolloClient<any> {
        return this.store.$apollo
      }
    })
  }
}
