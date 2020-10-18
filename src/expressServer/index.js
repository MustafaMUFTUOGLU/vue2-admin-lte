import axios from 'axios'

export default {
  getPersonels (request = {}) {
    return axios.get('http://localhost:4005/personel', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getHarita (ustkategoriid) {
    console.log(ustkategoriid)
    return axios.get('http://localhost:4005/harita/' + ustkategoriid)
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
