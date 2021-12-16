<template>
  <div class="container">
    <div class="page-card">
      <section-header :title="'Create Your Project'"></section-header>
      <p>You can deploy your very own Contract on this page. Just add a title for the contract and your own name. Adding names will help you identify the members of your contract and make the shares and balance delegation clearer.</p>
      <p>After deploying the contract you will be able to add more members and modify how much of the shared account balance they have access to. It may be prudent to create a new member designated as "Accounts Payable" to handle all of your expenses.</p>
      <div class="warning-msg">
        <p><strong>Notice:</strong> Use at your own risk! Doneth has not been formally audited for full security<br>protection & edge cases.</p>
      </div>
      <div class="page-card-footer">
        <template v-if="metamask">
          <form @submit.prevent="deploy()">
            <template v-if="!deploying && !confirming && !address">
              <!-- <div class="field">
                <label for="alloc_shares">Title:</label>
                <input maxLength="21" type="text" name="name" v-model="name" >
              </div>

              <div class="field">
                <label for="alloc_shares">Founder:</label>
                <input maxLength="21" type="text" name="founder_name" v-model="founderName" >
              </div> -->
              <div class="field ">
                <button class="btn btn-primary center" type="submit" name="button">Deploy</button>
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
          Please connect your wallet
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import SectionHeader from '@/components/SectionHeader'
import proxyABI from '../../build/contracts/ProxyFactory.json'
import donethABI from '../../build/contracts/Doneth.json'
import axios from 'axios'
import { mapGetters, mapActions, mapState } from 'vuex'
const APITOKEN = 'QCNRXK7D434BB6DQSFMAGFSNNDY5EMTXE6'
export default {

  name: 'Deploy',
  components: {SectionHeader},
  data () {
    return {
      name: '',
      founderName: '',
      deploying: false,
      confirming: false,
      tx: null,
      address: null,
      countdown: 3
    }
  },
  computed: {
    ...mapGetters(['account', 'metamask']),
    ...mapState(['abi', 'network'])
  },
  methods: {
    ...mapActions(['addNotification', 'setLoading']),
    verifyProxy(address) {


      var formdata = new FormData();
      formdata.append("address", address);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      var network = this.network == "4" ? '-rinkeby' : ''
      const url = `https://api${network}.etherscan.io/api?module=contract&action=verifyproxycontract&apikey=${APITOKEN}`

      fetch(url, requestOptions)
      // .then(response => response.text())
      // .then(result => console.log(result))
      // .catch(error => console.log('error', error));


      // const url = `https://api-rinkeby.etherscan.io/api?module=contract&action=verifyproxycontract&apikey=${APITOKEN}`
      // console.log({url})
      // axios.post(url, {
      //   address
      // })
      .then(response => {
        console.log({response})
        // if (res.data.message == 'NOTOK') {
        //   console.log('FAILED TO VERIFY', {res})
        //   setTimeout(() => {
        //     this.verifyProxy(address)
        //   }, 5000)
        // } else {
        //   console.log('SUCCEEDED TO VERIFY', {res})
        // }
      }).
      then(result => {
        console.log({result})
      }).
      catch(error => {
        console.error(error)
      })

    },
    deploy () {
      if (!this.account) {
        alert('unlock your wallet!')
        return
      }
      this.setLoading(true)
      var donethMaster = donethABI.networks[this.network]

      if (!donethMaster) throw new Error("Doneth Master not deployed on network "+ this.network)
      // 0x59BDC45cDD125D713313436550A5B538bD6ACBBb
      var address = proxyABI.networks[this.network]
      if (!address) throw new Error('Not deployed to network ' + this.network)
      var ProxyFactory = new window.web3.eth.Contract(proxyABI.abi, address.address)
      // var contract = new window.web3.eth.Contract(this.abi.abi)
      // contract.deploy({
      //   data: this.abi.bytecode,
      //   arguments: [this.name, this.founderName],
      //   from: this.account
      // }).send({
      //   from: this.account,
      //   gas: '4200000'
      //   // gasPrice: '4000000000'
      // }, 
      this.deploying = true
      console.log('donethMaster.address', donethMaster.address)


      ProxyFactory.methods.createProxy(donethMaster.address).send({from: this.account}, (e, transactionHash) => {
        this.deploying = false
        this.confirming = true
        this.tx = transactionHash
        console.log({transactionHash})
      })
      .on('error', () => {
        this.confirming = false
        this.deploying = false
        this.setLoading(false)
        this.addNotification({
          text: 'Error has occured, please check logs',
          class: 'error'
        })
      })
      .then((newContractInstance) => {
        console.log({newContractInstance})
        this.setLoading(false)
        this.confirming = false
        this.address = newContractInstance.events.ProxyDeployed.returnValues.proxyAddress


        setInterval(() => {
          this.countdown--
          if (this.countdown === 0) {
            setTimeout(() => {
              this.verifyProxy(this.address)
            }, 15000)
            this.$router.push('/' + this.address)
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';
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
    width: 100%;

    .center {
      margin-left:auto;
      margin-right: auto;
    }

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

  .warning-msg {
    background: #e09100;
    border-radius: 3px;
    color: $white;
    margin: 10px 20px 20px;

    p {
      padding: 9px 15px;
    }
  }
</style>
