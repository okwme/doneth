<template>
    <div>
      !!!
    </div>
</template>

<script>

import contract from '../assets/dummy.sol.txt'
// import contract from 'raw-loader!../assets/dummy.sol.txt'
// let contract = require('../assets/dummy.sol.txt')
// const contract = fs.readFileSync('../assets/dummy.sol.txt')
// const solc = require('solc')
// const Web3 = require('web3')
// const Tx = require('ethereumjs-tx')

export default {

  name: 'Deploy',

  data () {
    return {
    }
  },
  computed: {
    contract () {
      return contract
    }
  },
  methods: {
    deploy () {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
