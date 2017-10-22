import BN from 'bignumber.js'
export default {
  account: state => state.account,
  metamask: state => state.metamask,
  connected: state => state.connected,
  conversions: state => state.conversions,
  notifications: state => state.notifications,
  loading: state => state.loading,
  members: state => state.members,
  totalShares: state => state.totalShares,
  contractName: state => state.contractName,
  founder: state => state.founder,
  genesisBlock: state => state.genesisBlock,
  totalBalance: state => {
    return state.totalBalance && web3 && web3.utils && web3.utils.fromWei(state.totalBalance)
  },
  totalBalanceMinusWithdrawn: (state, getters) => {
    console.log(getters.totalBalanceRaw)
    console.log(getters.totalWithdrawn)
    let foo = new BN(getters.totalBalanceRaw).sub(new BN(getters.totalWithdrawn))
    console.log(foo.toString())
    return 0
    // return web3.utils.fromWei(foo)
  },
  totalBalanceRaw: state => state.totalBalance,
  totalWithdrawn: state => state.totalWithdrawn,
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
