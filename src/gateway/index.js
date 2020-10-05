import axios from 'axios'

export default {
  tagListGet (request = {}) {
    return axios.get('http://localhost:3000/taglist', request)
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
