<template>
  <i :title="hash">{{shorten(hash)}}</i>
</template>

<script>
export default {

  name: 'ShortHash',

  props: ['hash'],

  data () {
    return {
    }
  },
  methods: {
    shorten (str) {
      if (!str) return
      if (str.length < 10) return str
      return `${str.substring(0, 6)}...${str.slice(-4)}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  i {
    font-size: 9pt;
    line-height: 9pt;
    font-style: normal;
  }
</style>
