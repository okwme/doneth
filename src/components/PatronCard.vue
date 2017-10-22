<template>
  <div class="patron-cards">
    <div class="patron-card" v-for="member in patrons" v-on:mouseenter="toggleActive(member, true)" v-on:mouseleave="toggleActive(member, false)">
      <div class="user">
        <div class="avatar" :style="{ background: colorHex(member) }">
          <div>{{firstName(member)}}</div>
        </div>
        <div class="attributes">
          <h3>{{member.memberName || 'FirstName'}}</h3>
          <short-hash :hash="member.address || '0x0000000000000'"/>
        </div>
      </div>
      <hr class="divider" :style="{ background: colorHex(member) }">
      <div class="meta">
        <div class="meta-item">
          <span>Shares: <strong>{{member.shares}}</strong></span>
          <span>Transactions: <strong>{{member.transactions || 0}}</strong></span>
        </div>
        <div class="meta-item">
          <span>Ownership: <strong>45%</strong></span>
        </div>
      </div>
      <div class="actions" v-if="member.address === account">
        <input class="center" v-if="withdrawing" type="number" placeholder="Amount (ETH)" v-model="withdrawAmount">
        <input readOnly="true" class="center" v-if="withdrawing" type="text" :value="convertedAmount">
        <button @click="withdraw(member)" class="btn btn-primary btn-outlined" name="button"
        v-text="withdrawing ? 'Confirm' : 'Withdraw'"></button>
        <button @click="cancelWithdraw" class="btn btn-error btn-outlined" name="button" v-if="withdrawing && withdrawer === member.address">Cancel</button>
      </div>
    </div><!-- 
     --><patron-form :address="address"/>
  </div>
</template>

<script>
import PatronForm from '@/components/PatronForm'
import ShortHash from '@/components/ShortHash'
import { mapGetters, mapActions } from 'vuex'
export default {

  name: 'PatronCard',

  props: ['patrons', 'address'],

  data () {
    return {
      withdrawAmount: 0,
      convertedAmount: 0,
      withdrawing: false,
      withdrawer: 0
    }
  },
  computed: {
    ...mapGetters(['account', 'conversions', 'currency'])
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
    ...mapActions(['convertToCurrency', 'makeWithdraw']),
    updateConversion () {
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
    toggleActive: function (member, bool) {
      // TODO: Come back when not confused :)
      // member.active = (typeof bool === 'undefined') ? true : bool
      // console.log('member', member.active)
      // this.$emit('activemember')
    },
    cancelWithdraw () {
      this.withdrawing = false
      this.withdrawer = null
    },
    withdraw (member) {
      if (this.withdrawing) {
        this.makeWithdraw(this.withdrawAmount)
      } else {
        this.withdrawer = member.address
        this.withdrawing = true
      }
    }
  },
  components: {
    PatronForm,
    ShortHash
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .patron-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-width: 780px;
    margin: 20px auto 30px;
    width: 60vw;
  }

  .patron-card {
    background: $white;
    border-radius: $border-radius;
    box-shadow: 0 1px 10px -2px rgba(0,0,0,0.1);
    overflow: hidden;
    width: 250px;
    margin: 0 10px 10px;
    padding-bottom: 10px;
    transition: all 220ms ease;

    &:hover {
      box-shadow: 0 1px 20px -2px rgba(0,0,0,0.3);
    }
  }

  .user {
    display: flex;
    margin: 0 12px;

    .avatar {
      margin: auto;
    }

    .attributes {
      padding: 10px;
      text-align: left;
      width: calc(75% - 24px);

      h3 {
        margin: 0;
        padding: 0;
      }
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

  .actions {

    .btn {
      margin: 10px 0 0;
      width: 70%;
    }
  }
</style>
