<template>
  <div class="contract">
    <!-- <h1>{{address}}</h1>
    <div v-for="member in members">
      <pre>{{member}}</pre>
    </div> -->
    <div class="contract-header">
      <div class="contract-details">
        <h2>{{name}}</h2>
        <div class="sub-details">
          <div class=""><small>Total Available:</small> {{totalEth}} Eth/{{totalCurrency}} {{currency}}</div>
          <div class=""><small>Created:</small> {{createdAt | dateTime}}</div>
        </div>
      </div>
      <div class="contract-cta">
        <button type="button" name="button" class="btn btn-primary">
          <b>Add Funds</b>
          <sub>0x0000...00000</sub>
          <!-- TODO: Split this into component  -->
        </button>
      </div>
    </div>
    <allocation-bar :allocations="allocations"/>
    <patron-card :patrons="members"/>
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
      currency: 'USD',
      createdAt: 1508639178669
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
  },
  filters: {
    dateTime: function (value) {
      if (!value) return ''
      return this.$moment(value).format('dddd, MMMM Do YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .contract-header {
    display: flex;
    width: 60vw;
    min-width: 760px;
    margin: 20px auto 0;

    h2 {
      font-size: 16pt;
      margin: 0;
      padding: 0;
    }
  }

  .contract-details {
    flex: 1;
    text-align: left;
  }

  .contract-cta {
    margin: 0;
  }
</style>
