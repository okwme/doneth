<template>
  <section>
    <div class="page-card transactions">
      <div class="heading">Transactions</div>
      <ul class="transactions-list">
        <li class="transaction" v-for="item in formattedTransactions">
          <template v-if="item.type === 'AddShare' || item.type === 'RemoveShare'">
            <div class="reference">
              <h3 v-if="item.type === 'AddShare'"><short-hash :hash="item.who"/> received {{item.addedShares}} new shares</h3>
              <h3 v-else><short-hash :hash="item.who"/> lost {{item.removedShares}} shares</h3>

              <h4><small>Total Shares:</small> {{item.newTotalShares}}</h4>
            </div>
            <div class="details">
              <div><a :href="transactionLink(item)">View Transaction Details</a></div>
              <div class="time">Block: {{item.block}}</div>
            </div>
          </template>
          <template v-if="item.type === 'Deposit' || item.type === 'Withdraw'">
            <div class="reference">
              <h3><short-hash :hash="item.who"/> made a {{item.type.toLowerCase()}} of {{item.valueConverted}} ETH <small>({{item.value}} WEI)</small></h3>
              <h4>Block: {{item.block}}</h4>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import ShortHash from '@/components/ShortHash'
import BN from 'bignumber.js'
import { mapGetters } from 'vuex'
export default {

  name: 'TransactionsList',
  props: ['allocations'],
  data () {
    return {
    }
  },
  methods: {
    dateTime (value) {
      if (!value) return ''
      return this.$moment(value).format('dddd, MMMM Do YYYY')
    },
    transactionLink (item) {
      return `https://etherscan.io/tx/${item.transactionHash}`
    }
  },
  computed: {
    ...mapGetters(['sortedLogs', 'members']),
    formattedTransactions () {
      return this.sortedLogs.map((a) => {
        let obj = a.returnValues
        obj.type = a.event
        obj.block = a.blockNumber
        obj.transactionHash = a.transactionHash

        if (!a.who) obj.who = a.returnValues[0]
        let member = this.members.find((m) => m.address === obj.who)
        if (member) obj.who = member.memberName
        if (obj.value) obj.valueConverted = window.web3.utils.fromWei(new BN(obj.value), 'ether')
        return obj
      })
    }
  },
  components: {
    ShortHash
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .heading {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    font-size: 14pt;
    font-weight: 500;
    padding: 10px 12px 7px;
    text-align: left;
  }

  .transactions-list {
    border-radius: 0 0 3px 3px;
  }

  .transaction {
    display: flex;
    flex-direction: column;
    padding: 10px 12px;
    text-align: left;

    &:nth-child(even) {
      background: rgba(0,0,0,0.1);
    }

    &:last-child {
      border-radius: 0 0 3px 3px;
    }
  }

  .reference,
  .details {
    display: flex;
    justify-content: space-between;
  }

  .reference {

    i {
      font-size: 12pt;
    }

    h3,
    h4 {
      margin: 5px 0 0;
    }
  }

  .details {
    font-size: 9pt;

    .time {
      text-align: right;
    }
  }
</style>
