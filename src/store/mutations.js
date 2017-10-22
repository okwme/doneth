
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
  }
}
