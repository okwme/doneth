
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
  ADD_ADDRESS (state, address) {
    state.address = address
  },
  ADD_MEMBER (state, member) {
    state.members.push(member)
  },
  ADD_LOGS (state, logs) {
    state.sortedLogs.push(...logs)
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
  SET_CURRENCY (state, currency) {
    state.currency = currency
  },
  SET_BALANCE (state, totalBalance) {
    state.totalBalance = totalBalance
  },
  UPDATE_MEMBER_AMOUNT (state, {amount, address}) {
    console.log('update????', address)
    let memberKey = state.members.findIndex((member) => member.address === address)
    console.log(memberKey)
    if (memberKey > -1) {
      let member = state.members[memberKey]
      member.allowedAmount = amount
      console.log(member)
      state.members.splice(memberKey, 1, member)
      console.log(state.members[memberKey])
    }
  }
}
