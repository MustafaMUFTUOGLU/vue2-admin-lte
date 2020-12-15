import axios from 'axios'

export default {
  getBaseStations (ustkategoriadi) {
    return axios.get('http://localhost:4005/basestation/' + ustkategoriadi)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getPersonels (request = {}) {
    return axios.get('http://localhost:4005/personel', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getHarita (ustkategoriadi) {
    return axios.get('http://localhost:4005/map/' + ustkategoriadi)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getBound (ustkategoriadi, altkategoriadi) {
    return axios.get('http://localhost:4005/map/' + ustkategoriadi + '/' + altkategoriadi)
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
