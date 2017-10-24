<template>
  <div class="toolbar">
    <div class="logo">
      <router-link class="pointer" :to="{name: 'Home'}" tag="h1">Don.eth</router-link>
    </div>

    <ul class="menu">
      <li>
        <!-- <router-link :to="{name: 'Deploy'}">Create</router-link> -->
        <router-link class="pointer btn btn-primary btn-outlined" :to="{name: 'Deploy'}" tag="button">Create</router-link>
      </li>
      <li class="currency">
        <div class="active-currency">{{activeCurrency}} <img src="/static/downArrow.svg"/></div>
        <div class="dropdown" :class="justClicked">
          <div class="dropdown-item" v-for="option in options" @click="selectCurrency(option)">Eth/{{option}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

  name: 'Toolbar',

  data () {
    return {
      clicked: false
    }
  },
  methods: {
    ...mapActions(['setCurrency']),
    selectCurrency (option) {
      // this.clicked = true
      this.setCurrency(option)
      // setTimeout(() => {
      //   this.clicked = false
      // }, 500)
    }
  },
  computed: {
    ...mapGetters(['conversions', 'currency']),
    justClicked () {
      return {justClicked: this.clicked}
    },
    options () {
      let options = []
      Object.keys(this.conversions).forEach((key, index) => {
        options.push(key)
      })
      return options
    },
    activeCurrency () {
      return `Eth/${this.currency}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';
  .toolbar {
    background: $white;
    box-shadow: 0 1px 10px -3px rgba(0,0,0,0.15);
    color: $darkgrey;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px;
    position: fixed;
    top:0;
    width: 100%;
    z-index: 999;
  }

  .logo {
    h1 {
      color: $primary;
      margin: 10px 20px 10px 30px;
    }
  }

  .menu {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    min-width: 250px;
    padding: 10px 40px 10px 10px;
  }

  .menu {
    li {
      color: $darkgrey;
      font-size: 14pt;
      font-weight: 500;

      a {
        color: $darkgrey;
        text-decoration: none;
        padding: 10px 10px;
        display: block;
      }

      &:hover,
      &:hover a {
        color: $primary;
        cursor: pointer;
      }

      &.currency {
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 3px;
        font-size: 12pt;
        position: relative;
        padding: 10px 7px 10px 12px;
        text-transform: uppercase;

        &:hover :not(.justClicked).dropdown {
          display: block;
        }
      }
    }

    .btn {
      padding: 11px 20px;
    }
  }

  .dropdown {
    background: $white;
    box-shadow: 0 1px 10px -3px rgba(0,0,0,0.15);
    display: none;
    position: absolute;
    z-index:999;
    top: 43px;
    left: 0px;
    width: 100%;
  }

  .dropdown-item {
    color: $darkgrey;
    cursor: pointer;
    padding: 5px 10px;

    &:hover {
      color: $primary;
    }
  }

  .active-currency {
    position: relative;
    text-align: left;
    width: 100px;

    img {
      position: absolute;
      right: 5px;
      top: 38%;
    }
  }
</style>
