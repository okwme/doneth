<template>
  <div>
    &copy; Copyright {{year}}
  </div>
</template>

<script>
export default {

  name: 'FooterInfo',

  data () {
    return {
      year: (new Date()).getFullYear()
    }
  }
}
</script>

<style lang="css" scoped>
  div {
    font-size: 11pt;
    margin: 40px 0px;
  }
</style>
