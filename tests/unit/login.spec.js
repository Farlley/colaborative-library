import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Login from '@/views/Login'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

const factory = (values = {}) => {
  return shallowMount(Login, {
    data () {
      return {
        ...values
      }
    },
    localVue,
    router
  })
}

describe('Login.vue', () => {
  it('renders a form', () => {
    const wrapper = factory()
    expect(wrapper.find('form').exists()).toBeTruthy()
  })
  it('renders an email input', () => {
    const wrapper = factory()
    expect(wrapper.find('input[name="email"]').exists()).toBeTruthy()
  })
  it('renders a password input', () => {
    const wrapper = factory()
    expect(wrapper.find('input[name="password"]').exists()).toBeTruthy()
  })
  it('renders a button submit', () => {
    const wrapper = factory()
    expect(wrapper.find('button').exists()).toBeTruthy()
  })
  it('calls event on form submit', () => {
    const wrapper = factory()
    wrapper.setMethods({ onSubmit: jest.fn() })
    wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.onSubmit).toBeCalled()
  })
  it('register an error when email is empty', async () => {
    const wrapper = factory({ password: '123' })
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.errors).toContain('O email é obrigatório')
  })
  it('renders an error message when email is empty', async () => {
    const wrapper = factory({ password: '123' })
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.error').text()).toBe('O email é obrigatório')
  })
  it('register an error when password is empty', async () => {
    const wrapper = factory({ email: 'test@email.com' })
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.errors).toContain('A senha é obrigatória')
  })
  it('renders an error message when password is empty', async () => {
    const wrapper = factory({ email: 'test@email.com' })
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.error').text()).toBe('A senha é obrigatória')
  })
})
