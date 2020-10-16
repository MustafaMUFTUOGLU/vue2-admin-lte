import * as types from '../mutation-types'

const state = {
  main: []
}

const mutations = {
  [types.FETCH_BOLGELER] (state, bolgelerList) {
    state.main = bolgelerList
  }
}

export default {
  state,
  mutations
}
