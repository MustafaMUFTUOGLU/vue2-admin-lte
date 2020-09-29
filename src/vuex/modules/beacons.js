const state = {
  beaconsList: [1, 2, 3]
}

const getters = {
  getBeaconsList: state => {
    return state.beaconsList
  }
}

const mutations = {
  changeBeaconsList: (state, value) => {
    state.beaconsList = value
  }
}

const actions = {
  triggerChangeBeaconsList: (context, value) => {
    context.commit('changeBeaconsList', value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
