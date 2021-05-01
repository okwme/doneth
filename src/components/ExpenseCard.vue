<template>
  <div>
    <div class="user">
      <h3>Accounts Payable</h3>
    </div>
    <goal-bar :total="allotted" :current="allotted - used" />
    <div class="meta">
      <div class="meta-item">
        <span>Available: <strong>{{totalExpenseWei}} ETH</strong><strong v-if="getConvertedTotal() > 0"> / {{getConvertedTotal()}}</strong></span>
      </div>
      <div class="meta-item">
        <span>Allotted: <strong>{{allotted}} ETH</strong></span>
        <span>Used: <strong>{{used}} ETH</strong></span>
      </div>
    </div>
  </div>
</template>

<script>
import GoalBar from '@/components/GoalBar'
import { mapGetters, mapActions } from 'vuex'

import { BigFloat } from "bigfloat.js";
const BN = BigFloat;
import Web3 from 'web3'
export default {
  name: 'ExpenseCard',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['account', 'conversions', 'currency', 'totalBalance', 'totalExpense', 'totalExpenseWithdrawn', 'isAdmin']),
    allotted () {
      return Web3.utils.fromWei(this.totalExpense.toString())
    },
    used () {
      return Web3.utils.fromWei(this.totalExpenseWithdrawn.toString())
    },
    totalExpenseWei () {
      return Web3.utils.fromWei(new BN(this.totalExpense).sub(new BN(this.totalExpenseWithdrawn)).toString())
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
      return this.convertToCurrency(new BN(this.totalExpenseWei, 10).toString(2))
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
