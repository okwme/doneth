<template>
  <div class="withdraw-form">
    <form @submit.prevent="withdraw(patron)">
      <div class="funds-meta">
        {{getAllowedAmount()}} ETH available to withdraw
      </div>
      <div class="funds-options">
        <button @click.prevent="useAllAmount()" class="btn btn-primary btn-outlined">All</button>
        <button @click.prevent="useHalfAmount()" class="btn btn-primary btn-outlined">Half</button>
      </div>
      <div class="fields">
        <label for="">ETH</label>
        <input step="0.0001" min="0.000000000000000001" :class="overdrafted(patron, withdrawAmount)" class="center" type="number" placeholder="Amount (ETH)" v-model="withdrawAmount">
        <label for="">{{currency}}</label>
        <input readOnly="true" class="center" type="text" :value="convertedAmount">
      </div>
      <div class="field field-address">
        <label for="add_address">Address:</label>
        <input minLength="42" maxLength="42" type="text" name="add_address" v-model="userAddress" placeholder="0x000000000..." required>
      </div>

      <div class="footer">
        <template v-if="!submitting">
          <button class="btn btn-primary" >Submit</button>
          <button class="btn btn-secondary" @click.prevent="closeModal()">Cancel</button>
        </template>
        <template v-if="submitting">
          <button class="btn btn-primary">Sending...</button>
        </template>
      </div>
    </form>
  </div>
</template>

<script>
import UiModal from '@/components/UiModal'
import { BigFloat } from "bigfloat.js";
import utils from 'web3-utils'

const BN = BigFloat;

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {

  name: 'ExpenseWithdrawForm',
  data () {
    return {
      userAddress: null,
      withdrawAmount: 0,
      convertedAmount: 0,
      withdrawer: 0,
      withdrawing: false,
      submitting: false
    }
  },
  computed: {
    ...mapGetters(['account', 'members', 'conversions', 'currency', 'totalExpense', 'totalExpenseWithdrawn', 'totalBalance']),
    patron () {
      return this.members.find(m => m.address.toLowerCase() === this.account.toLowerCase())
    }
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
    ...mapMutations({setModal: 'SET_MODAL'}),
    ...mapActions(['convertToCurrency', 'makeExpenseWithdraw', 'addNotification']),
    getAllowedAmount () {
      return 100
      // let patron = this.members.find((p) => p.address.toLowerCase() === address.toLowerCase())
      // if (!patron || !patron.allowedAmount) return 0
      // return new BN(patron.allowedAmount).toString(4)
    },
    getFullAllowedAmount () {
      return new BN(utils.fromWei(this.totalExpense.toString())).sub(this.totalExpenseWithdrawn)
    },
    isOverdrafted (patron, withdrawing) {
      if (isNaN(withdrawing) || withdrawing === '') return false
      return new BN(withdrawing).gt(this.getFullAllowedAmount())
    },
    overdrafted (patron, withdrawing) {
      return {
        overdrawn: this.isOverdrafted(patron, withdrawing)
      }
    },
    updateConversion () {
      if (!this.withdrawAmount) {
        this.convertedAmount = 0
      } else {
        this.convertToCurrency(this.withdrawAmount).then((convertedAmount) => {
          this.convertedAmount = convertedAmount
        })
      }
    },
    cancelWithdraw () {
      this.withdrawing = false
      this.submitting = false
      this.withdrawer = null
    },
    withdraw (patron) {
      if (this.withdrawAmount) {
        this.withdrawer = patron.address
        this.submitting = true
        this.makeExpenseWithdraw({amount: this.withdrawAmount + '', to: this.userAddress}).then((result) => {
          this.withdrawing = false
          this.submitting = false
          this.closeModal('modalWithdrawFunds')
        }).catch(() => {
          this.withdrawing = false
          this.submitting = false
        })
      }
    },
    useAllAmount () {
      this.withdrawAmount = this.getFullAllowedAmount().toString()
    },
    useHalfAmount () {
      this.withdrawAmount = new BN(this.getFullAllowedAmount() / 2 + '').toString()
    },
    useMinAmount () {
      this.withdrawAmount = new BN('0.005').toString()
    },
    closeModal (ref) {
      this.setModal(false)
    }
  },
  components: {
    UiModal
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .btn-link {
    margin-bottom: 12px;
  }

  .withdraw-form {

    .fields {
      margin: 10px auto 0;
      width: 95%;

      label {
        font-size: 13pt;
      }

      input {
        padding-left: 50px;
        text-align: right;
        width: calc(50% - 60px);

        &:last-of-type {
          width: calc(50% - 10px);
          padding-left: 0;
          padding-right: 5px;
        }
      }
    }

    p {
      padding: 20px 15px 0;
    }

    input {

      &.overdrawn {
        border-color: $error;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin: 10px -24px -24px;
    background: #f5f5f5;
    padding: 15px 24px;

    .btn {
      min-width: 100px;
    }
  }

  .funds-meta {
    font-size: 10pt;
    font-weight: 600;
  }

  .funds-options {
    margin: 20px auto 10px;
    width: 96%;

    .btn {
      border-right-width: 0px;
      display: inline-block;
      margin: 0 -3px;
      width: 33%;
      outline: 0;

      &:last-of-type {
        border-right-width: 2px;
      }
    }
  }
</style>
