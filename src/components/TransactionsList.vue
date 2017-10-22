<template>
  <section>
    <div class="page-card transactions">
      <div class="heading">Transactions</div>
      <ul class="transactions-list">
        <li class="transaction" v-for="item in formattedTransactions">
          <template v-if="item.type === 'AddShare'">
            <div class="reference">
              <h3><short-hash :hash="item.who"/> received {{item.addedShares}} new shares</h3>
              <h4><small>Shares:</small> {{item.addedShares}}/{{item.newTotalShares}}</h4>
            </div>
            <div class="details">
              <div></div>
              <div class="time">Block: {{item.block}}</div>
            </div>
          </template>
          <template v-if="item.type === 'Deposit' || item.type === 'Withdraw'">
            <div class="reference">
              <h3><short-hash :hash="item.who"/> donated {{item.valueConverted}} ETH <small>({{item.value}} WEI)</small></h3>
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
    }
  },
  computed: {
    formattedTransactions () {
      return this.allocations.map((a) => {
        let obj = a.returnValues
        obj.type = a.event
        obj.block = a.blockNumber

        if (!a.who) obj.who = a.address
        console.log(a.value)
        if (obj.value) obj.valueConverted = web3.utils.fromWei(new BN(obj.value), 'ether')
        console.log('------------------obj', obj.value, obj.valueConverted)
        return obj
      }).reverse()
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
