<template>
  <div class="allocation-bar">
    <div class="bar-graph">
      <div class="bar-item" :class="{ active: (member.active) }" v-for="member in patrons" :style="{ background: colorHex(member), width: percentage(member) }"></div>
    </div>
    <div class="allocation-details">
      <div class="detail-item" v-for="member in patrons" :style="{ width: percentage(member) }">{{percentage(member)}}</div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'AllocationBar',

  props: ['patrons'],

  data () {
    return {
      members: []
    }
  },
  mounted () {
    // this.members = this.patrons.map((u) => {
    //   return u.returnValues
    // })
    // console.log('this.patrons', this.patrons, this.members)
  },
  methods: {
    colorHex (member) {
      return (member && member.who) ? `#${member.address.slice(-6)}` : '#CCCCCC'
    },
    percentage (member) {
      return Math.round((parseInt(member.shares, 10) * 100) / 234) + '%' // parseInt(member.shares, 10)
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
      box-shadow:inset 0 0 0 rgba(0,0,0,0);
      height: 40px;
      width: auto;
      transition: all 220ms ease;

      &.active {
        box-shadow:inset 0 1px 20px -2px rgba(0,0,0,0.3);
      }
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
