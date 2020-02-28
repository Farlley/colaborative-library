import { BooksService } from '@/common/api.service'
import { FETCH_BOOKS } from './actions.type'
import {
  FETCH_START,
  FETCH_END
} from './mutations.type'

const state = {
  books: [],
  isLoading: true,
  booksCount: 0
}

const getters = {
  booksCount (state) {
    return state.booksCount
  },
  books (state) {
    return state.books
  },
  isLoading (state) {
    return state.isLoading
  }
}

const actions = {
  [FETCH_BOOKS] ({ commit }, params) {
    commit(FETCH_START)
    return BooksService.query(params.type, params.filters)
      .then(response => {
        commit(FETCH_END, response)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

const mutations = {
  [FETCH_START] (state) {
    state.isLoading = true
  },
  [FETCH_END] (state, response) {
    state.books = response.data
    state.booksCount = parseInt(response.headers['x-total-count'])
    state.isLoading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
