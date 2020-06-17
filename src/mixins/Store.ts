import { ApolloProvider } from 'vue-apollo'
import { Store } from 'vuex'

export function mixin(
  store: Store<any>,
  apolloProvider?: ApolloProvider
): void {
  if (apolloProvider) {
    store.$apolloProvider = apolloProvider
    store.$apollo = apolloProvider.defaultClient
  }
}
