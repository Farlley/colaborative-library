import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '@/common/config'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  query (resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`ApiService ${error}`)
    })
  },

  get (resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`ApiService ${error}`)
    })
  },

  post (resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },

  update (resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params)
  },

  put (resource, params) {
    return Vue.axios.put(`${resource}`, params)
  },

  delete (resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`ApiService ${error}`)
    })
  }
}

export default ApiService

export const BooksService = {
  query (type, params) {
    return ApiService.query('books', {
      params: params
    })
  },
  get (slug) {
    return ApiService.get('books', slug)
  },
  create (data) {
    return ApiService.post('books', data)
  },
  update (id, data) {
    return ApiService.update('books', id, data)
  },
  destroy (slug) {
    return ApiService.delete(`books/${slug}`)
  }
}
