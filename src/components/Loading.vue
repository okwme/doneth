<template>
  <div class="loading-container" :class="{ active: loading }">
    <span class="loader">
      <img alt="loading" src="/static/loading.svg">
    </span>
    <h3 v-if="title">{{title}}</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  name: 'Loading',

  data () {
    return {
      title: null
    }
  },
  computed: {
    ...mapGetters(['loading'])
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .loading-container {
    background: rgba(0,0,0,0.6);
    display: flex;
    height: 0;
    top: 0;
    position: fixed;
    width: 100vw;
    z-index: 9;
    opacity: 0;
    overflow: hidden;
    transition: opacity 220ms ease 20ms;

    &.active {
      height: 100vh;
      opacity: 1;
    }

    .loader {
      margin: auto;
    }

    img {
      width: 48px;
    }
  }
</style>
