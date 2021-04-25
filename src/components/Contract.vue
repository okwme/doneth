<template>
  <div class="contract">
    <div class="contract-header">
      <div class="contract-details">
        <h2 :class="{edit: isAdmin}" @click="openModal('modalSetContractName')">{{contractName}}</h2>
        <div class="sub-details">
          <div class=""><small>Total Available:</small> {{totalBalance}} Eth ({{totalBalanceEther}})</div>
          <div class=""><small>Created:</small> {{dateTime(timestamp)}}</div>
        </div>
      </div>

      <add-funds :address="address"/>
    </div>
    <allocation-bar :patrons="members"/>
    <div class="patron-cards">
      <expense-card class="expense-card" :address="address" v-if="totalExpense != 0" />
      <div class="patron-card" v-for="member in members" v-bind:key="member.address" >
        <patron-card :address="address" :patron="member"/>
      </div>
      <patron-form class="patron-card add-card" v-if="isAdmin" :address="address"/>
    </div>
    <administration v-if="isAdmin" />
    <embed-helper :address="address"/>
    <transactions-list :allocations="sortedLogs"/>

    <ui-modal modal-id="modalSetContractName" title="Change Contract Name">
      <form @submit.prevent="changeContractName()">
        <div class="withdraw-form">
          <div class="funds-meta">
            Note: Longer names cost more!
          </div>
          <div class="field field-address">
            <label for="add_address">Name:</label>
            <input maxLength="21" type="text" name="contract_name" v-model="newContractName" required>
          </div>
        </div>

        <div slot="footer">
          <template v-if="!submitting">
            <button class="btn btn-primary" >Submit</button>
            <button class="btn btn-secondary" @click.prevent="closeModal()">Cancel</button>
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
import AddFunds from '@/components/AddFunds'
import AllocationBar from '@/components/AllocationBar'
import Administration from '@/components/Administration'
import EmbedHelper from '@/components/EmbedHelper'
import ExpenseCard from '@/components/ExpenseCard'
import PatronCard from '@/components/PatronCard'
import PatronForm from '@/components/PatronForm'
import ShortHash from '@/components/ShortHash'
import SectionHeader from '@/components/SectionHeader'
import TransactionsList from '@/components/TransactionsList'
import UiModal from '@/components/UiModal'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {

  name: 'Contract',
  props: ['address'],
  data () {
    return {
      createdAt: 1508639178669,
      timestamp: null,
      totalBalanceEther: 0,
      newContractName: '',
      submitting: false
    }
  },
  computed: {
    ...mapGetters(['metamask', 'members', 'contractName', 'sortedLogs', 'totalBalance', 'totalBalanceRaw', 'currency', 'account', 'isAdmin', 'totalExpense'])
  },
  async mounted () {
    this.connect()
    setTimeout(() => {
      this.deployDoneth(this.address)
      this.getCreatedAt()
      this.convertTotalBalance()
    }, 1000)
  },
  watch: {
    depositAmount () {
      this.convertToCurrency(this.depositAmount).then((amount) => {
        this.convertedAmount = amount
      })
    },
    totalBalanceRaw () {
      this.convertTotalBalance()
    },
    currency () {
      this.convertTotalBalance()
    }
  },
  methods: {
    ...mapMutations({setModal: 'SET_MODAL'}),
    ...mapActions(['deployDoneth', 'makeDeposit', 'convertToCurrency', 'convertFromCurrency', 'updateContractName', 'connect']),
    convertTotalBalance () {
      if (!this.totalBalance) return
      this.convertToCurrency(this.totalBalance).then((amount) => {
        this.totalBalanceEther = amount
      })
    },
    dateTime (value) {
      if (!value) return ''
      return this.$moment(value).format('dddd, MMMM Do YYYY')
    },
    getCreatedAt () {
      if (!this.sortedLogs || this.sortedLogs.length <= 0 || !this.sortedLogs[0] || !this.sortedLogs[0].blockNumber) {
        // NOTE: Added only for demo so no missing data :/
        this.timestamp = (+new Date())
        return
      }
      window.web3.eth.getBlock(this.sortedLogs[0].blockNumber)
      .then((res) => {
        if (res && res.timestamp) this.timestamp = res.timestamp * 1000
      })
    },
    changeContractName () {
      if (!this.isAdmin) return
      this.submitting = true
      this.updateContractName(this.newContractName)
    },
    openModal (ref) {
      this.newContractName = this.contractName
      this.submitting = false
      this.setModal(ref)
    },
    closeModal () {
      this.submitting = false
      this.setModal(false)
    }
  },
  components: {
    AddFunds,
    AllocationBar,
    Administration,
    EmbedHelper,
    ExpenseCard,
    PatronCard,
    PatronForm,
    SectionHeader,
    ShortHash,
    TransactionsList,
    UiModal
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .contract-header {
    display: flex;
    width: $page-content-width;
    margin: 20px auto 0;

    h2 {
      font-size: 16pt;
      margin: 0;
      padding: 0;

      &:after {
        opacity: .3;
      }

      &:hover:after {
        opacity: 1;
      }
    }
  }

  .contract-details {
    flex: 1;
    text-align: left;
  }

  .contract-cta {
    margin: 0;
    display: flex;
    flex: 1;
    justify-content: flex-end;

    .btn {
      width: 200px;
      margin: auto 0;
      padding: 10px 0 6px;
    }
  }

  .patron-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 20px auto 30px;
    width: 820px;
  }

  .patron-card,
  .expense-card {
    background: $white;
    border-radius: $border-radius;
    box-shadow: 0 1px 10px -2px rgba(0,0,0,0.1);
    overflow: hidden;
    margin: 0 10px 20px;
    width: calc(33% - 18px);
  }

  .patron-card {
    transition: all 220ms ease;

    &:hover {
      box-shadow: 0 1px 20px -2px rgba(0,0,0,0.3);
    }
  }

  .add-card {
    border: 4px dashed $lightgrey;
    margin: 0 6px 20px;

    &:hover {
      border-color: $primary;
    }
  }
</style>
