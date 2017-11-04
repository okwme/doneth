// import BN from 'bignumber.js'
import Web3 from 'web3'
import axios from 'axios'
import BN from 'bignumber.js'
// const ProviderEngine = require('web3-provider-engine/index.js')
const ZeroClientProvider = require('web3-provider-engine/zero.js')
export default {
  connect ({commit, state, dispatch}) {
    commit('SET_LOADING', true)
    let web3Provider = false
    if (typeof window.web3 !== 'undefined') {
      web3Provider = window.web3.currentProvider
      commit('SET_METAMASK', true)
    } else if (!state.retried) {
      commit('SET_RETRY', true)
      setTimeout(() => {
        dispatch('connect')
      }, 1000)
    } else {
      web3Provider = ZeroClientProvider({
        getAccounts: function () {},
        rpcUrl: 'https://rinkeby.infura.io/Q5I7AA6unRLULsLTYd6d'
      })
    }
    if (web3Provider) {
      window.web3 = new Web3(web3Provider)
      commit('SET_LOADING', false)
      commit('SET_CONNECTED', true)
      // let wrongNetwork = false
      // web3.eth.net.getId((err, netId) => {
      //   if (!err) {
      //     switch (netId) {
      //       case 1:
      //       case 3:
      //       case 4:
      //       case 666:
      //         break
      //       default:
      //         wrongNetwork = true
      //     }
      //   }
        // if (!wrongNetwork) {
      dispatch('setAccountInterval')
        // }
      // })
    }
  },
  setAccountInterval ({dispatch}) {
    dispatch('checkAccount')
    setInterval(() => {
      dispatch('checkAccount')
    }, 3000)
  },
  checkAccount ({commit, state}) {
    window.web3.eth.getAccounts((error, accounts) => {
      if (error) console.error(error)
      if (state.account !== accounts[0]) {
        commit('SET_ACCOUNT', accounts[0])
      } else if (!accounts.length) {
        commit('SET_ACCOUNT', null)
      }
    })
  },
  // getConversions ({commit, dispatch}) {
  //   dispatch('getConversion', 0)
  //   const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD,EUR,GBP,CNY,JPY'
  //   axios.get(url).then((resp) => {
  //     commit('SET_CONVERSIONS', resp.data.ETH)
  //   })
  // },
  getConversion ({commit, dispatch, getters}, currencyKey) {
    if (currencyKey > getters.currenciesArray.length - 1) return
    let currency = getters.currenciesArray[currencyKey]
    let url = 'https://api.infura.io/v1/ticker/eth' + currency.toLowerCase()
    axios.get(url).then((resp) => {
      commit('SET_CONVERSION', {symbol: currency, amount: resp.data.bid})
      dispatch('getConversion', currencyKey + 1)
    })
  },
  addNotification ({commit}, msg) {
    let id = new Date().getTime()
    msg.id = id
    commit('ADD_MSG', msg)
    if (!msg.noKill) {
      setTimeout(() => {
        commit('REMOVE_MSG', id)
      }, msg.timeout || 2000)
    }
    return id
  },
  removeNotification ({commit}, id) {
    commit('REMOVE_MSG', id)
  },
  setLoading ({commit}, isLoading) {
    commit('SET_LOADING', isLoading)
  },
  deployDoneth ({dispatch, commit, state}, address) {
    if (state.connected) {
      commit('CLEAR_CONTRACT')
      commit('ADD_ADDRESS', address)
      commit('ADD_DONETH', new window.web3.eth.Contract(state.abi.abi, state.address))
      dispatch('populateContractData')
    } else {
      setTimeout(() => {
        dispatch('deployDoneth', address)
      }, 500)
    }
  },
  populateContractData ({dispatch}) {
    dispatch('pollMembers').then(() => {
      return dispatch('pollAllowedAmounts')
    })
    dispatch('getContractInfo')
    dispatch('readLogs')
    dispatch('pollSharedExpense')
    dispatch('pollSharedExpenseWithdrawn')
  },
  getContractInfo ({state, commit}) {
    state.Doneth.methods.genesisBlockNumber().call().then((genesisBlockNumber) => {
      commit('SET_BLOCK', genesisBlockNumber)
    })
    console.log(state.Doneth)
    // state.Doneth.methods.totalShares({}).call().then((totalShares) => {
    //   console.log(totalShares)
    //   commit('SET_SHARES', totalShares)
    // })
    state.Doneth.methods.name().call().then((name) => {
      commit('SET_NAME', name)
    })
    state.Doneth.methods.getFounder().call().then((founder) => {
      commit('SET_FOUNDER', founder)
    })
    state.Doneth.methods.totalWithdrawn().call().then((totalWithdrawn) => {
      commit('SET_WITHDRAWN', totalWithdrawn)
    })
    state.Doneth.methods.getBalance().call().then((totalBalance) => {
      commit('SET_BALANCE', totalBalance)
    })
  },
  readLogs ({dispatch, state, commit}) {
    commit('CLEAR_LOGS')
    state.Doneth.getPastEvents('AddShare', {
      fromBlock: state.genesisBlock,
      toBlock: 'latest'
    })
    .then((results) => {
      commit('ADD_LOGS', results)
    })

    state.Doneth.getPastEvents('RemoveShare', {
      fromBlock: state.genesisBlock,
      toBlock: 'latest'
    })
    .then((results) => {
      commit('ADD_LOGS', results)
    })

    state.Doneth.getPastEvents('Deposit', {
      fromBlock: state.genesisBlock,
      toBlock: 'latest'
    })
    .then((results) => {
      commit('ADD_LOGS', results)
    })

    state.Doneth.getPastEvents('Withdraw', {
      fromBlock: state.genesisBlock,
      toBlock: 'latest'
    })
    .then((results) => {
      commit('ADD_LOGS', results)
    })
  },
  pollAllowedAmounts ({dispatch, state}) {
    return dispatch('pollAllowedAmount', 0)
  },
  pollAllowedAmount ({dispatch, state, commit}, i) {
    if (i >= state.members.length) return
    return dispatch('getAllowed', state.members[i].address).then((result) => {
      return dispatch('pollAllowedAmount', i + 1)
    })
  },
  pollMembers ({dispatch, state}) {
    return state.Doneth.methods.getMemberCount().call().then((count) => {
      return dispatch('pollMember', {i: 0, length: parseInt(count)})
    })
  },
  pollMember ({dispatch, state, commit}, data) {
    return state.Doneth.methods.getMemberAtKey(new BN(data.i)).call()
      .then((address) => {
        return state.Doneth.methods.returnMember(address).call()
        .then(({active, admin, shares, withdrawn, memberName}) => {
          commit('ADD_MEMBER', {address, active, admin, shares, withdrawn, memberName})
          if (data.i + 1 < data.length) {
            return dispatch('pollMember', {i: data.i + 1, length: data.length})
          }
        })
      })
  },
  pollSharedExpense ({state, commit}) {
    return state.Doneth.methods.getSharedExpense().call().then((amount) => {
      commit('SET_EXPENSE', amount)
    })
  },
  pollSharedExpenseWithdrawn ({state, commit}) {
    return state.Doneth.methods.getSharedExpenseWithdrawn().call().then((amount) => {
      commit('SET_EXPENSEWITHDRAWN', amount)
    })
  },

  allocateShares ({state, dispatch, commit}, {address, amount}) {
    dispatch('setLoading', true)
    return state.Doneth.methods.addShare(address, new BN(amount)).send({from: state.account}).then((result) => {
      dispatch('readLogs')
      dispatch('addNotification', {class: 'success', text: 'New Shares Allocated 🎉'})
      commit('UPDATE_MEMBER_SHARES', {amount, address})
      dispatch('setLoading', false)
      dispatch('getContractInfo')
      dispatch('pollAllowedAmounts')
    }).catch((error) => {
      console.error(error)
      dispatch('setLoading', false)
      dispatch('addNotification', {class: 'error', text: 'Unknown Error, check logs'})
    })
  },
  addMember ({state, dispatch, commit}, member) {
    return new Promise((resolve, reject) => {
      let currentUser = state.members.find((member) => {
        return member.address === state.account
      })
      if (!currentUser || !currentUser.admin) {
        reject(new Error('Not an Admin'))
      } else {
        dispatch('setLoading', true)
        return state.Doneth.methods.addMember(member.userAddress, new BN(member.sharesTotal), false, member.firstName).send({from: state.account})
        .on('transactionHash', (hash) => {
        })
        .on('error', (error) => {
          console.error(error)
          dispatch('setLoading', false)
          reject(error)
        })
        .then((result) => {
          dispatch('readLogs')
          dispatch('getContractInfo')
          dispatch('pollAllowedAmounts')
          dispatch('setLoading', false)
          dispatch('addNotification', {
            text: 'Member added successfully!',
            class: 'success'
          })
          dispatch('pollMember', {i: state.members.length, length: state.members + 1})
          resolve()
        })
      }
    })
  },
  setCurrency ({commit}, currency) {
    commit('SET_CURRENCY', currency)
  },
  convertToCurrency ({state}, eth) {
    if (isNaN(eth)) return 0
    if (!eth) return 0
    let conversion = state.conversions[state.currency]
    if (!conversion) return 0
    let result = new BN(eth).mul(conversion).toFixed(2)
    let symbol = ''
    switch (state.currency) {
      case ('CAD'):
      case ('USD'):
        symbol = '$'
        break
      case ('GBP'):
        symbol = '£'
        break
      case ('EUR'):
        symbol = '€'
        break
      case ('JPY'):
      case ('CNY'):
        symbol = '¥'
        break
      // case ('JPY'):
      //   symbol = '¥'
      //   break
      default:
        symbol = ''
    }
    return symbol + result
  },
  convertFromCurrency ({state}, eth) {
    let conversion = state.conversions[state.currency]
    let result = new BN(eth).div(conversion).toFixed(8)
    return result
  },
  makeWithdraw ({state, dispatch, commit}, withdrawOptions) {
    console.log('withdrawOptions', withdrawOptions)
    if (!state.account || !withdrawOptions.amount) return
    let wei = new BN(window.web3.utils.toWei(withdrawOptions.amount))
    // TODO: This wei seems wrong!! Whyyyyyy
    console.log('wei', wei)
    return state.Doneth.methods.calculateTotalWithdrawableAmount(state.account).call().then((result) => {
      let member = state.members.find((member) => member.address === state.account)
      if (!member) return new Error('No Member')
      let withdrawnAlready = new BN(member.withdrawn)
      result = new BN(result)

      if (result.sub(withdrawnAlready).greaterThanOrEqualTo(wei)) {
        dispatch('setLoading', true)
        let options = {from: state.account}
        // TODO: Is this correct?! "to" option to send to recipient
        if (withdrawOptions.optionalAddress) options.to = withdrawOptions.optionalAddress
        return state.Doneth.methods.withdraw(wei).send(options).then((result) => {
          dispatch('readLogs')
          commit('UPDATE_MEMBER_WITHDRAWN', {amount: wei, address: state.account})
          dispatch('setLoading', false)
          dispatch('getContractInfo')
          dispatch('pollAllowedAmounts')
          dispatch('addNotification', {class: 'success', text: 'Withdrawn 🎉'})
        })
      } else {
        dispatch('addNotification', {class: 'error', text: 'Insufficient Shares to withdraw that amount'})
      }
    }).catch((error) => {
      console.error(error)
      dispatch('setLoading', false)
      dispatch('addNotification', {class: 'error', text: 'Unknown Error, please check logs'})
    })
  },
  // TODO: ----------------------------
  makeExpenseWithdraw ({state, dispatch, commit}, {amount, to}) {
    console.log('withdrawOptions', amount, to)
    if (!state.account || !amount) return
    let wei = new BN(window.web3.utils.toWei(amount))
    // TODO: This wei seems wrong!! Whyyyyyy
    console.log('wei', wei)
    return state.Doneth.methods.calculateTotalExpenseWithdrawableAmount().call().then((result) => {
      result = new BN(result)
      if (result.greaterThanOrEqualTo(wei)) {
        dispatch('setLoading', true)
        let options = {from: state.account}
        return state.Doneth.methods.withdrawSharedExpense(wei, to).send(options).then((result) => {
          dispatch('readLogs')
          // commit('UPDATE_WITHDRAW_WITHDRAWN', {amount, to})
          dispatch('setLoading', false)
          dispatch('getContractInfo')
          dispatch('pollAllowedAmounts')
          dispatch('addNotification', {class: 'success', text: 'Withdrawn 🎉'})
        })
      } else {
        dispatch('addNotification', {class: 'error', text: 'Insufficient Shares to withdraw that amount'})
      }
    }).catch((error) => {
      console.error(error)
      dispatch('setLoading', false)
      dispatch('addNotification', {class: 'error', text: 'Unknown Error, please check logs'})
    })
  },
  makeDeposit ({state, dispatch, commit}, amount) {
    if (!state.account || !state.address || !amount) return
    let wei = window.web3.utils.toWei(amount)
    dispatch('setLoading', true)
    return window.web3.eth.sendTransaction({
      from: state.account,
      to: state.address,
      value: wei
    }).then((result) => {
      dispatch('setLoading', false)
      dispatch('readLogs')
      dispatch('getContractInfo')
      dispatch('pollAllowedAmounts')
    }).catch((error) => {
      console.error(error)
      dispatch('setLoading', false)
    })
    // state.Doneth.methods.send()
  },
  getAllowed ({state, commit}, address) {
    return state.Doneth.methods.calculateTotalWithdrawableAmount(address).call().then((amount) => {
      commit('UPDATE_MEMBER_AMOUNT', {address, amount})
    })
  },
  allocateExpenseAmount ({state, dispatch, commit}, amount) {
    let wei = window.web3.utils.toWei(new BN(amount))
    return new Promise((resolve, reject) => {
      dispatch('setLoading', true)
      return state.Doneth.methods.changeSharedExpenseAllocation(wei).send({from: state.account})
      .on('transactionHash', (hash) => {
        console.log('hash', hash)
      })
      .on('error', (error) => {
        console.error(error)
        dispatch('setLoading', false)
        reject(error)
      })
      .then((result) => {
        dispatch('setLoading', false)
        dispatch('addNotification', {
          text: 'Expense allocated successfully!',
          class: 'success'
        })

        return Promise.all([
          dispatch('pollSharedExpense'),
          dispatch('pollSharedExpenseWithdrawn'),
          dispatch('pollAllowedAmounts')])
        .then(resolve())
      })
    })
  }
}
