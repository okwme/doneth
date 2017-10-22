<template>
  <section>
    <div class="page-card">
      <section-header :title="'Welcome!'"></section-header>
      <p>Don.eth is a platform to help you create shared funds that are easily self-manageable. This allows for the unique governance directly controlled by the user.<br><br>Use Don.eth to fund your side project, distribute funds to those helping development, and many more options!</p>
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

section {
  margin-top: 20px;
}
</style>
