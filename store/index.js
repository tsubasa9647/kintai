import Vuex from 'vuex'
import Database from '~/modules/database'

export default function () {
  return new Vuex.Store({
    state: () => ({
      db: null
    }),
    mutations: {
      setDb (state, db) {
        state.db = db
      }
    },
    actions: {
      async nuxtClientInit ({ dispatch }) {
        await dispatch('initializeDB')
      },
      async initializeDB ({ commit }) {
        const db = new Database(indexedDB)
        await db.initialize()
        commit('setDb', db)
      }
    }
  })
}
