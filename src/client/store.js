const Vue = require('vue')
const Vuex = require('vuex')
const uid = require('uid')

Vue.use(Vuex)

const state = {
  version: '',
  monitors: null,
  output: [],
  outputId: ''
}

const mutations = {
  SET_VERSION (state, version) {
    state.version = version
  },
  SET_MONITORS (state, monitors) {
    state.monitors = monitors
  },
  PUSH_OUTPUT (state, line) {
    state.output.push({ line, _uid: uid() })
    if (state.output.length > 1000) {
      state.output.shift()
    }
  },
  WATCH_OUTPUT (state, id) {
    state.output = []
    state.outputId = id
  },
  UNWATCH_OUTPUT (state, id) {
    state.output = []
    state.outputId = ''
  }
}

module.exports = new Vuex.Store({
  state,
  mutations,
  middlewares: [require('vuex/logger')()]
})
