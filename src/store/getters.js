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
  totalBalance: state => state.totalBalance,
  totalWithdrawn: state => state.totalWithdrawn,
  sortedLogs: (state) => {
    // TODO: SORT!
    console.log('state.logs', state.logs)
    // state.logs.sort((a, b) => {
    //   console.log('a, b', a, b)
    // })

    return state.logs
  }
}
