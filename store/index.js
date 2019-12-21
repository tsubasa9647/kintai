import Vuex from 'vuex'
import Database from '~/modules/database'
import defaultConfig from '~/modules/defaultConfig'

const CONFIG_KEY = 'config'

export default function () {
  return new Vuex.Store({
    plugins: [
      (store) => {
        store.subscribe((mutation, state) => {
          window.localStorage.setItem(CONFIG_KEY, JSON.stringify(state.config))
        })
      }
    ],
    state: () => ({
      db: null,
      config: loadConfig() || defaultConfig
    }),
    mutations: {
      setDb (state, db) {
        state.db = db
      },
      setConfig (state, config) {
        state.config = config
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
      },
      updateConfig ({ commit }, config) {
        commit('setConfig', config)
      }
    }
  })
}

function loadConfig () {
  const value = window.localStorage.getItem(CONFIG_KEY)
  return value ? JSON.parse(value) : undefined
}
