<template>
  <div class="auth-page pt-5">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <ul v-if="errors.length > 0" class="alert alert-danger pb-0">
            <p v-for="(v, k) in errors" :key="k">{{ v }}</p>
          </ul>
          <form @submit.prevent="onSubmit" class="auth">
            <legend>Criar Conta</legend>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="name"
                placeholder="Nome"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Senha"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { REGISTER } from '@/store/actions.type'
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    onSubmit (e) {
      if (this.email && this.password && this.name) {
        const data = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        this.$store
          .dispatch(REGISTER, data)
          .then(() => this.$router.push({ name: 'Home' }))
      } else {
        this.errors = []
        if (!this.email) {
          this.errors.push('O email é obrigatório')
        }
        if (!this.password) {
          this.errors.push('A senha é obrigatória')
        }
        if (!this.name) {
          this.errors.push('O nome é obrigatório')
        }
        e.preventDefault()
      }
    }
  }
}
</script>
