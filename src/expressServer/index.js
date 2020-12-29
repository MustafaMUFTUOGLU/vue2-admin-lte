import axios from 'axios'

export default {
  getAllCategorys (request = {}) {
    return axios.get('http://localhost:4005/categorys', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getSubCategory (idTopCategory) {
    return axios.get('http://localhost:4005/categorys/' + idTopCategory)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getBaseStations (idTopCategory) {
    return axios.get('http://localhost:4005/basestation/' + idTopCategory)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getPersonels (request = {}) {
    return axios.get('http://localhost:4005/personel', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getMap (idTopCategory) {
    return axios.get('http://localhost:4005/maps/' + idTopCategory)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getMapBound (idTopCategory, idSubCategory) {
    return axios.get('http://localhost:4005/maps/' + idTopCategory + '/mapbound/' + idSubCategory)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  setMapBound (idTopCategory, idSubCategory, polygon) {
    console.log('setMapBound', idTopCategory, idSubCategory)
    return axios.post('http://localhost:4005/maps/' + idTopCategory.toString() + '/mapbound/' + idSubCategory,
      { polygon: polygon },
      { headers: {
        'Content-Type': 'application/json'
      }
      })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error))
  },
  tagListGet (request = {}) {
    return axios.get('http://192.168.4.1', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  tagHisyoryGet (request = {}) {
    return axios.get('http://localhost:3000/taghistory', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  addTagHistory (data = {}) {
    return axios.post('http://localhost:3000/taghistory', {
      'tagName': data.tagName,
      'gateway': data.gateway,
      'state': data.state,
      'saat': new Date().toLocaleString()
    })
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}
