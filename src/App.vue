<template>
  <div id="app">
    <toolbar/>
    <router-view/>
    <footer-info/>
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
p {
  margin: 0px;
  padding: 20px;
  text-align: left;
}

hr {
  border: 0px;
  border-top: 1px solid rgba(0,0,0,0.1);
  display: inline-block;
  margin: 5px;
}

.btn {
  background: transparent;
  border: 2px solid transparent;
  color: #548c4c;
  cursor: pointer;
  padding: 7px 12px;
}
.btn.btn-white{
  background: white;
}
.btn.btn-white.btn-outlined{
  background: transparent;
  border: 2px solid white;
  border-radius: 3px;
  color: white;
}
.btn b {
  display: block;
  font-size: 13pt;
}
.btn sub {}

.page-card {
  background: white;
  border-radius: 3px;
  box-shadow: 0 1px 10px -3px rgba(0,0,0,0.15);
  width: 60vw;
  min-width: 760px;
  margin: 0px auto 30px;
}

.bk-green {
  background: #548c4c;
  color: white;
}

.wd-50 {
  width: 50%;
}
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
</style>
