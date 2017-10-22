<template>
  <div class="donate-cta">
    <section-header :title="'Donate & Help Us Out!'" class="cl-white"></section-header>
    <div class="cta-content">
      <div class="flex-2 cta-copy">
        <p>Want to help keep this project alive?<br>Send us some ether via this donation address, and it will go directly to development and maintenance, helping easy financial contracts remain in your control!<br>Keep being awesome! Your pals,</p>
      </div>
      <div class="flex-1 cta-action">
        <button type="button" name="button" class="btn btn-white btn-outlined">
          <b>{{btntitle || 'Donate Ether'}}</b>
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

  name: 'DonateWidget',
  props: ['address', 'btntitle'],
  data () {
    return {
    }
  },
  components: {
    SectionHeader,
    ShortHash
  },
  mounted () {
    document.body.classList = document.body.classList + ' embedded-btn'
    document.querySelector('#app').style.margin = '0px'

    function removeChildNodes () {
      // Hide all the other shits, buttns fur btns
      const appChilds = document.querySelector('#app')
      for (var i = 0; i < appChilds.children.length; i++) {
        let node = appChilds.children[i]
        if (!node.classList || node.classList.length <= 0 || node.classList[0] !== 'donate-cta') {
          appChilds.removeChild(node)
        }
      }
    }

    setTimeout(removeChildNodes, 10)
    setTimeout(removeChildNodes, 100)
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';
  .donate-cta {
    background: $primary;
    height: 100%;
  }
  section-header {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding-top: 10px;
    margin: 0 20px;

    h2 {
      color: $white;
      font-size: 18pt;
      text-align: left;
      padding: 10px 0px;
      margin: 0px;
    }
  }

  .cta-content {
    color: $white;
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
