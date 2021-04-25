<template>
  <div class="intro-steps">
    <div v-bind:key="item.index"  v-for="item in items" class="intro-item">
      <div class="large-number">{{item.index}}</div>
      <h3>{{item.title}}</h3>
      <div class="item-copy">
        {{item.copy}}
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'IntroSteps',

  data () {
    return {
      items: [{
        index: 1,
        title: 'Create',
        copy: 'Easily start a smart contract'
      }, {
        index: 2,
        title: 'Allocate',
        copy: 'Add shares and funds for your members'
      }, {
        index: 3,
        title: 'Manage',
        copy: 'All members can manage their shares and funds'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';
  .intro-steps {
    display: flex;
  }

  .intro-item {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    padding: 30px;
    position: relative;
    text-align: left;
    // width: 30%;
  }

  .large-number {
    color: $primary;
    font-size: 32pt;
    position: absolute;
    left: -7px;
    top: 40px;
  }
</style>
