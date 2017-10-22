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
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .section-header {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding-top: 10px;
    margin: 0 20px;

    h2 {
      color: $darkgrey;
      font-size: 18pt;
      text-align: left;
      padding: 10px 0px;
      margin: 0px;
    }

    &.cl-white h2 {
      color: $white;
    }
  }
</style>
