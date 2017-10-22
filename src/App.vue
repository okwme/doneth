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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'account',
      'conversions'
    ])
  },
  methods: {
    ...mapActions([
      'connect',
      'getConversions'
    ])
  },
  mounted () {
    this.connect()
    this.getConversions()
  },
  components: {
    Toolbar,
    FooterInfo
  }
}
</script>

<style lang="scss">
@import '/scss/variables';
@import '/scss/main.scss';
@import '/scss/buttons';
html {
  background: $white;
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
  color: $darkgrey;
  display: flex;
  flex-direction: column;
  margin: 80px 0px 0px;
  width: 100%;
}
</style>
