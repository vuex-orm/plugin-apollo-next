import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'vue-apollo'

declare module 'vuex/types/index' {
  interface Store<S> {
    /**
     * The apollo provider instance.
     */
    $apolloProvider: ApolloProvider

    /**
     * The apollo client instance.
     */
    $apollo: ApolloClient<any>
  }
}
