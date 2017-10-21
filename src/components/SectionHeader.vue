<template>
  <div class="section-header">
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {

  name: 'SectionHeader',

  props: ['title'],

  data () {
    return {
    }
  },
  mounted () {
    console.log(this.title)
  }
}
</script>

<style lang="css" scoped>
  .section-header {
  }

  .section-header h2 {
    color: #323232;
    font-size: 18pt;
    text-align: left;
    padding: 10px 12px;
    margin: 0px;
  }
</style>
