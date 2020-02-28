<template>
  <div class="pt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <ul v-if="errors.length > 0" class="alert alert-danger pb-0">
          <p v-for="(v, k) in errors" :key="k" class="error">{{ v }}</p>
        </ul>
        <form @submit.prevent="onSubmit"  class="auth">
          <legend>Novo Livro</legend>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="text"
              v-model="name"
              placeholder="Name"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="text"
              v-model="image"
              placeholder="Image (URL)"
            />
          </fieldset>
          <fieldset class="form-group">
            <textarea
              class="form-control form-control-lg"
              type="text"
              v-model="description"
              placeholder="Description"
            />
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            Salvar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { NEW_BOOK } from '@/store/actions.type'
export default {
  name: 'BookNew',
  data () {
    return {
      name: '',
      image: '',
      description: '',
      errors: []
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    onSubmit (e) {
      if (this.name && this.image && this.description) {
        this.$store
          .dispatch(NEW_BOOK, {
            name: this.name,
            image: this.image,
            description: this.description,
            userId: this.currentUser.id,
            loan: false
          })
          .then(() => this.$router.push({ name: 'MyBooks' }))
      } else {
        this.errors = []
        if (!this.name) {
          this.errors.push('O nome é obrigatório')
        }
        if (!this.image) {
          this.errors.push('A URL da imagem é obrigatória')
        }
        if (!this.description) {
          this.errors.push('A descrição é obrigatória')
        }
        e.preventDefault()
      }
    }
  }
}
</script>
