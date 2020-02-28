<template>
  <div v-if="isLoading" class="book-preview">Loading books...</div>
  <div v-else>
    <div v-if="books.length === 0"  class="alert alert-primary" role="alert">
      Nenhum Livro
    </div>
    <div class="row">
      <div class="col-sm-3" :key="book.id + index" v-for="(book, index) in books">
        <div v-if="type=='private'" class="card-content">
          <div class="card-img">
            <img :src="book.image"/>
            <span v-if="book.loan"><h4>Emprestado</h4></span>
          </div>
          <div class="card-desc">
            <h3 v-text="book.name" />
          </div>
        </div>
        <div v-else-if="type=='loan'" class="card-content">
          <div class="card-img">
            <img :src="book.image"/>
          </div>
          <div class="card-desc" v-bind:title="book.name">
            <h3 v-text="book.name" />
            <button class="btn-card btn-block" @click="returnBook(book)">Devolver</button>
          </div>
        </div>
        <div v-else class="card-content">
          <router-link :to="{ name: 'Book', params: { id: book.id }}" class="card-img">
            <img :src="book.image"/>
          </router-link>
          <div class="card-desc">
            <router-link :to="{ name: 'Book', params: { id: book.id }}">
              <h3 class="card-title" v-text="book.name" />
            </router-link>
            <button class="btn-card btn-block" @click="borrowBook(book)" v-bind:disabled="book.loan" v-bind:class="{ 'btn-secondary': book.loan, 'btn-primary': !book.loan }">{{book.loan ? 'Emprestado' : 'Pedir emprestado'}}</button>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <Pagination :pages="pages" :currentPage.sync="currentPage" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from './Pagination'
import { FETCH_BOOKS, RETURN_BOOK } from '../store/actions.type'

export default {
  name: 'BooksList',
  components: {
    Pagination
  },
  props: {
    type: {
      type: String,
      required: false,
      default: 'public'
    },
    loan: {
      type: Boolean,
      required: false
    },
    favorited: {
      type: String,
      required: false
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 4
    },
    userId: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    listConfig () {
      const { type } = this
      const filters = {
        _page: this.currentPage,
        _limit: this.itemsPerPage
      }
      if (this.type === 'loan') {
        filters['loan.userId'] = this.currentUser.id
      }
      if (this.userId) {
        filters.userId = this.userId
      }
      if (this.loan === false) {
        filters.loan = false
      }
      return {
        type,
        filters
      }
    },
    pages () {
      if (this.isLoading || this.booksCount <= this.itemsPerPage) {
        return []
      }
      return [
        ...Array(Math.ceil(this.booksCount / this.itemsPerPage)).keys()
      ].map(e => e + 1)
    },
    ...mapGetters(['booksCount', 'isLoading', 'books', 'currentUser'])
  },
  watch: {
    currentPage (newValue) {
      this._page = newValue
      this.fetchBooks()
    },
    type () {
      this.resetPagination()
      this.fetchBooks()
    },
    loan () {
      this.resetPagination()
      this.fetchBooks()
    },
    userId () {
      this.resetPagination()
      this.fetchBooks()
    }
  },
  mounted () {
    this.fetchBooks()
  },
  methods: {
    fetchBooks () {
      this.$store.dispatch(FETCH_BOOKS, this.listConfig)
    },
    resetPagination () {
      this.listConfig._page = 0
      this.currentPage = 1
    },
    returnBook (book) {
      book.loan = false
      this.$store.dispatch(RETURN_BOOK, book).then(() => this.books.pop(book))
    },
    borrowBook (book) {
      const data = book
      data.loan = {
        userId: this.currentUser.id,
        date: new Date().toISOString().split('T')[0]
      }
      this.$store.dispatch(RETURN_BOOK, data)
    }
  }
}
</script>

<style lang="scss" scoped>

.card-content {
  background: #ffffff;
  height: 100%;
  border: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  flex-flow: column;
}

.card-img {
  position: relative;
  overflow: hidden;
  border-radius: 0;
  z-index: 1;
  display: flex;
  flex-flow: column nowrap;

  img {
    width: 100%;
    height: auto;
    display: block;
    height: 360px;
    object-fit: cover;
  }

  span {
    position: absolute;
    z-index: 1;
    text-transform: uppercase;
    top: 15%;
    left: -4px;
    background: white;
    border: 1px solid white;
    padding: 6px 15px;
    color: black;
    text-align: center;
    font-size: 12px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.5);

    h4 {
      font-size: 12px;
      margin: 0;
      padding: 10px 5px;
      line-height: 0;
    }
  }
}

.card-desc {
  padding: 1.25rem;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  justify-content: space-between;

  h3 {
    color: #000000;
    font-weight: 600;
    font-size: 1.1em;
    line-height: 1.3em;
    margin-top: 0;
    margin-bottom: 5px;
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  p {
    color: #747373;
    font-size: 14px;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5;
    margin: 0px;
    margin-bottom: 20px;
    padding: 0;
    font-family: "Raleway", sans-serif;
  }
}

.btn-card {
  text-decoration: none;
  background-color: #1abc9c;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 0.84rem 2.14rem;
  font-size: 0.81rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  margin: 2em 0 0 0;
  border: 0;
  -webkit-border-radius: 0.125rem;
  border-radius: 0.125rem;
  cursor: pointer;
  text-transform: uppercase;
  white-space: normal;
  word-wrap: break-word;
  &:disabled {
    background: rgba(0, 0, 0, 0.05);
    box-shadow: none;
  }
  &:not(:disabled) {
    color: #fff;
    &:hover {
      background: orange;
    }
  }
  &:disabled {
    color:rgba(0, 0, 0, 0.3)
  }
}
</style>
