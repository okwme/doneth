<template>
  <div class="container">
    <div class="page-card">
      <section-header :title="'Deploy!'"></section-header>
      <p>You can deploy your very own Contract on this page. Just add a title for the contract and your own name. Adding names will help you identify the members of your contract and make the shares and balance delegation clearer.</p>
      <p>After deploying the contract you will be able to add more members and modify how much of the shared account balance they have access to. It may be prudent to create a new member designated as "Accounts Payable" to handle all of your expenses.</p>
      <div class="page-card-footer">
        <template v-if="metamask">
          <form @submit.prevent="deploy()">
            <template v-if="!deploying && !confirming && !address">
              <div class="field">
                <label for="alloc_shares">Title:</label>
                <input maxLength="12" type="text" name="name" v-model="name" required>
              </div>

              <div class="field">
                <label for="alloc_shares">Founder:</label>
                <input maxLength="12" type="text" name="founder_name" v-model="founderName" required>
              </div>
              <div class="field">
                <button class="btn btn-primary" type="submit" name="button">Deploy</button>
              </div>
            </template>
            <h2 v-if="deploying && !confirming && !address">
              Deploying....
            </h2>
            <h2 v-if="confirming && !address">
              Waiting for Confirmations....
            </h2>
            <h2 v-if="address">
              Contract Deployed 🎉<br>
              Redirecting in {{countdown}} sec
            </h2>
          </form>
        </template>
        <template v-else>
          Please get Metamask
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import abi from '../assets/Doneth.json'
import contract from '../assets/Doneth.sol.txt'
import SectionHeader from '@/components/SectionHeader'

import { mapGetters, mapActions } from 'vuex'
export default {

  name: 'Deploy',
  components: {SectionHeader},
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
    ...mapActions(['addNotification', 'setLoading']),
    deploy () {
      console.log(this.account)
      if (!this.account) {
        alert('unlock your wallet!')
      }
      this.setLoading(true)
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
        this.confirming = false
        this.deploying = false
        this.setLoading(false)
        this.addNotification({
          text: 'Error has occured, please check logs',
          class: 'error'
        })
        console.log('ERROR', error)
      })
      .then((newContractInstance) => {
        this.setLoading(false)
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

  form {
    display: flex;
    h2 {
      flex: 1;
      text-align: center;
    }
    .field {
      flex: 1;
      padding: 10px;
      position: relative;
    }

    select {
      padding-left: 40px;
    }

    input {
      padding-left: 70px;
      padding-right:5px;
      text-align: center;
      width: 160px;
    }

    .btn {
      display: block;
      width: 190px;
      font-size: 13pt;
      font-weight: 500;
      padding: 11px 12px 9px;
    }
  }
</style>
