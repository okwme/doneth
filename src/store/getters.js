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
  totalBalanceRaw: state => state.totalBalance,
  totalWithdrawn: state => state.totalWithdrawn,
  logs: state => state.logs,
  currency: state => state.currency,
  sortedLogs: (state) => state.sortedLogs
}
