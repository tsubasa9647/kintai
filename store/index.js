import Vuex from 'vuex'
import defaultConfig from '~/modules/defaultConfig'
import Database from '~/modules/database'
import { TimeRepository } from '~/interface/database/'

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
      config: loadConfig() || defaultConfig,
      repository: {}
    }),
    mutations: {
      setConfig (state, config) {
        state.config = config
      },
      setRepository (state, repository) {
        state.repository = repository
      }
    },
    actions: {
      async nuxtClientInit ({ dispatch }) {
        await dispatch('initializeRepository')
      },
      async initializeRepository ({ commit }) {
        const db = new Database(indexedDB)
        await db.initialize()
        const time = new TimeRepository(db)
        const repository = {
          time
        }
        commit('setRepository', repository)
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
