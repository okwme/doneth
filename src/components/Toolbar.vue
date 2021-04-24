<template>
  <div class="toolbar">
    <div class="logo">
      <router-link class="pointer" :to="{name: 'Home'}" tag="h1">
        <!-- Doneth -->
        <svg version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="194.409px" height="60.329px" viewBox="0 0 194.409 60.329" enable-background="new 0 0 194.409 60.329" xml:space="preserve">
        	<text transform="matrix(1 0 0 1 72.9814 42.916)" fill="#548C4C" font-family="'Avenir-Medium'" font-size="36">Doneth</text>
        	<polygon fill="none" stroke="#548C4C" stroke-width="0.6098" stroke-miterlimit="10" points="14.291,55.794 0.352,28.679
        		16.864,3.049 47.316,4.535 61.255,31.65 44.743,57.279 		"/>
        	<polygon fill="none" stroke="#548C4C" stroke-width="0.6098" stroke-miterlimit="10" points="23.008,59.639 1.379,38.15 9.175,8.676 38.599,0.69 60.227,22.179 52.431,51.653 		"/>
        		<path fill="#548C4C" d="M37.891,25.204c-0.728-0.998-1.739-1.848-3.036-2.548c-1.298-0.702-2.985-1.063-5.062-1.084l-5.217-0.052 l-0.192,19.129l4.384,0.045c1.473,0.015,2.87-0.171,4.19-0.556c1.32-0.386,2.479-0.973,3.478-1.76 c0.999-0.786,1.793-1.774,2.385-2.965c0.592-1.189,0.896-2.582,0.912-4.176c0.008-0.821-0.115-1.782-0.37-2.885 C39.107,27.251,38.617,26.203,37.891,25.204z"/>
        		<path fill="#548C4C" d="M54.713,11.248L26.375,0L2.466,18.917l4.428,30.166l28.337,11.247l23.909-18.917L54.713,11.248z M42.474,36.03c-0.619,1.527-1.527,2.883-2.722,4.067c-1.195,1.183-2.673,2.128-4.431,2.835s-3.785,1.049-6.079,1.026 l-8.37-0.085l0.258-25.65l8.949,0.09c1.812,0.018,3.397,0.239,4.758,0.664c1.36,0.424,2.538,0.985,3.534,1.684 c0.995,0.699,1.82,1.498,2.476,2.398c0.655,0.9,1.171,1.823,1.548,2.77c0.376,0.945,0.646,1.891,0.805,2.834 c0.16,0.943,0.236,1.814,0.228,2.611C43.411,32.917,43.093,34.502,42.474,36.03z"/>
        </svg>
      </router-link>
      <span>Beta</span>
    </div>

    <ul class="menu">
      <li>
        <!-- <router-link :to="{name: 'Deploy'}">Create</router-link> -->
        <div @click="connect" class="pointer btn btn-primary btn-outlined" tag="button">Connect Wallet</div>
        <router-link class="pointer btn btn-primary btn-outlined" :to="{name: 'Deploy'}" tag="button">Create</router-link>
      </li>
      <li class="currency">
        <div class="active-currency">{{activeCurrency}} <img src="/static/downArrow.svg"/></div>
        <div class="dropdown" :class="justClicked">
          <div class="dropdown-item" v-bind:key="option" v-for="option in options" @click="selectCurrency(option)">Eth/{{option}}</div>
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
    ...mapActions(['setCurrency', 'connect']),
    selectCurrency (option) {
      // this.clicked = true
      this.setCurrency(option)
      // setTimeout(() => {
      //   this.clicked = false
      // }, 500)
    }
  },
  computed: {
    ...mapGetters(['currenciesArray', 'currency']),
    justClicked () {
      return {justClicked: this.clicked}
    },
    options () {
      return this.currenciesArray
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
    position: relative;

    h1 {
      color: $primary;
      margin: 10px 20px 10px 30px;
      font-size: 0;
    }

    svg {
      width: 140px;
      height: 42px;
    }

    span {
      background: #e09100;
      color: white;
      position: absolute;
      right: -18px;
      top: 12px;
      padding: 0px 5px;
      border-radius: 14px;
      font-size: 9pt;
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
