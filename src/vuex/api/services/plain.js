import axios from 'axios'

export default {
  getAll (plain, request = {}) {
    return axios.get('http://localhost:3000/plainList?Bolge=' + plain, request)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }
}
