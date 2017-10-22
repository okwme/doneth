<template>
  <div>
    <h1>{{address}}</h1>
    <div v-for="member in members">
      <pre>{{member}}</pre>
    </div>
  </div>
</template>

<script>
import ManageContract from '@/components/ManageContract'
import ViewContract from '@/components/ViewContract'
import { mapGetters } from 'vuex'
import abi from '../assets/Doneth.json'
import BN from 'bignumber.js'
export default {

  name: 'Contract',
  props: ['address'],
  components: {ManageContract, ViewContract},
  data () {
    return {
      abi,
      Doneth: null,
      members: []
    }
  },
  computed: {
    ...mapGetters(['metamask', 'connected'])
  },
  mounted () {
    this.tryContract()
  },
  methods: {
    tryContract () {
      if (this.connected) {
        this.useContract()
      } else {
        setTimeout(() => {
          this.tryContract()
        }, 500)
      }
    },
    useContract () {
      this.Doneth = new web3.eth.Contract(this.abi.abi, this.address)
      this.pullMembers()
      this.readLogs()
    },
    pullMembers () {
      return this.Doneth.methods.getMemberCount().call().then((count) => {
        return this.pullMember(0, count)
      })
    },
    pullMember (current, length) {
      return this.Doneth.methods.getMemberAtKey(new BN(current)).call()
      .then((address) => {
        return this.Doneth.methods.returnMember(address).call()
        .then(({active, admin, shares, withdrawn}) => {
          this.members.push({address, active, admin, shares, withdrawn})
          if (current < length - 1) this.pullMembers(current + 1, length)
        })
      })
    },
    readLogs () {
      this.Doneth.getPastEvents('AddShare', {
        fromBlock: 0,
        toBlock: 'latest'
      })
      .then((results) => {
        console.log(results)
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
