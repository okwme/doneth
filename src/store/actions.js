// import BN from 'bignumber.js'
import Web3 from 'web3'
// const ProviderEngine = require('web3-provider-engine/index.js')
const ZeroClientProvider = require('web3-provider-engine/zero.js')

export default {
  connect ({commit, state, dispatch}) {
    console.log('connect')
    let web3Provider = false
    if (typeof web3 !== 'undefined') {
      console.log('yes web 3')
      web3Provider = web3.currentProvider
      commit('SET_METAMASK', true)
    } else if (!state.retried) {
      console.log('not retried')
      commit('SET_RETRY', true)
      setTimeout(() => {
        dispatch('connect')
      }, 1000)
    } else {
      console.log('no metamask')
      web3Provider = ZeroClientProvider({
        getAccounts: function () {},
        rpcUrl: 'https://rinkeby.infura.io/Q5I7AA6unRLULsLTYd6d'
      })
    }
    if (web3Provider) {
      web3 = new Web3(web3Provider)
      let wrongNetwork = false
      web3.eth.net.getId((err, netId) => {
        console.log(netId)
        if (!err) {
          switch (netId) {
            case 3:
            case 4:
            case 666:
              break
            default:
              wrongNetwork = true
          }
        }
        console.log(wrongNetwork)
        if (!wrongNetwork) {
          dispatch('setAccountInterval')
        }
      })
    }
  },
  setAccountInterval ({dispatch}) {
    console.log('setAccountInterval')
    dispatch('checkAccount')
    setInterval(() => {
      dispatch('checkAccount')
    }, 3000)
  },
  checkAccount ({commit}) {
    web3.eth.getAccounts((error, accounts) => {
      if (error) throw new Error(error)
      if (accounts.length && this.account !== accounts[0]) {
        commit('SET_ACCOUNT', accounts[0])
      }
    })
  }
}
