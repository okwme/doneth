<template>
  <section>
    <div class="page-card transactions">
      <div class="heading">Transactions</div>
      <ul class="transactions-list">
        <li class="transaction" v-for="item in transactions">
          <div class="reference">
            <h3>{{item.sender.firstName}}<small>(owner)</small> allocated {{item.transaction.sharesIssued}} new shares to {{item.receiver.firstName}}<small>(patron)</small></h3>
            <h4><small>Shares:</small> {{item.transaction.sharesIssued}}/{{item.transaction.sharesTotal}}</h4>
          </div>
          <div class="details">
            <div><short-hash :hash="item.sender.address"/> allocated {{item.transaction.sharesIssued}} new shares to <short-hash :hash="item.receiver.address"/></div>
            <div class="time">{{dateTime(item.transaction.createdAt)}}</div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import ShortHash from '@/components/ShortHash'
export default {

  name: 'TransactionsList',
  // props: ['allocations'],
  data () {
    return {
      transactions: [{
        sender: {
          address: '0x0000000000000000000000000000000000000',
          firstName: 'Billy'
        },
        receiver: {
          address: '0x0000000000000000000000000000000000001',
          firstName: 'Trevor'
        },
        transaction: {
          address: '0x000000000000000000000000000000000000123',
          createdAt: 1508639178665,
          sharesIssued: 1234,
          sharesTotal: 100001234
        }
      }, {
        sender: {
          address: '0x0000000000000000000000000000000000000',
          firstName: 'Billy'
        },
        receiver: {
          address: '0x0000000000000000000000000000000000004',
          firstName: 'Tim'
        },
        transaction: {
          address: '0x000000000000000000000000000000000000123',
          createdAt: 1508639178669,
          sharesIssued: 4435,
          sharesTotal: 100005669
        }
      }, {
        sender: {
          address: '0x0000000000000000000000000000000000000',
          firstName: 'Billy'
        },
        receiver: {
          address: '0x0000000000000000000000000000000000004',
          firstName: 'Tim'
        },
        transaction: {
          address: '0x000000000000000000000000000000000000123',
          createdAt: 1508639178669,
          sharesIssued: 4435,
          sharesTotal: 100005669
        }
      }]
    }
  },
  methods: {
    dateTime (value) {
      if (!value) return ''
      return this.$moment(value).format('dddd, MMMM Do YYYY')
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
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding-bottom: 5px;
    margin-bottom: 5px;

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
