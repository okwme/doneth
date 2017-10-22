<template>
    <div>
      <input v-model="name">
      <br>
      <textarea readonly v-text="contract"></textarea>
      <textarea :class="isCompiling" readonly v-text="compiled"></textarea>
      <br>
      <button @click="deploy">DEPLOY</button>
    </div>
</template>

<script>

import contract from '../assets/Doneth.sol.txt'
// import contract from 'raw-loader!../assets/dummy.sol.txt'
// let contract = require('../assets/dummy.sol.txt')
// const contract = fs.readFileSync('../assets/dummy.sol.txt')
// var solc = require('solc')
// const Web3 = require('web3')
// const Tx = require('ethereumjs-tx')
import { mapGetters } from 'vuex'
export default {

  name: 'Deploy',

  data () {
    return {
      name: 'Contract Name',
      abi: null,
      compiled: null,
      compiling: false
    }
  },
  computed: {
    ...mapGetters(['account']),
    contract () {
      return contract.replace('__REPLACE__', this.name)
    },
    isCompiling () {
      return {
        yesCompiling: this.compiling
      }
    }
  },
  watch: {
    contract () {
      this.compile()
    }
  },
  methods: {
    compile () {
      clearTimeout(this.compileTimeout)
      this.compiling = true
      this.compiled = this.compiled === null ? 'compiling...' : this.compiled
      this.compileTimeout = setTimeout(() => {
        this.actuallyCompile()
      }, 1000)
    },
    actuallyCompile () {
      console.log('actually compile')
      // web3.eth.compile.solidity(this.contract).then((contract) => {
      //   this.compiling = false
      //   console.log(contract)
      // })

      if (typeof BrowserSolc !== 'undefined') {
        BrowserSolc.getVersions((soljsonSources, soljsonReleases) => {
          // console.log(soljsonSources)
          // console.log(soljsonReleases)
        })
        BrowserSolc.loadVersion('soljson-v0.4.19-nightly.2017.10.20+commit.bdd2858b.js', (compiler) => {
          const output = compiler.compile(this.contract, 1)
          // const output = compiler.compile('contract x { function g() {} }', 1)
          console.log(output)
          this.compiled = output.contracts[':Doneth'].bytecode
          this.abi = JSON.parse(output.contracts[':Doneth'].interface)
          this.compiling = false
        })
      } else {
        setTimeout(() => {
          this.actuallyCompile()
        }, 1000)
      }
    },
    deploy () {
      console.log(this.account)
      var contract = new web3.eth.Contract(this.abi)
      contract.deploy({
        data: this.compiled,
        arguments: [],
        from: this.account
      }).send({
        from: this.account,
        gas: '4700000',
        gasPrice: '4700000'
      }, function (e, transactionHash) {
        console.log(e, transactionHash)
        // if (typeof contract.address !== 'undefined') {
        //   console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash)
        // }
      })
      .on('error', function (error) {
        console.log('ERROR', error)
      })
      .on('transactionHash', function (transactionHash) {
        console.log('transactionHash', transactionHash)
      })
      .on('receipt', function (receipt) {
        console.log(receipt.contractAddress) // contains the new contract address
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt)
      })
      .then(function (newContractInstance) {
        console.log(newContractInstance.options.address) // instance with the new contract address
        this.$router.push('/' + newContractInstance.options.address)
      })
    }
  },
  mounted () {
    this.compile()
  }
}
</script>

<style lang="scss" scoped>
textarea {
  width:500px;
  height:200px;
  border: 1px solid black;
  &.yesCompiling {
    border:1px solid red;
  }
}
</style>
