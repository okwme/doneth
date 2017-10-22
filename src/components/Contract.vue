<template>
  <div>
    {{address}}
  </div>
</template>

<script>
import ManageContract from '@/components/ManageContract'
import { mapGetters } from 'vuex'
import abi from '../assets/Doneth.json'
export default {

  name: 'Contract',
  props: ['address'],
  components: {ManageContract},
  data () {
    return {
      abi
    }
  },
  computed: {
    ...mapGetters(['metamask'])
  },
  mounted () {
    this.useContract()
  },
  methods: {
    useContract () {
      let Doneth = new web3.eth.Contract(this.abi.abi, this.address)
      console.log(Doneth)
      // Doneth.methods.name.call().then((resp) => {
      //   console.log(resp)
      // })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
