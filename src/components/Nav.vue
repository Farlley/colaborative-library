<template>
  <nav class="navbar navbar-dark bg-dark mb-3">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">
        Estante Virtual
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'Login' }"
          >
            <i class="ion-compose"></i>Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'Register' }"
          >
            <i class="ion-compose"></i>Criar Conta
          </router-link>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'Home' }"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'MyBooks' }"
          >
            <i class="ion-compose"></i>&nbsp;Meus Livros
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'MyLoans' }"
          >
            <i class="ion-gear-a"></i>&nbsp;Meus Empréstimos
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logout">
            <i class="ion-compose"></i>Sair
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOGOUT } from '@/store/actions.type'

export default {
  name: 'Nav',
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated'])
  },
  methods: {
    logout () {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  }
}
</script>

<style>
  .navbar-nav {
    display: flex;
    flex-flow: row nowrap !important;
  }
  .navbar-nav .nav-link {
    margin: 0 15px;
  }
</style>
