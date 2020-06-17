import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'vue-apollo'
import { Model } from '@vuex-orm/core'

declare module '@vuex-orm/core/dist/src/repository/Repository' {
  interface Repository<M extends Model = Model> {
    /**
     * The apollo provider instance.
     */
    apolloProvider: ApolloProvider

    /**
     * The apollo client instance.
     */
    apollo: ApolloClient<any>
  }
}
