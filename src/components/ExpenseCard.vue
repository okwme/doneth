<template>
  <div>
    <div class="user">
      <h3>Accounts Payable</h3>
    </div>
    <goal-bar :total="100" :current="23" />
    <div class="meta">
      <div class="meta-item">
        <span>Available: <strong>0.3 ETH / $100</strong></span>
      </div>
      <div class="meta-item">
        <span>Allotment: <strong>{{percentage(member)}}</strong></span>
        <span>Used: <strong>{{member.shares}}%</strong></span>
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
  props: ['address'],
  data () {
    return {
      withdrawAmount: 0,
      convertedAmount: 0,
      withdrawing: false,
      withdrawer: 0,
      member: {
        shares: 1,
        transactions: 1
      }
    }
  },
  computed: {
    ...mapGetters(['account', 'conversions', 'currency', 'totalShares', 'members', 'isAdmin'])
  },
  watch: {
    withdrawAmount () {
      this.updateConversion()
    },
    currency () {
      this.updateConversion()
    }
  },
  methods: {
    ...mapActions(['convertToCurrency', 'makeWithdraw', 'addNotification']),
    isOverdrafted (member, withdrawing) {
      if (isNaN(withdrawing) || isNaN(member.allowedAmount)) return false
      let allowedAmount = new BN(window.web3.utils.toWei(member.allowedAmount))
      withdrawing = new BN(window.web3.utils.toWei(withdrawing))
      return allowedAmount.greaterThanOrEqualTo(withdrawing)
    },
    overdrafted (member, withdrawing) {
      return {
        overdrawn: !this.isOverdrafted(member, withdrawing)
      }
    },
    getAllowedAmount (address) {
      let member = this.members.find((member) => member.address === address)
      if (!member || !member.allowedAmount) return 0
      return new BN(member.allowedAmount).toFixed(4)
    },
    updateConversion () {
      if (!this.withdrawAmount) return
      this.convertToCurrency(this.withdrawAmount).then((convertedAmount) => {
        this.convertedAmount = convertedAmount
      })
    },
    firstName (member) {
      let initial = (member && member.memberName) ? member.memberName.substring(0, 2) : '0x'
      return initial.toUpperCase()
    },
    colorHex (member) {
      return (member && member.address) ? `#${member.address.slice(-6)}` : '#CCCCCC'
    },
    percentage (member) {
      let num = parseInt(this.totalShares, 10)
      if (num === 0) {
        this.members.map((p) => {
          if (p && p.shares && !isNaN(parseInt(p.shares, 10))) {
            num += parseInt(p.shares, 10)
          }
        })
      }
      return Math.round((parseInt(member.shares, 10) * 100) / num) + '%'
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
