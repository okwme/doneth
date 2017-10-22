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
      <section-header :title="'Donate & Help Us Out!'" class="cl-white"></section-header>
      <div class="cta-content">
        <div class="flex-2 cta-copy">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="flex-1 cta-action">
          <button type="button" name="button" class="btn btn-white btn-outlined">
            <b>Click this bro</b>
            <sub>0x0000...00000</sub>
            <!-- TODO: Split this into component  -->
          </button>
        </div>
      </div>
    </div>

  </div>
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

<style scoped>
  .container {
    width: 100%;
  }

  .cta-content {
    display: flex;
  }
  .cta-copy {}
  .cta-action {
    margin: auto;
  }
  .cta-action .btn {
    width: 80%;
  }
</style>
