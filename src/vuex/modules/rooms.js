import * as types from '../mutation-types'

const state = {
  main: []
}

const mutations = {
  [types.FETCH_ROOMS] (state, roomList) {
    state.main = roomList
  }
}

export default {
  state,
  mutations
}
