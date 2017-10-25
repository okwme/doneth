<template>
  <div class="page-card callout-cta" :class="{ active: showAlert }">
    <section-header :title="'Uh Oh! Looks like you need MetaMask!'"></section-header>
    <div class="cta-content">
      <div class="flex-1 cta-copy">
        <p>You will need MetaMask to use Doneth!<br>MetaMask is a bridge that allows you to visit the distributed web of tomorrow in your browser today.</p>
      </div>
      <div class="flex-1 cta-action">
        <a :href="url" target="_blank" class="btn btn-white btn-outlined">
          <img width="250px" src="static/metamask.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader'
import ShortHash from '@/components/ShortHash'
export default {

  name: 'MetaMaskCallout',

  data () {
    return {
      showAlert: false,
      url: 'https://metamask.io/'
    }
  },
  components: {
    SectionHeader,
    ShortHash
  },
  mounted () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // REF: https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md
    // NOTE: Yes, i copy/pasta that.
    if (typeof web3 !== 'undefined') {
      // Carry on :)
    } else {
      console.log('No web3? You should consider trying MetaMask!')
      // Show SUPER ANNOYING ALERT!!
      this.showAlert = true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .callout-cta {
    background: #ffffbd;
    display: none;

    &.active {
      display: block;
    }
  }

  section-header {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding-top: 10px;
    margin: 0 20px;

    h2 {
      color: $darkgrey;
      font-size: 18pt;
      text-align: left;
      padding: 10px 0px;
      margin: 0px;
    }
  }

  .cta-content {
    display: flex;
  }

  .cta-copy {}

  .cta-action {
    margin: auto;

    .btn {
      display: block;
      margin: auto;
      text-decoration: none;
    }
  }
</style>
