<template>
  <div
  v-on:mouseenter="toggleActive(patron, true)" v-on:mouseleave="toggleActive(patron, false)">
    <div class="user">
      <div class="avatar" :style="{ background: colorHex(patron) }">
        <div>{{firstName(patron)}}</div>
      </div>
      <div class="attributes">
        <h3  :class="{edit: isAdmin}"  @click="editMember(patron)">{{patron.memberName || 'FirstName'}}</h3>
        <short-hash :hash="patron.address || '0x0000000000000'"/>
      </div>
    </div>
    <hr class="divider" :style="{ background: colorHex(patron) }">
    <div class="meta">
      <div class="meta-item">
        <span>Available: <strong>{{patron.allowedAmount || 0}} ETH</strong></span>
        <span>Shares: <strong>{{patron.shares}}/{{totalShares}}</strong></span>
      </div>
      <div class="meta-item">
        <span>Alloted: <strong>{{alloted(patron)}}</strong></span>
        <span>Used: <strong>{{fromWei(patron.withdrawn) || 0}}</strong></span>
      </div>
    </div>

    <patron-withdraw-form v-if="patron.address === account" :patron="patron" />
  </div>
</template>

<script>
import ShortHash from '@/components/ShortHash'
import PatronWithdrawForm from '@/components/PatronWithdrawForm'
import { mapGetters, mapMutations } from 'vuex'
import BN from 'bignumber.js'
import utils from 'web3-utils'
export default {

  name: 'PatronCard',

  props: ['address', 'patron'],

  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['account', 'totalShares', 'members', 'isAdmin', 'totalBalance', 'totalWithdrawn', 'totalExpense', 'totalExpenseWithdrawn', 'totalShares'])
  },
  methods: {
    ...mapMutations({setModal: 'SET_MODAL', setEditMember: 'SET_EDIT_MEMBER'}),
    editMember (patron) {
      if (!this.isAdmin) return
      this.setModal('modalAddMember')
      this.setEditMember(patron)
    },
    fromWei (amount) {
      return utils.fromWei(amount.toString())
    },
    alloted (patron) {
      return new BN(this.totalBalance)
      .add(this.fromWei(this.totalWithdrawn))
      .sub(this.fromWei(this.totalExpense))
      .add(this.totalExpenseWithdrawn)
      .div(this.totalShares)
      .mul(patron.shares).toString()
    },
    getAllowedAmount (address) {
      let patron = this.members.find((p) => p.address === address)
      if (!patron || !patron.allowedAmount) return 0
      return new BN(patron.allowedAmount).toFixed(4)
    },
    firstName (patron) {
      let initial = (patron && patron.memberName) ? patron.memberName.substring(0, 2) : '0x'
      return initial.toUpperCase()
    },
    colorHex (patron) {
      return (patron && patron.address) ? `#${patron.address.slice(-6)}` : '#CCCCCC'
    },
    percentage (patron) {
      let num = parseInt(this.totalShares, 10)
      if (num === 0) {
        this.members.map((p) => {
          if (p && p.shares && !isNaN(parseInt(p.shares, 10))) {
            num += parseInt(p.shares, 10)
          }
        })
      }
      return Math.round((parseInt(patron.shares, 10) * 100) / num) + '%'
    },
    toggleActive: function (patron, bool) {
      // TODO: Come back when not confused :)
      // patron.active = (typeof bool === 'undefined') ? true : bool
      // this.$emit('activemember')
    }
  },
  components: {
    PatronWithdrawForm,
    ShortHash
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

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
</style>
