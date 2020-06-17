import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexORM, { Model } from '@vuex-orm/core'
import VuexORMApollo from '@/index'

Vue.use(Vuex)
VuexORM.use(VuexORMApollo)

describe('unit/VuexORMApollo_Without_Apollo_Provider', () => {
  class User extends Model {
    static entity = 'users'
  }

  it('can install the plugin', () => {
    const store = new Store({
      plugins: [VuexORM.install()],
      strict: true
    })

    expect(store.$apolloProvider).toBe(undefined)
    expect(store.$apollo).toBe(undefined)

    const userRepo = store.$repo(User)

    expect(userRepo.apolloProvider).toBe(undefined)
    expect(userRepo.apollo).toBe(undefined)
  })
})
