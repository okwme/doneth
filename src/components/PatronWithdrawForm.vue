<template>
  <div>
    <button v-if="getAllowedAmount(patron.address) > 0" @click="openModal('modalWithdrawFunds')" class="btn btn-primary btn-link">Withdraw Funds</button>

    <ui-modal modal-id="modalWithdrawFunds" title="Withdraw Funds">
      <form @submit.prevent="withdraw(patron)">
        <div class="withdraw-form">
          <div class="funds-meta">
            You have {{getAllowedAmount(patron.address)}} ETH available to withraw
          </div>
          <div class="funds-options">
            <button @click.prevent="useAllAmount()" class="btn btn-primary btn-outlined">All</button>
            <button @click.prevent="useHalfAmount()" class="btn btn-primary btn-outlined">Half</button>
            <button @click.prevent="useMinAmount()" class="btn btn-primary btn-outlined">Min</button>
          </div>
          <div class="fields">
            <label for="">ETH</label>
            <input 
            min="0.000000000000000001"
            step="0.000000000000000001"
            :class="overdrafted(patron, withdrawAmount)" class="center" type="number" placeholder="Amount (ETH)" v-model="withdrawAmount">
            <label for="">{{currency}}</label>
            <input readOnly="true" class="center" type="text" :value="convertedAmount">
          </div>
          <p>Optionally send to different address:</p>
          <div class="field field-address">
            <label for="add_address">Address:</label>
            <input minLength="42" maxLength="42" type="text" name="add_address" v-model="userAddress" placeholder="0x000000000..." required>
          </div>
        </div>

        <div slot="footer">
          <template v-if="!submitting">
            <button class="btn btn-secondary" @click.prevent="closeModal()">Cancel</button>
            <button class="btn btn-primary" >Submit</button>
          </template>
          <template v-if="submitting">
            <button class="btn btn-primary">Sending...</button>
          </template>
        </div>
      </form>
    </ui-modal>
  </div>
</template>

<script>
import UiModal from '@/components/UiModal'
import BN from 'bignumber.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {

  name: 'PatronWithdrawForm',
  props: ['patron'],
  data () {
    return {
      userAddress: this.patron.address,
      withdrawAmount: 0,
      convertedAmount: 0,
      withdrawer: 0,
      withdrawing: false,
      submitting: false
    }
  },
  computed: {
    ...mapGetters(['account', 'members', 'conversions', 'currency'])
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
    ...mapActions(['convertToCurrency', 'makeWithdraw', 'addNotification']),
    getAllowedAmount (address) {
      let patron = this.members.find((p) => p.address === address)
      if (!patron || !patron.allowedAmount) return 0
      return new BN(patron.allowedAmount).toFixed(4)
    },
    getFullAllowedAmount (address) {
      let patron = this.members.find((p) => p.address === address)
      if (!patron || !patron.allowedAmount) return 0
      return new BN(patron.allowedAmount)
    },
    isOverdrafted (patron, withdrawing) {
      if (!withdrawing || !patron.allowedAmount || isNaN(withdrawing) || isNaN(patron.allowedAmount)) return false
      let allowedAmount = new BN(window.web3.utils.toWei(patron.allowedAmount))
      withdrawing = new BN(window.web3.utils.toWei(withdrawing))
      return allowedAmount.greaterThanOrEqualTo(withdrawing)
    },
    overdrafted (patron, withdrawing) {
      return {
        overdrawn: !this.isOverdrafted(patron, withdrawing)
      }
    },
    updateConversion () {
      if (!this.withdrawAmount) return
      this.convertToCurrency(this.withdrawAmount).then((convertedAmount) => {
        this.convertedAmount = convertedAmount
      })
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
        console.log('this.userAddress', this.userAddress, this.withdrawAmount)
        this.makeWithdraw({amount: this.withdrawAmount + '', optionalAddress: this.userAddress}).then((result) => {
          this.withdrawing = false
          this.submitting = false
          this.closeModal()
        }).catch(() => {
          this.withdrawing = false
          this.submitting = false
        })
      }
    },
    useAllAmount () {
      this.withdrawAmount = this.getFullAllowedAmount(this.patron.address)
    },
    useHalfAmount () {
      this.withdrawAmount = new BN(this.getFullAllowedAmount(this.patron.address) / 2 + '')
    },
    useMinAmount () {
      this.withdrawAmount = new BN('0.005').toFixed(3)
    },
    openModal (ref) {
      this.userAddress = this.patron.address
      this.setModal(ref)
    },
    closeModal () {
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
      margin: 10px auto;
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
