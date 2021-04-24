<template>
  <div class="goalbar">
    <div class="bar" :style="{ width: percentage() + '%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'GoalBar',
  props: ['total', 'current'],
  data () {
    return {
    }
  },
  methods: {
    percentage () {
      return Math.round((this.current / this.total) * 100)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .goalbar {
    background: $lightgrey;
    border-radius: $border-radius;
    display: flex;
    height: 20px;
    margin: 10px;

    .bar {
      background: $black;
      border-radius: $border-radius;
      height: 20px;
      width: auto;
      transition: all 220ms ease;
    }
  }
</style>
