<template>
  <div class="contract">
    <div class="contract-header">
      <div class="contract-details">
        <h2>{{contractName}}</h2>
        <div class="sub-details">
          <div class=""><small>Total Available:</small> {{totalBalance}} Eth/{{totalBalance}} {{currency}}</div>
          <div class=""><small>Created:</small> {{dateTime(timestamp)}}</div>
        </div>
      </div>

      <add-funds :address="address"/>
    </div>
    <allocation-bar :patrons="members"/>
    <patron-card :address="address" :patrons="members"/>
    <allocation-form />
    <transactions-list :allocations="sortedLogs"/>
  </div>
</template>

<script>
import AddFunds from '@/components/AddFunds'
import AllocationBar from '@/components/AllocationBar'
import AllocationForm from '@/components/AllocationForm'
import PatronCard from '@/components/PatronCard'
import ShortHash from '@/components/ShortHash'
import SectionHeader from '@/components/SectionHeader'
import TransactionsList from '@/components/TransactionsList'
import { mapGetters, mapActions } from 'vuex'
export default {

  name: 'Contract',
  props: ['address'],
  data () {
    return {
      currency: 'USD',
      createdAt: 1508639178669,
      convertedAmount: 0,
      depositAmount: 0,
      timestamp: null
    }
  },
  computed: {
    ...mapGetters(['metamask', 'members', 'contractName', 'sortedLogs', 'totalBalance'])
  },
  mounted () {
    this.deployDoneth(this.address)
    this.getCreatedAt()
  },
  watch: {
    depositAmount () {
      this.convertToCurrency(this.depositAmount).then((amount) => {
        this.convertedAmount = amount
      })
    }
  },
  methods: {
    ...mapActions(['deployDoneth', 'makeDeposit', 'convertToCurrency']),
    dateTime (value) {
      if (!value) return ''
      return this.$moment(value).format('dddd, MMMM Do YYYY')
    },
    getCreatedAt () {
      if (!this.sortedLogs || this.sortedLogs.length <= 0 || !this.sortedLogs[0] || !this.sortedLogs[0].blockNumber) {
        // NOTE: Added only for demo so no missing data :/
        this.timestamp = (+new Date())
        return
      }
      web3.eth.getBlock(this.sortedLogs[0].blockNumber)
      .then((res) => {
        if (res && res.timestamp) this.timestamp = res.timestamp * 1000
      })
    }
  },
  components: {
    AddFunds,
    AllocationBar,
    AllocationForm,
    PatronCard,
    SectionHeader,
    ShortHash,
    TransactionsList
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
    display: flex;
    flex: 1;
    justify-content: flex-end;

    .btn {
      width: 200px;
      margin: auto 0;
      padding: 10px 0 6px;
    }
  }
</style>
