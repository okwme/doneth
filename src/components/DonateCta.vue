<template>
  <div class="donate-cta">
    <section-header :title="'Donate & Help Us Out!'" class="cl-white"></section-header>
    <div class="cta-content">
      <div class="flex-2 cta-copy">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="flex-1 cta-action">
        <button type="button" name="button" class="btn btn-white btn-outlined">
          <b>Click this bro</b>
          <short-hash :hash="address"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader'
import ShortHash from '@/components/ShortHash'
export default {

  name: 'DonateCta',

  data () {
    return {
      address: '0x0000000000000000000000000000000000001'
    }
  },
  components: {
    SectionHeader,
    ShortHash
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';
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

    &.cl-white h2 {
      color: $white;
    }
  }

  .cta-content {
    display: flex;
  }

  .cta-copy {}

  .cta-action {
    margin: auto;

    .btn {
      width: 80%;
    }
  }
</style>
