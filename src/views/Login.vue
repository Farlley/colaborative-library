<template>
  <div class="auth-page pt-5">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <ul v-if="errors.length > 0" class="alert alert-danger pb-0">
            <p v-for="(v, k) in errors" :key="k" class="error">{{ v }}</p>
          </ul>
          <form @submit.prevent="onSubmit" class="auth">
            <legend>Login</legend>
            <fieldset class="form-group">
              <input
                name="email"
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                name="password"
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Senha"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN } from '@/store/actions.type'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      errors: []
    }
  },
  methods: {
    onSubmit (e) {
      if (this.email && this.password) {
        this.errors = []
        const data = {
          email: this.email,
          password: this.password
        }
        this.$store
          .dispatch(LOGIN, data)
          .then(() => this.$router.push({ name: 'Home' }))
      } else {
        this.errors = []
        if (!this.email) {
          this.errors.push('O email é obrigatório')
        }
        if (!this.password) {
          this.errors.push('A senha é obrigatória')
        }
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss">

.auth {

  display: flex;
  flex-flow: column nowrap;
  border-radius: 10px;
  background: #fff;
  padding: 30px;
  width: 100%;
  position: relative;
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
  margin: 0 auto;

  legend {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-block;
    margin: 40px 8px 10px;
    color: #cccccc;
    margin: 1rem 0 2rem;
  }

  button {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    border-radius: 5px;
    margin: 5px 20px 40px;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #39ace7;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  input, textarea {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    border: 2px solid #f6f6f6;
    transition: all 0.5s ease-in-out;
    border-radius: 5px;
    margin: 0 auto;
    width: 90%;
    box-shadow: none;

    &:focus, &:active {
      background-color: #fff;
      border-color: transparent;
      border-bottom: 2px solid #5fbae9;
      box-shadow: none;
      outline: none;
    }
  }
}

</style>
