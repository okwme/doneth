<template>
  <div class="donate-embed" :class="{ small: isSmall }">
    <div @click="donate" name="button" class="btn btn-primary" :class="clickable">
      <b>{{btntitle || 'Donate Ether'}}</b>
      <sub>{{address}}</sub>
    </div>
   <!-- <add-funds :embed="true" :address="address"/>   -->
  </div>
</template>

<script>
import AddFunds from '@/components/AddFunds'
import ShortHash from '@/components/ShortHash'
import {mapActions} from 'vuex'
export default {

  name: 'DonateButton',
  props: ['address', 'btntitle'],
  data () {
    return {
      isSmall: false
    }
  },
  components: {
    AddFunds,
    ShortHash
  },
  mounted () {
    this.deployDoneth(this.address)
    this.isSmall = (window.location.href.search('small') > -1)
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

    // super hacky? yep
    setTimeout(removeChildNodes, 10)
    setTimeout(removeChildNodes, 100)
    setTimeout(removeChildNodes, 300)
  },
  computed: {
    clickable () {
      return {'no-cursor': typeof window.web3 === 'undefined'}
    }
  },
  methods: {
    ...mapActions(['deployDoneth']),
    donate () {
      let address = window.location.href.split('/')
      window.parent.location = `https://doneth.org/${address[3]}`
      // if (typeof window.web3 !== 'undefined') {
      //
      // } else {
      //   return false
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';
  .no-cursor {
    cursor: default;
  }

  .donate-embed {
    display: flex;
    height: 40px;
    padding: 0;

    .btn {
      border-radius: 0px;
      width: 100%;
      height: 40px;
      padding: 4px 0 5px;

      sub {
        display: block;
        font-size: 8pt;
      }
    }

    &.small {

      .btn {
        height: 22px;
        padding: 1px 0 5px;

        sub {
          display: none;
        }
      }
    }
  }
</style>
