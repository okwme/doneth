<template>
  <div class="allocation-bar">
    TODO: AllocationBar!
    <div class="bar-graph">
      <div class="bar-item" v-for="member in members" :style="{ background: '#' + member.address.substring(2, 8) }"></div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'AllocationBar',

  props: ['allocations'],

  data () {
    return {
      members: [{
        address: '0xcDE232e835330daFA2Ebc629219BbF4fc92cfa24'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .allocation-bar {
  }
</style>
