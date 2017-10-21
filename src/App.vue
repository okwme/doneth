<template>
  <div id="app">
    <toolbar></toolbar>
    <router-view/>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import { mapActions } from 'vuex'
export default {
  name: 'app',
  actions: {
    ...mapActions([
      'checkAccount'
    ])
  },
  mounted () {
    this.checkAccount()
  },
  components: {
    Toolbar
  }
}
</script>

<style>
html {
  background: #ffffff;
}
body {
  background: #efefef;
  display: flex;
  height: 100vh;
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  margin-top: 60px;
}
</style>
