import fetch from 'unfetch'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'vue-apollo'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexORM, { Model } from '@vuex-orm/core'
import VuexORMApollo from '@/index'

const link = createHttpLink({ uri: '/graphql', fetch })

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({ link, cache })

const apolloProvider = new ApolloProvider({
  defaultClient: apolloClient
})

Vue.use(Vuex)
VuexORM.use(VuexORMApollo, { apolloProvider })

describe('unit/VuexORMApollo', () => {
  class User extends Model {
    static entity = 'users'
  }

  it('can install the plugin', () => {
    const store = new Store({
      plugins: [VuexORM.install()],
      strict: true
    })

    expect(store.$apolloProvider).toBe(apolloProvider)
    expect(store.$apollo).toBe(apolloClient)

    const userRepo = store.$repo(User)

    expect(userRepo.apolloProvider).toBe(apolloProvider)
    expect(userRepo.apollo).toBe(apolloClient)
  })
})
