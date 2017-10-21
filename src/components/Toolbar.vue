<template>
  <div>
    <div>
      sdkfjhlasjdfhjs dlf
    </div>
    <div>
      sdfsdfa
    </div>
    <div @click="clicked">click me</div>
    <div v-for="option in options" @click="selectCurrency(option)"></div>
    {{ currencySentence }}
  </div>
</template>

<script>
export default {

  name: 'Toolbar',

  data () {
    return {
      options: ['USD', 'GBP'],
      currency: 'USD'
    }
  },
  mounted () {
    conosole.log(this.options)
  },
  methods: {
    click () {
      alert('i got clicked')
    },
    selectCurrency (option) {
      this.currency = option
    }
  },
  computed: {
    currencySentence () {
      return this.currency + ' is my currency'
    }
  }
}
</script>

<style lang="css" scoped>
</style>
