<template>
  <div>
    &copy; Copyright Don.eth {{year}}
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

<style lang="scss" scoped>
  div {
    font-size: 11pt;
    margin: 40px 0px;
  }
</style>
