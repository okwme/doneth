<template>
  <div class="intro-steps">
    <div v-for="item in items" class="intro-item">
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
        copy: 'fjkdslajfkldsajkfldsa fjdksla fjdklsa jf'
      }, {
        index: 2,
        title: 'Allocate',
        copy: 'fjkdslajfkldsajkfldsa fjdksla fjdklsa jf'
      }, {
        index: 3,
        title: 'Share',
        copy: 'fjkdslajfkldsajkfldsa fjdksla fjdklsa jf'
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
  }

  .large-number {
    color: $primary;
    font-size: 32pt;
    position: absolute;
    left: -7px;
    top: 40px;
  }
</style>
