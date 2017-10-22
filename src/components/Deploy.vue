<template>
  <div class="container">
    <div class="page-card">
      <template v-if="metamask">
        <form @submit.prevent="deploy()">
          <input :readonly="confirming" placeholder="Contract Name" v-model="name">
          <br>
          <input :readonly="confirming" placeholder="Your Name" v-model="founderName">
          <br>
          <template v-if="!deploying && !confirming && !address">
            <button @click="deploy" type="button" name="button" class="btn btn-primary btn-outlined">
              <b>Deploy</b>
            </button>
          </template>
          <template v-if="deploying && !confirming && !address">
            Deploying....
          </template>
          <template v-if="confirming && !address">
            Waiting for Confirmations....
          </template>
          <template v-if="address">
            Contract Deployed 🎉<br>
            Redirecting in {{countdown}} sec
          </template>
        </form>
      </template>
      <template v-else>
        Please get Metamask
      </template>
    </div>
  </div>
</template>

<script>

import abi from '../assets/Doneth.json'
import contract from '../assets/Doneth.sol.txt'

import { mapGetters } from 'vuex'
export default {

  name: 'Deploy',

  data () {
    return {
      name: '',
      founderName: '',
      abi: abi.abi,
      compiled: abi.unlinked_binary,
      contract,
      deploying: false,
      confirming: false,
      tx: null,
      address: null,
      countdown: 5
    }
  },
  computed: {
    ...mapGetters(['account', 'metamask'])
  },
  methods: {
    deploy () {
      console.log(this.account)
      if (!this.account) {
        alert('unlock your wallet!')
      }
      var contract = new web3.eth.Contract(this.abi)
      this.deploying = true
      contract.deploy({
        data: this.compiled,
        arguments: [this.name, this.founderName],
        from: this.account
      }).send({
        from: this.account
        // gas: '4700000',
        // gasPrice: '20000000000'
      }, (e, transactionHash) => {
        this.deploying = false
        this.confirming = true
        this.tx = transactionHash
      })
      .on('error', (error) => {
        console.log('ERROR', error)
      })
      .then((newContractInstance) => {
        this.confirming = false
        this.address = newContractInstance.options.address
        setInterval(() => {
          this.countdown--
          if (this.countdown === 0) this.$router.push('/' + this.address)
        }, 1000)
      })
    }
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
