<template>
  <div>
    <nav class="navbar navbar-light bg-light justify-content-between mb-4">
      <h4>Meus Empréstimos</h4>
    </nav>
    <hr>
    <BooksList type="loan" :loan="true"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BooksList from '@/components/BooksList'

export default {
  name: 'MyLoans',
  components: {
    BooksList
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated'])
  }
}
</script>
