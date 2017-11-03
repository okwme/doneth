<template>
  <div>
    <button @click="openModal('modalWithdrawFunds')" class="btn btn-primary">Withdraw Funds</button>

    <ui-modal ref="modalWithdrawFunds" title="Withdraw Funds">
      <div class="withdraw-form">
        <div class="funds-meta">
          You have 0.1 ETH available to withraw
        </div>
        <!-- <div class="funds-options">
          <button class="btn btn-primary btn-outlined">All</button>
          <button class="btn btn-primary btn-outlined">Half</button>
          <button class="btn btn-primary btn-outlined">Min</button>
        </div> -->
        <div class="fields">
          <label for="">ETH</label>
          <input :class="overdrafted(patron, withdrawAmount)" class="center" type="number" placeholder="Amount (ETH)" v-model="withdrawAmount">
          <label for="">USD</label>
          <input readOnly="true" class="center" type="text" :value="convertedAmount">
        </div>
        <p>Optionally send to different address:</p>
        <div class="field field-address">
          <label for="add_address">Address:</label>
          <input maxLength="42" type="text" name="add_address" v-model="userAddress" placeholder="0x0000000000000" required>
        </div>
      </div>

      <div slot="footer">
        <template v-if="!submitting">
          <button class="btn btn-secondary" @click="closeModal('modalAddMember')">Cancel</button>
          <button class="btn btn-primary" name="button" @click="addNewMember()">Submit</button>
        </template>
        <template v-if="submitting">
          <button class="btn btn-primary">Sending...</button>
        </template>
      </div>
    </ui-modal>
  </div>
</template>

<script>
import UiModal from '@/components/UiModal'
import BN from 'bignumber.js'
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'PatronWithdrawForm',
  props: ['patron'],
  data () {
    return {
      withdrawAmount: 0,
      convertedAmount: 0,
      withdrawing: false,
      withdrawer: 0,
      submitting: false
    }
  },
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    ...mapActions(['convertToCurrency', 'makeWithdraw', 'addNotification']),
    isOverdrafted (patron, withdrawing) {
      if (isNaN(withdrawing) || isNaN(patron.allowedAmount)) return false
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
      this.withdrawer = null
    },
    withdraw (patron) {
      if (this.withdrawing) {
        this.makeWithdraw(this.withdrawAmount).then((result) => {
          this.withdrawing = false
        }).catch(() => {
          this.withdrawing = false
        })
      } else {
        this.withdrawer = patron.address
        this.withdrawing = true
      }
    },
    openModal (ref) {
      this.$refs[ref].open()
    },
    closeModal (ref) {
      this.$refs[ref].close()
    }
  },
  components: {
    UiModal
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .withdraw-form {

    .fields {
      margin: 10px auto;
      width: 95%;

      input {
        text-align: right;
        width: calc(50% - 10px);

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
</style>
