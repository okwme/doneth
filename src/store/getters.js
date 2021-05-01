import utils from 'web3-utils'

import { BigFloat } from "bigfloat.js";
const BN = BigFloat;

export default {
  account: state => state.account,
  metamask: state => state.metamask,
  connected: state => state.connected,
  conversions: state => state.conversions,
  currenciesArray: state => state.currenciesArray,
  notifications: state => state.notifications,
  loading: state => state.loading,
  members: state => state.members,
  totalShares: state => state.totalShares,
  contractName: state => state.contractName,
  founder: state => state.founder,
  genesisBlock: state => state.genesisBlock,
  totalBalance: state => {
    return state.totalBalance && utils.fromWei(state.totalBalance.toString())
  },
  totalBalanceRaw: state => state.totalBalance,
  totalWithdrawn: state => state.totalWithdrawn,
  totalExpense: state => new BN(state.totalExpense),
  totalExpenseWithdrawn: state => new BN(state.totalExpenseWithdrawn),
  logs: state => state.logs,
  currency: state => state.currency,
  sortedLogs: (state) => {
    return state.logs.sort((a, b) => {
      return b.blockNumber - a.blockNumber
    })
  },
  isAdmin: (state) => {
    let me = state.members.find((member) => member.address.toLowerCase() === state.account.toLowerCase())
    if (!me) return false
    return me.admin
  }
}
