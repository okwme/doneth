<template>
  <div class="withdraw-form">
    <form @submit.prevent="allocate()">
      <div class="funds-meta">
        {{totalBalance}} ETH available to allocate
      </div>
      <div class="funds-options">
        <button @click.prevent="useAllAmount()" class="btn btn-primary btn-outlined">All</button>
        <button @click.prevent="useHalfAmount()" class="btn btn-primary btn-outlined">Half</button>
<!--         <button @click.prevent="useMinAmount()" class="btn btn-primary btn-outlined">Min</button> -->
      </div>
      <div class="fields">
        <label for="">ETH</label>
        <input 
        :class="overdrafted(allocateAmount)"
        min="0.000000000000000001"  step="0.0001"  class="center" type="number" placeholder="Amount (ETH)" v-model="allocateAmount">
        <label for="">{{currency}}</label>
        <input readOnly="true" class="center" type="text" :value="convertedAmount">
      </div>

      <div class="footer">
        <template v-if="!submitting">
          <button class="btn btn-secondary" @click.prevent="closeModal()">Cancel</button>
          <button class="btn btn-primary" >Submit</button>
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
import BN from 'bignumber.js'
import utils from 'web3-utils'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {

  name: 'ExpenseAllocateForm',
  props: ['patron'],
  data () {
    return {
      allocateAmount: 0,
      convertedAmount: 0,
      submitting: false
    }
  },
  computed: {
    ...mapGetters(['account', 'conversions', 'currency', 'totalExpense', 'totalExpenseWithdrawn', 'totalBalance'])
  },
  watch: {
    allocateAmount () {
      this.updateConversion()
    },
    currency () {
      this.updateConversion()
    }
  },
  mounted () {
    this.allocateAmount = utils.fromWei(this.totalExpense)
  },
  methods: {
    ...mapMutations({setModal: 'SET_MODAL'}),
    ...mapActions(['convertToCurrency', 'allocateExpenseAmount', 'addNotification']),
    overdrafted (amount) {
      return {
        overdrawn: new BN(amount).greaterThan(this.totalBalance)
      }
    },
    allocate () {
      if (this.allocateAmount) {
        this.submitting = true
        this.allocateExpenseAmount(this.allocateAmount).then((result) => {
          this.submitting = false
          this.closeModal()
        }).catch(() => {
          this.submitting = false
        })
      }
    },
    getFullAllowedAmount () {
      return this.totalBalance
    },
    updateConversion () {
      if (!this.allocateAmount) return
      this.convertToCurrency(this.allocateAmount).then((convertedAmount) => {
        this.convertedAmount = convertedAmount
      })
    },
    useAllAmount () {
      this.allocateAmount = this.getFullAllowedAmount()
    },
    useHalfAmount () {
      this.allocateAmount = new BN(this.getFullAllowedAmount()).div(2).toString()
    },
    useMinAmount () {
      this.allocateAmount = new BN('0.005').toFixed(3)
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
      margin: 10px auto 30px;
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
