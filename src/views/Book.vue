<template>
  <div class="media pt-5 pb-5">
    <div class="image-wrap">
      <img :src="book.image" class="float-left mr-5"/>
    </div>

    <div class="media-body">
      <h3>{{ book.name }}</h3>
      <article class="mt-4" v-text="book.description" />
      <hr>
      <button class="btn float-right" @click="borrowBook" v-bind:disabled="book.loan" v-bind:class="{ 'btn-secondary': book.loan, 'btn-primary': !book.loan }">{{book.loan ? 'Emprestado' : 'Pedir emprestado'}}</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { FETCH_BOOK, RETURN_BOOK } from '../store/actions.type'

export default {
  name: 'Book',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch(FETCH_BOOK, to.params.id).then(response => {
      next()
    })
  },
  computed: {
    ...mapGetters(['book', 'currentUser'])
  },
  methods: {
    borrowBook () {
      const data = this.book
      data.loan = {
        userId: this.currentUser.id,
        date: new Date().toISOString().split('T')[0]
      }
      this.$store.dispatch(RETURN_BOOK, data)
    }
  }
}
</script>

<style>
  .media img {
    width: 250px;
    height: 360px;
    object-fit: cover;
  }

  article {
    color: #666
  }
</style>
