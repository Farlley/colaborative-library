import ApiService from '@/common/api.service'
import {
  LOGIN,
  LOGOUT,
  REGISTER
} from './actions.type'
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type'

const state = {
  errors: null,
  user: {},
  isAuthenticated: false
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  }
}

const actions = {
  [LOGIN] (context, credentials) {
    return new Promise(resolve => {
      ApiService.query('users', { params: { email: credentials.email, password: credentials.password } })
        .then(response => {
          if (response.data.length > 0) {
            context.commit(SET_AUTH, response.data[0])
            resolve(response)
          } else {
            context.commit(SET_ERROR, 'User not found')
          }
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    })
  },
  [LOGOUT] (context) {
    context.commit(PURGE_AUTH)
  },
  [REGISTER] (context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('users', credentials)
        .then(response => {
          context.commit(SET_AUTH, response.data)
          resolve(response.data)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  }
}

const mutations = {
  [SET_ERROR] (state, error) {
    state.errors = error
  },
  [SET_AUTH] (state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
  },
  [PURGE_AUTH] (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
