<template>
  <div id="app">
    <toolbar></toolbar>
    <router-view/>
    <footer-info></footer-info>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import FooterInfo from '@/components/FooterInfo'
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
    Toolbar,
    FooterInfo
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
  min-height: 100vh;
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
  flex-direction: column;
  margin: 80px 0px 0px;
  width: 100%;
}
/* Globals styles - TODO: split these out*/
.page-card {
  background: white;
  border-radius: 3px;
  box-shadow: 0 1px 10px -3px rgba(0,0,0,0.15);
  width: 60vw;
  min-width: 760px;
  margin: auto;
}
</style>
