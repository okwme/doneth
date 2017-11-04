<template>
  <div>
    <div class="user">
      <h3>Accounts Payable</h3>
    </div>
    <goal-bar :total="percentageAllotted" :current="percentageAllotted - percentageUsed" />
    <div class="meta">
      <div class="meta-item">
        <span>Available: <strong>{{totalExpenseWei}} ETH</strong><strong v-if="getConvertedTotal() > 0"> / {{getConvertedTotal()}}</strong></span>
      </div>
      <div class="meta-item">
        <span>Allotted: <strong>{{percentageAllotted}}%</strong></span>
        <span>Used: <strong>{{percentageUsed}}%</strong></span>
      </div>
    </div>
  </div>
</template>

<script>
import GoalBar from '@/components/GoalBar'
import { mapGetters, mapActions } from 'vuex'
import BN from 'bignumber.js'
export default {
  name: 'ExpenseCard',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['account', 'conversions', 'currency', 'totalBalance', 'totalExpense', 'totalExpenseWithdrawn', 'isAdmin']),
    percentageAllotted () {
      if (!window.web3 || !window.web3.utils) return
      let totalWei = window.web3.utils.toWei(this.totalBalance)
      return ((this.totalExpense + this.totalExpenseWithdrawn) / totalWei).toFixed(2)
    },
    percentageUsed () {
      return this.totalExpenseWithdrawnWei
    },
    totalExpenseWei () {
      if (!window.web3 || !window.web3.utils) return
      return window.web3.utils.fromWei(new BN(this.totalExpense), 'ether')
    },
    totalExpenseWithdrawnWei () {
      if (!window.web3 || !window.web3.utils) return
      return window.web3.utils.fromWei(new BN(this.totalExpenseWithdrawn), 'ether')
    }
  },
  watch: {
    currency () {
      this.getConvertedTotal()
    }
  },
  methods: {
    ...mapActions(['convertToCurrency']),
    getConvertedTotal () {
      if (!this.totalExpenseWei) return 0
      return this.convertToCurrency(new BN(this.totalExpenseWei, 10).toFixed(2))
    }
  },
  components: {
    GoalBar
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .user {
    display: flex;
    margin: 12px;

    h3 {
      margin: 0;
      padding: 0;
    }
  }

  .divider {
    border: 0;
    border-radius: $border-radius;
    display: block;
    height: 5px;
    width: 90%;
    margin: 0 auto 5px;
  }

  .meta {
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    margin: 10px 0 20px;

    .meta-item {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;

      span {
        font-size: 9pt;
        text-transform: uppercase;
      }

      &:not(:last-child) {
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }
    }
  }

</style>
