<template>
  <div class="donate-embed">
    <button type="button" name="button" class="btn btn-primary">
      <b>{{btntitle || 'Donate Ether'}}</b>
      <short-hash :hash="address"/>
    </button>
  </div>
</template>

<script>
import ShortHash from '@/components/ShortHash'
export default {

  name: 'DonateButton',
  props: ['address', 'btntitle'],
  data () {
    return {
    }
  },
  components: {
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
        if (!node.classList || node.classList.length <= 0 || node.classList[0] !== 'donate-embed') {
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

  .donate-embed {
    display: flex;
    height: 50px;

    .btn {
      border-radius: 0px;
      width: 100%;
      padding-top: 0;
    }
  }
</style>
