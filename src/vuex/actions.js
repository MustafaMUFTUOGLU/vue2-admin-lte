import * as types from './mutation-types'
import { services } from './api'

export const fetchProduct = ({ commit }) => {
  // API request
  return services.products.getAll()
  .then((response) => {
    console.log(response)
    commit(types.FETCH_PRODUCT, response.data)
  })
  .catch((error) => {
    console.error(error)
  })
}

export const fetchBolgeler = ({ commit }) => {
  // API request
  return services.bolgeler.getAll()
  .then((response) => {
    console.log(response)
    commit(types.FETCH_BOLGELER, response.data)
  })
  .catch((error) => {
    console.error(error)
  })
}

export const fetchPlane = ({ commit, state }, bolge) => {
  return services.plain.getAll(bolge)
  .then((response) => {
    console.log(response)
    // debugger
    // commit(types.FETCH_ROOMS, response.data)
  })
  .catch((error) => {
    console.error(error)
  })
}
