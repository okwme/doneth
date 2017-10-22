<template>
  <div class="allocation-bar">
    <div class="bar-graph">
      <div class="bar-item" v-for="member in members" :style="{ background: '#' + member.who.slice(-6), width: (parseInt(member.shares, 10) * 100) / 10 + '%' }"></div>
    </div>
    <div class="allocation-details">
      <div class="detail-item" v-for="member in members" :style="{ width: Math.round((parseInt(member.shares, 10) * 100) / parseInt(member.newTotal, 10)) + '%' }">{{Math.round((parseInt(member.shares, 10) * 100) / parseInt(member.newTotal, 10)) + '%'}}</div>
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
        shares: 98,
        who: '0xcDE232e835330daFA2Ebc629219BbF4fc92cfa24',
        newTotal: 258,
        blockNumber: 235234
      }, {
        shares: 67,
        who: '0x8Da2340c4E79009cE4FB5F5E242515fd0Ecb2a78',
        newTotal: 258,
        blockNumber: 235235
      }, {
        shares: 19,
        who: '0xdDE432e835330daFA2Ebc629219BbF4fc92cfa24',
        newTotal: 258,
        blockNumber: 235236
      }, {
        shares: 34,
        who: '0xf3243e835330daFA2Ebc629219BbF4fc92cfa24',
        newTotal: 258,
        blockNumber: 235237
      }, {
        shares: 40,
        who: '0xccccccccccccccccccccccccccccccccccccc',
        newTotal: 258,
        blockNumber: 235237
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .allocation-bar {
    display: flex;
    flex-direction: column;
    min-width: 760px;
    margin: 20px auto;
    width: 60vw;
  }

  .bar-graph {
    background: $lightgrey;
    border-radius: $border-radius $border-radius 0 0;
    display: flex;
    width: 100%;
    overflow: hidden;

    .bar-item {
      height: 40px;
      width: auto;
    }
  }

  .allocation-details {
    display: flex;
    background: $white;
    border-radius: 0 0 $border-radius $border-radius;
    display: flex;
    width: 100%;
    overflow: hidden;

    .detail-item {
      width: auto;
      font-size: 9pt;
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      word-wrap: break-word;
      padding: 5px 0;
    }
  }
</style>
