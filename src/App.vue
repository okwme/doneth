<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'account'
    ])
  },
  methods: {
    ...mapActions([
      'connect'
    ])
  },
  mounted () {
    this.connect()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
