<template>
  <div class="toolbar">
    <div class="logo">
      <h1>Don.eth</h1>
    </div>

    <ul class="menu">
      <li>
        <router-link :to="{name: 'Deploy'}">Create</router-link>
      </li>
      <li class="currency">
        <div class="active-currency">{{activeCurrency}} <img src="static/downArrow.svg"/></div>
        <div class="dropdown">
          <div class="dropdown-item" v-for="option in options" @click="selectCurrency(option)">Eth/{{option}}</div>
        </div>
      </li>
    </ul>
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
    console.log(this.options)
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
    activeCurrency () {
      return `Eth/${this.currency}`
    }
  }
}
</script>

<style lang="css" scoped>
  .toolbar {
    background: white;
    box-shadow: 0 1px 10px -3px rgba(0,0,0,0.15);
    color: #4a4a4a;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px;
    position: fixed;
    top:0;
    width: 100%;
    z-index: 99;
  }

  .logo h1 {
    color: #548c4c;
    margin: 10px 20px;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    min-width: 300px;
    padding: 10px 10px;
  }

  .menu li {
    color: #323232;
    flex: 1;
    font-size: 14pt;
    font-weight: 500;
  }
  .menu li a {
    color: #323232;
    text-decoration: none;
    padding: 10px 10px;
    display: block;
  }
  .menu li:hover a {
    color: #548c4c;
    cursor: pointer;
  }
  .menu li:hover {
    color: #548c4c;
    cursor: pointer;
  }
  .menu li.currency {
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 3px;
    font-size: 12pt;
    position: relative;
    padding: 10px 10px;
    text-transform: uppercase;
  }
  .dropdown {
    background: white;
    box-shadow: 0 1px 10px -3px rgba(0,0,0,0.15);
    display: none;
    position: absolute;
    top: 45px;
    left: 0px;
    width: 100%;
  }
  .menu li.currency:hover .dropdown {
    display: block;
  }
  .dropdown-item {
    color: #323232;
    cursor: pointer;
    padding: 5px 10px;
  }
  .dropdown-item:hover {
    color: #548c4c;
  }

  .active-currency {
    position: relative;
  }
  .active-currency img {
    position: absolute;
    right: 5px;
    top: 38%;
  }
</style>
