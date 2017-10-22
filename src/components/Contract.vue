<template>
  <div class="contract">
    <h1>{{address}}</h1>
    <div v-for="member in members">
      <pre>{{member}}</pre>
    </div>
    <div class="contract-header">
      <section-header :title="name"></section-header>
      <div class="sub-details">
        <div class=""><small>Total Available:</small> {{totalEth}} Eth/{{totalCurrency}} {{currency}}</div>
      </div>
    </div>
    <allocation-bar :allocations="allocations"/>
    <patron-card/>
    <allocation-form/>
    <transactions-list/>
  </div>
</template>

<script>
import AllocationBar from '@/components/AllocationBar'
import AllocationForm from '@/components/AllocationForm'
import PatronCard from '@/components/PatronCard'
import SectionHeader from '@/components/SectionHeader'
import TransactionsList from '@/components/TransactionsList'
import { mapGetters } from 'vuex'
import abi from '../assets/Doneth.json'
import BN from 'bignumber.js'
export default {

  name: 'Contract',
  props: ['address'],
  data () {
    return {
      abi,
      Doneth: null,
      members: [],
      name: 'Contract Name',
      allocations: [{
        value: 2130,
        color: 0x333333
      }],
      totalEth: 13,
      totalCurrency: 2349,
      currency: 'USD'
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
  },
  components: {
    AllocationBar,
    AllocationForm,
    PatronCard,
    SectionHeader,
    TransactionsList
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';
  .contract {

  }
</style>
