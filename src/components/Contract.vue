<template>
  <div class="contract">
    <!-- <h1>{{address}}</h1>
    <div v-for="member in members">
      <pre>{{member}}</pre>
    </div> -->
    <div class="contract-header">
      <div class="contract-details">
        <h2>{{contractName}}</h2>
        <div class="sub-details">
          <div class=""><small>Total Available:</small> {{totalBalance}} Eth/{{totalBalance}} {{currency}}</div>
          <div class=""><small>Created:</small> {{dateTime(createdAt)}}</div>
        </div>
      </div>
      <div class="contract-cta">
        <button type="button" name="button" class="btn btn-primary">
          <b>Add Funds</b>
          <short-hash :hash="address"/>
        </button>
      </div>
    </div>
    <allocation-bar :patrons="members"/>
    <patron-card :address="address" :patrons="members"/>
    <allocation-form />
    <transactions-list :allocations="sortedLogs"/>
  </div>
</template>

<script>
import AllocationBar from '@/components/AllocationBar'
import AllocationForm from '@/components/AllocationForm'
import PatronCard from '@/components/PatronCard'
import ShortHash from '@/components/ShortHash'
import SectionHeader from '@/components/SectionHeader'
import TransactionsList from '@/components/TransactionsList'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {

  name: 'Contract',
  props: ['address'],
  data () {
    return {
      Doneth: null,
      currency: 'USD',
      totalBalance: 10
    }
  },
  computed: {
    ...mapGetters(['metamask', 'members', 'contractName', 'sortedLogs']),
    createdAt () {
      var ts = new Promise((resolve, reject) => {
        return web3.eth.getBlock(this.sortedLogs[0].blockNumber)
          .then((res) => {
            console.log('res', res)
            resolve(res.timestamp)
          })
      })
      console.log('res.timestampres.timestamp', ts)
      return ts
    }
  },
  mounted () {
    this.addAddress(this.address)
    this.deployDoneth()
  },
  methods: {
    ...mapActions(['deployDoneth']),
    ...mapMutations({addAddress: 'ADD_ADDRESS'}),
    dateTime (value) {
      if (!value) return ''
      return this.$moment(value).format('dddd, MMMM Do YYYY')
    }
  },
  components: {
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
