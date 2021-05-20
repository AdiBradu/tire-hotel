import axios from 'axios'
import { BASE_API_URL } from './Config'

export const axiosLib = axios

const api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true
})


api.interceptors.response.use(
  response => response,
  error => {
    //redirect to index on access denied status codes
    if (error.response.status === 401) {
      window.location.href="/"
      return Promise.reject(error)
    }
    // specific error handling done elsewhere
    return Promise.reject(error)
  }
)



export default api