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
      if (str.length < 10) return str
      return `${str.substring(0, 6)}...${str.slice(-4)}`
    }
  }
}
</script>
