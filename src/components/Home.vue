<template>
  <section>
    <div class="page-card">
      <section-header :title="'Welcome!'"></section-header>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <hr class="wd-50">
      <intro-steps/>
      <div class="page-card-footer">
        <router-link class="pointer btn btn-primary" :to="{name: 'Deploy'}" tag="button">Get Started!</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader'
import IntroSteps from '@/components/IntroSteps'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    SectionHeader,
    IntroSteps
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';
</style>
