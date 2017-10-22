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
    <transactions-list :allocations="logs"/>
  </div>
</template>

<script>
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
      Doneth: null,
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
    ...mapGetters(['metamask', 'members', 'contractName', 'logs'])
  },
  mounted () {
    this.deployDoneth(this.address)
  },
  methods: {
    ...mapActions(['deployDoneth']),
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
