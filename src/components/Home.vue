<template>
  <div class="container">
    <div class="page-card">
      <section-header :title="'Welcome!'"></section-header>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <hr class="wd-50">
      <intro-steps/>
    </div>

    <div class="page-card bk-green">
      <donate-cta/>
    </div>

  </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader'
import IntroSteps from '@/components/IntroSteps'
import DonateCta from '@/components/DonateCta'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    SectionHeader,
    IntroSteps,
    DonateCta
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';
  .container {
    width: 100%;
  }
</style>
