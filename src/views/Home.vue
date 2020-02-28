<template>
  <div>
    <nav class="navbar navbar-light bg-light justify-content-between mb-4">
      <h4>Livros</h4>

      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-sm btn-light" v-bind:class="{ 'active': loan === true }">
          <input type="radio" name="options" v-bind:value="true" v-model="loan" autocomplete="off"> Todos
        </label>
        <label class="btn btn-sm btn-light" v-bind:class="{ 'active': loan !== true }">
          <input type="radio" name="options" v-bind:value="false" v-model="loan" autocomplete="off"> Disponíveis para Empréstimo
        </label>
      </div>
    </nav>
    <div class="home-my-feed"><BooksList :loan="loan"/></div>
  </div>
</template>

<script>
import BooksList from '@/components/BooksList'
export default {
  name: 'Home',
  data () {
    return {
      loan: true
    }
  },
  components: {
    BooksList
  }
}
</script>
