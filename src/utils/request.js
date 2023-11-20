import axios from 'axios'
import store from 'store'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})

service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.tokenstore.getters.token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

service.interceptors.response.use((response) => {
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, (error) => {
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
