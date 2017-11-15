<template>
  <section>
    <div class="page-card transactions">
      <div class="heading">Transactions</div>
      <ul class="transactions-list">
        <li class="transaction" v-for="item in formattedTransactions">

          <template v-if="item.type === 'AddShare' || item.type === 'RemoveShare'">
            <div class="reference">
              <h3 v-if="item.type === 'AddShare'">
                <short-hash :hash="item.who"/> received {{item.addedShares}} new shares</h3>
              <h3 v-else>
                <short-hash :hash="item.who"/> lost {{item.removedShares}} shares</h3>
              <h4><small>Total Shares:</small> {{item.newTotalShares}}</h4>
            </div>
            <div class="details">
              <div><a :href="transactionLink(item)">View Transaction Details</a></div>
              <div class="time">Block: {{item.block}}</div>
            </div>
          </template>

          <template v-else-if="item.type === 'Deposit' || item.type === 'Withdraw'">
            <div class="reference">
              <h3><short-hash :hash="item.who"/> made a {{item.type.toLowerCase()}} of {{item.valueConverted}} ETH <small>({{item.value}} WEI)</small></h3>
            </div>

            <div class="details">
              <div><a :href="transactionLink(item)">View Transaction Details</a></div>
              <div class="time">Block: {{item.block}}</div>
            </div>
          </template>

          <template v-else-if="item.type === 'WithdrawSharedExpense'">
            <div class="reference">
              <h3><short-hash :hash="item.who"/> made a Shared Expense Withdraw of {{item.valueConverted}} ETH to <short-hash :hash="item.to"/></h3>
            </div>
            <div class="details">
              <div><a :href="transactionLink(item)">View Transaction Details</a></div>
              <div class="time">Block: {{item.block}}</div>
            </div>
          </template>

          <template v-else-if="item.type === 'ChangeSharedExpense'">
            <div class="reference">
              <h3>The Shared Expense Amount changed from {{item.oldValueConverted}} ETH to {{item.newValueConverted}}  ETH</small></h3>
            </div>
            <div class="details">
              <div><a :href="transactionLink(item)">View Transaction Details</a></div>
              <div class="time">Block: {{item.block}}</div>
            </div>
          </template>

          <template v-else-if="item.type === 'ChangePrivilege'">
            <div class="reference">
              <h3><short-hash :hash="item.who"/>'s admin privilege was changed to {{item.newValue ? 'true' : 'false'}}</h3>
            </div>
            <div class="details">
              <div><a :href="transactionLink(item)">View Transaction Details</a></div>
              <div class="time">Block: {{item.block}}</div>
            </div>
          </template>

          <template v-else-if="item.type === 'ChangeMemberName'">
            <div class="reference">
              <h3><short-hash :hash="item.who"/>'s name changed from {{item.oldValue }} to {{item.newValue }}</h3>
            </div>
            <div class="details">
              <div><a :href="transactionLink(item)">View Transaction Details</a></div>
              <div class="time">Block: {{item.block}}</div>
            </div>
          </template>

          <template v-else-if="item.type === 'ChangeContractName'">
            <div class="reference">
              <h3>Contract name changed from {{item.oldValue }} to {{item.newValue }}</h3>
            </div>
            <div class="details">
              <div><a :href="transactionLink(item)">View Transaction Details</a></div>
              <div class="time">Block: {{item.block}}</div>
            </div>
          </template>

          <template v-else>
            <pre>{{item}}</pre>
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
import utils from 'web3-utils'
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

        obj.who = a.returnValues.from || (!isNaN(a.returnValues[0]) && a.returnValues[0])
        let member = this.members.find((m) => m.address === obj.who)
        if (member) obj.who = member.memberName

        obj.to = a.returnValues.to
        let to = this.members.find((m) => m.address === obj.to)
        if (to) obj.to = to.memberName

        if (obj.value) obj.valueConverted = utils.fromWei(new BN(obj.value), 'ether')

        if (obj.oldValue && typeof (obj.oldValue) === 'number') {
          obj.oldValueConverted = utils.fromWei(new BN(obj.oldValue), 'ether')
        }

        if (obj.newValue && typeof (obj.newValue) === 'number') {
          obj.newValueConverted = utils.fromWei(new BN(obj.newValue), 'ether')
        }
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
