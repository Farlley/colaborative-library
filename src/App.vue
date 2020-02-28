<template>
  <div id="app">
    <Nav />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style lang="scss">
  .navbar {
    .btn {
      padding: 2px 2rem;
    }
    .btn-group-toggle {
      .btn {
        background: #f2f2f2;
        color: #666;
      }
    }
  }
  .btn {
    text-decoration: none;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    border: 0;
    cursor: pointer;
    text-transform: uppercase;
    white-space: normal;
    word-wrap: break-word;
    &.active {
      background-color: #1abc9c !important;
      color: white !important;
    }
    &:disabled {
      background: rgba(0, 0, 0, 0.05);
      box-shadow: none;
    }
    &:not(:disabled) {
      color: #fff;
    }
    &:disabled {
      color:rgba(0, 0, 0, 0.3)
    }
  }
</style>
