
import { BooksService } from '@/common/api.service'
import {
  RETURN_BOOK, FETCH_BOOK, NEW_BOOK
} from './actions.type'

import {
  SET_BOOK, SET_ERROR
} from './mutations.type'

export const mutations = {
  [SET_ERROR] (state, error) {
    state.errors = error
  },
  [SET_BOOK] (state, book) {
    state.book = book
  }
}

const initialState = {
  book: {
    id: '',
    name: '',
    image: '',
    userId: '',
    loan: {}
  }
}

export const state = { ...initialState }

export const actions = {
  [RETURN_BOOK] (context, book) {
    return new Promise((resolve, reject) => {
      BooksService.update(book.id, book)
        .then(response => {
          context.commit(SET_BOOK, response.data)
          resolve(response)
        })
        .catch(response => {
          context.commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  },
  async [FETCH_BOOK] (context, bookId) {
    // avoid extronuous network call if article exists
    const response = await BooksService.get(bookId)
    context.commit(SET_BOOK, response.data)
    return response
  },
  [NEW_BOOK] (context, book) {
    return BooksService.create(book)
  }
}

const getters = {
  book (state) {
    return state.book
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
