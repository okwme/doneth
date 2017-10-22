<template>
  <div class="contract">
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
export default {

  name: 'Contract',
  props: ['address'],
  data () {
    return {
      abi,
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
    ...mapGetters(['metamask'])
  },
  mounted () {
    this.useContract()
  },
  methods: {
    useContract () {
      let Doneth = new web3.eth.Contract(this.abi.abi, this.address)
      console.log(Doneth)
      // Doneth.methods.name.call().then((resp) => {
      //   console.log(resp)
      // })
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
