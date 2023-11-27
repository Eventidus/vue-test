import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
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
}, async(error) => {
  if (error.response.status === 401) {
    Message.warning('登录信息过期，请重新登录!')
    await store.dispatch('/user/logout')
    router.push('/login')
    return Promise.reject(error)
  }
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
