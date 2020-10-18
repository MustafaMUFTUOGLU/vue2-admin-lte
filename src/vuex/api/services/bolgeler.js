import axios from 'axios'

export default {
  getAll (request = {}) {
    return axios.get('http://localhost:4005/bolgeler', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}
