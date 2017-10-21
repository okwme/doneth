// import BN from 'bignumber.js'
import Web3 from 'web3'

// const ProviderEngine = require('web3-provider-engine/index.js')
const ZeroClientProvider = require('web3-provider-engine/zero.js')

export default {
  connectt ({commit, state, dispatch}) {
    let web3Provider = false
    if (web3) {
      web3Provider = web3.currentProvider
    } else if (!state.retried) {
      commit('SET_RETRY', true)
      setTimeout(() => {
        dispatch('connect')
      }, 1000)
    } else {
      commit('SET_METAMASK', false)
      web3Provider = ZeroClientProvider({
        getAccounts: function () {},
        rpcUrl: 'https://rinkeby.infura.io/Q5I7AA6unRLULsLTYd6d'
      })
    }
    if (web3Provider) {
      web3 = new Web3(web3Provider)
      let wrongNetwork = false
      web3.version.getNetwork((err, netId) => {
        console.log(netId)
        if (!err) {
          switch (netId) {
            case '3':
            case '4':
            case '666':
              break
            default:
              wrongNetwork = true
          }
        }
        if (!wrongNetwork) {
          dispatch('setAccountInterval')
        }
      })
    }
  },
  setAccountInterval (dispatch) {
    dispatch('checkAccount')
    setInterval(() => {
      dispatch('checkAccount')
    }, 3000)
  },
  checkAccount (commit) {
    web3.eth.getAccounts((error, accounts) => {
      if (error) throw new Error(error)
      if (accounts.length && this.account !== accounts[0]) {
        commit('SET_ACCOUNT', accounts[0])
      }
    })
  }
}
