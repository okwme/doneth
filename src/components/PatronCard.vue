<template>
  <div class="patron-cards">
    <div class="patron-card" v-for="member in members" v-on:mouseenter="toggleActive(member, true)" v-on:mouseleave="toggleActive(member, false)">
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
          <span>Ownership: <strong>{{percentage(member)}}</strong></span>
          <span>Allowed: <strong>{{getAllowedAmount(member.address) || 0}}</strong></span>
        </div>
      </div>
      <div class="actions" :class="{ active: withdrawing }" v-if="member.address === account">
        <div @click="withdrawing = !withdrawing" :class="{ active: withdrawing }" class="btn btn-primary">Withdraw</div>
        <div class="withdraw-form" :class="{ active: withdrawing }">
          <div class="fields">
            <label for="">ETH</label>
            <input :class="overdrafted(member, withdrawAmount)" class="center" type="number" placeholder="Amount (ETH)" v-model="withdrawAmount">
            <input readOnly="true" class="center" type="text" :value="convertedAmount">
          </div>
          <div class="actions">
            <button @click="cancelWithdraw" class="btn btn-error" name="button">Cancel</button>
            <button @click="withdraw(member)" class="btn btn-primary" name="button">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <patron-form v-if="isAdmin" :address="address"/>
  </div>
</template>

<script>
import PatronForm from '@/components/PatronForm'
import ShortHash from '@/components/ShortHash'
import { mapGetters, mapActions } from 'vuex'
import BN from 'bignumber.js'
export default {

  name: 'PatronCard',

  props: ['address'],

  data () {
    return {
      withdrawAmount: 0,
      convertedAmount: 0,
      withdrawing: false,
      withdrawer: 0
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
    },
    toggleActive: function (member, bool) {
      // TODO: Come back when not confused :)
      // member.active = (typeof bool === 'undefined') ? true : bool
      // this.$emit('activemember')
    },
    cancelWithdraw () {
      this.withdrawing = false
      this.withdrawer = null
    },
    withdraw (member) {
      if (this.withdrawing) {
        this.makeWithdraw(this.withdrawAmount).then((result) => {
          this.withdrawing = false
        }).catch(() => {
          this.withdrawing = false
        })
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
    width: calc(32% - 20px);
    margin: 0 10px;
    // padding-bottom: 10px;
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
      border-radius: 3px;
      margin: auto;
      // width: 100%;

      &.active {
        border-radius: 3px 3px 0 0;
      }
    }

    &.active {
      background: darken($white, 3%);
    }
  }

  .withdraw-form {
    display: flex;
    flex-direction: column;
    opacity: 0;
    max-height: 0;
    width: 210px;
    margin: auto;
    padding-bottom: 20px;
    transition: opacity 220ms ease 20ms;

    .fields {
      margin: 10px 0;
    }

    input {
      width: calc(50% - 60px);
      text-align: right;
      padding-left: 50px;
      &.overdrawn {
        border-color: $error;
      }
      &:last-of-type {
        width: calc(50% - 10px);
        padding-left: 0;
        padding-right: 5px;
      }
    }

    .actions {
      display: flex;

      .btn {
        width: calc(50% - 10px);
      }

      .btn-error {
        opacity: .4;

        &:hover {
          opacity: 1;
        }
      }
    }

    &.active {
      opacity: 1;
      max-height: 400px;
      transition: opacity 220ms ease 0;
    }
  }
</style>
