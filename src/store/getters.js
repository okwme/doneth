
export default {
  account: state => state.account,
  metamask: state => state.metamask,
  connected: state => state.connected,
  conversions: state => state.conversions,
  currenciesArray: state => state.currenciesArray,
  notifications: state => state.notifications,
  loading: state => state.loading,
  members: state => {
    console.log(state.logs)
    return state.members
  },
  totalShares: state => state.totalShares,
  contractName: state => state.contractName,
  founder: state => state.founder,
  genesisBlock: state => state.genesisBlock,
  totalBalance: state => {
    return state.totalBalance && window.web3 && window.web3.utils && window.web3.utils.fromWei(state.totalBalance)
  },
  totalBalanceRaw: state => state.totalBalance,
  totalWithdrawn: state => state.totalWithdrawn,
  totalExpense: state => state.totalExpense,
  totalExpenseWithdrawn: state => state.totalExpenseWithdrawn,
  logs: state => state.logs,
  currency: state => state.currency,
  sortedLogs: (state) => {
    return state.logs.sort((a, b) => {
      return b.blockNumber - a.blockNumber
    })
  },
  isAdmin: (state) => {
    let me = state.members.find((member) => member.address === state.account)
    if (!me) return false
    return me.admin
  }
}
