<template>
  <div>
    <nav class="navbar navbar-light bg-light justify-content-between mb-4">
      <h4>Meus Livros</h4>
      <router-link
        class="btn btn-sm btn-primary pull-right"
        exact
        :to="{ name: 'BookNew' }"
      >Adicionar Livro</router-link>
    </nav>
    <hr>
    <BooksList :userId="currentUser.id" type="private"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BooksList from '@/components/BooksList'

export default {
  name: 'MyBooks',
  components: {
    BooksList
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>
