
export default {
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
  SET_CONVERSIONS (state, conversions) {
    state.conversions = conversions
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
  ADD_DONETH (state, contract) {
    state.Doneth = contract
  },
  ADD_ADDRESS (state, address) {
    state.address = address
  },
  ADD_MEMBER (state, member) {
    state.members.push(member)
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
  }
}
