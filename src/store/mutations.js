import Vue from 'vue'
import utils from 'web3-utils'
import { BigFloat } from "bigfloat.js";
const BN = BigFloat;

export default {
  SET_MODAL (state, isOpen) {
    state.modalOpen = isOpen
  },
  SET_EDIT_MEMBER (state, member) {
    state.editMember = member
  },
  SET_LOADING (state, isLoading) {
    state.loading = isLoading
  },
  SET_ACCOUNT (state, account) {
    state.account = account
  },
  SET_METAMASK (state, isPresent) {
    state.metamask = isPresent
  },
  SET_RETRY (state, haveRetried) {
    state.retried = haveRetried
  },
  SET_CONNECTED (state, isConnected) {
    state.connected = isConnected
  },
  SET_CONVERSION (state, {symbol, amount}) {
    let conversions = state.conversions
    conversions[symbol] = amount
    Vue.set(state, 'conversions', conversions)
  },
  ADD_MSG (state, msg) {
    state.notifications.push(msg)
  },
  REMOVE_MSG (state, id) {
    let key = state.notifications.findIndex((msg) => msg.id === id)
    if (key > -1) {
      state.notifications.splice(key, 1)
    }
  },
  CLEAR_CONTRACT (state) {
    state.logs = []
    state.Doneth = null
    state.address = null
    state.members = []
    state.totalShares = 0
    state.contractName = null
    state.founder = null
    state.genesisBlock = 0
    state.totalWithdrawn = 0
    state.totalBalance = 0
  },
  ADD_DONETH (state, contract) {
    state.Doneth = contract
  },
  SET_NETWORK (state, network) {
    state.network = Number(network, 16).toString(10)
  },
  ADD_ADDRESS (state, address) {
    state.address = address
  },
  ADD_MEMBER (state, member) {
    let memberKey = state.members.findIndex((m) => m.address.toLowerCase() === member.address.toLowerCase())
    if (memberKey > -1) {
      state.members.splice(memberKey, 1, member)
    } else {
      state.members.push(member)
    }
  },
  CLEAR_LOGS (state) {
    state.logs = []
  },
  ADD_LOGS (state, logs) {
    state.logs.push(...logs)
  },
  SET_SHARES (state, totalShares) {
    state.totalShares = totalShares
  },
  SET_NAME (state, name) {
    state.contractName = name
  },
  SET_FOUNDER (state, founder) {
    state.founder = founder
  },
  SET_BLOCK (state, genesisBlock) {
    state.genesisBlock = genesisBlock
  },
  SET_WITHDRAWN (state, totalWithdrawn) {
    state.totalWithdrawn = totalWithdrawn
  },
  SET_EXPENSE (state, totalExpense) {
    state.totalExpense = totalExpense
  },
  ADD_EXPENSEWITHDRAWN (state, expenseWithdrawn) {
    state.totalExpenseWithdrawn = new BN(this.state.totalExpenseWithdrawn).add(new BN(expenseWithdrawn)).toString()
  },
  SET_EXPENSEWITHDRAWN (state, totalExpenseWithdrawn) {
    state.totalExpenseWithdrawn = totalExpenseWithdrawn
  },
  SET_CURRENCY (state, currency) {
    state.currency = currency
  },
  SET_BALANCE (state, totalBalance) {
    state.totalBalance = totalBalance
  },
  UPDATE_MEMBER_SHARES (state, {amount, address}) {
    let memberKey = state.members.findIndex((member) => member.address.toLowerCase() === address.toLowerCase())
    if (memberKey > -1) {
      let member = state.members[memberKey]
      member.shares = parseInt(amount)
      state.members.splice(memberKey, 1, member)
    }
  },
  UPDATE_MEMBER_WITHDRAWN (state, {amount, address}) {
    let memberKey = state.members.findIndex((member) => member.address.toLowerCase() === address.toLowerCase())
    if (memberKey > -1) {
      let member = state.members[memberKey]
      member.withdrawn = new BN(member.withdrawn).add(new BN(amount)).toString()
      state.members.splice(memberKey, 1, member)
    }
  },
  UPDATE_LAST_CONVERTED (state, time) {
    state.lastCalledCurrency = time
  },
  UPDATE_MEMBER_AMOUNT (state, {amount, address}) {
    let memberKey = state.members.findIndex((member) => member.address.toLowerCase() === address.toLowerCase())
    console.log({memberKey})
    if (memberKey > -1) {
      let member = state.members[memberKey]
      let remaining = new BN(amount).sub(new BN(member.withdrawn))
      let wei = new BN(utils.fromWei(remaining.toString())).toString()
      member.allowedAmount = wei
      state.members.splice(memberKey, 1, member)
    }
  }
}
