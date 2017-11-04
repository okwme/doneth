import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import abi from '../../build/contracts/Doneth.json'
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
const debug = false

const state = {
  retried: false,
  metamask: false,
  account: null,
  connected: false,
  currency: 'USD',
  currenciesArray: ['USD', 'CAD', 'EUR', 'GBP', 'CNY', 'JPY'],
  conversions: {},
  loading: false,
  notifications: [],
  Doneth: null,
  address: null,
  members: [],
  totalShares: 0,
  contractName: null,
  founder: null,
  genesisBlock: 0,
  totalWithdrawn: 0,
  totalBalance: 0,
  totalExpense: 0,
  totalExpenseWithdrawn: 0,
  logs: [],
  abi
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: false, // debug,
  plugins: debug ? [createLogger()] : []
})
