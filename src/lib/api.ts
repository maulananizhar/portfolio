import axios from 'axios'

const api = axios.create()

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      const url = err.config?.url || ''
      if (url.includes('/api/github') || url.includes('/api/gitlab')) {
        window.location.href = '/service-error'
      }
    }
    return Promise.reject(err)
  }
)

export default api
