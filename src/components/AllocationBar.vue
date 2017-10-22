<template>
  <div class="allocation-bar">
    <div class="bar-graph">
      <div class="bar-item" :class="{ active: (member.active === true) }" v-for="member in patrons" :style="{ background: colorHex(member), width: percentage(member) + '%' }"></div>
    </div>
    <div class="allocation-details">
      <div class="detail-item" v-for="member in patrons" :style="{ width: percentage(member) + '%' }">{{Math.round(percentage(member)) + '%'}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  name: 'AllocationBar',

  props: ['patrons'],

  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['totalShares'])
  },
  methods: {
    colorHex (member) {
      return (member && member.address) ? `#${member.address.slice(-6)}` : '#CCCCCC'
    },
    percentage (member) {
      let num = parseInt(this.totalShares, 10)
      if (num === 0) {
        this.patrons.map((p) => {
          if (p && p.shares && !isNaN(parseInt(p.shares, 10))) {
            num += parseInt(p.shares, 10)
          }
        })
      }
      return ((parseInt(member.shares, 10) * 100) / num).toFixed(2)
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
      box-shadow: 0 0 0 rgba(0,0,0,0);
      height: 40px;
      width: auto;
      transition: all 220ms ease;

      &.active {
        box-shadow: inset 0 1px 20px -2px rgba(0,0,0,0.3);
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
