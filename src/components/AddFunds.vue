<template>
  <div class="add-funds">
    <button @click="depositing = true" type="button" name="button" class="btn btn-primary">
      <b>Add Funds</b>
      <short-hash :hash="address"/>
    </button>
    <div class="funds-form" :class="{ active: depositing }">
      <div class="funds-title">
        <h3>Add Funds</h3>
        <small>{{address}}</small>
      </div>
      <div class="funds-meta">
        <span>1 ETH</span> -> <span>1 USD</span>
      </div>
      <div class="funds-actions">
        <label for="">ETH</label>
        <input v-if="depositing" v-model="depositAmount">
        <label for="">USD</label>
        <input v-if="depositing" :value="convertedAmount">
      </div>
      <div class="funds-footer">
        <button v-if="depositing" class="btn btn-error" @click="depositing = false">Cancel</button>
        <button @click="doDeposit()" type="button" name="button" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import ShortHash from '@/components/ShortHash'
import { mapGetters, mapActions } from 'vuex'
export default {

  name: 'AddFunds',
  props: ['address'],
  data () {
    return {
      currency: 'USD',
      createdAt: 1508639178669,
      convertedAmount: 0,
      depositAmount: 0,
      depositing: false,
      timestamp: null
    }
  },
  computed: {
    ...mapGetters(['metamask'])
  },
  watch: {
    depositAmount () {
      this.convertToCurrency(this.depositAmount).then((amount) => {
        this.convertedAmount = amount
      })
    }
  },
  methods: {
    ...mapActions(['makeDeposit', 'convertToCurrency']),
    deposit () {
      if (this.depositing) {
        this.makeDeposit(this.depositAmount)
      }
    }
  },
  components: {
    ShortHash
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .add-funds {
    position: relative;

    .btn {
      outline: 0;
      position: relative;
      z-index: 10;
    }
  }

  .funds-form {
    background: $white;
    box-shadow: 0 1px 15px -3px rgba(0,0,0,0.4);
    border-radius: $border-radius;
    overflow: hidden;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    max-height: 0;
    width: 0;
    z-index: 20;
    transition: opacity 300ms ease 20ms, box-shadow 300ms ease 20ms;

    .funds-title {

      h3,
      small {
        opacity: 0;
        transform: translateX(80px);
        transition: all 300ms ease 20ms;
      }
    }

    &.active {
      opacity: 1;
      max-height: 1000px;
      width: 380px;
      transition: opacity 300ms ease 0, box-shadow 300ms ease 0;

      .funds-title {

        h3,
        small {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
  }

  .funds-title {
    background: $primary;
    padding: 15px 20px 5px;

    h3 {
      color: $white;
      font-size: 14pt;
      line-height: 12pt;
      margin: 0;
      padding: 0;
    }

    small {
      font-size: 8pt;
      line-height: 9pt;
      color: #f9f9f9;
      opacity: .7;
    }
  }

  .funds-meta {
    background: lighten($primary, 10%);
  }

  .funds-actions {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 0;

    input {
      width: calc(50% - 10px);
      text-align: center;
    }
  }

  .funds-footer {
    display: flex;
    justify-content: space-between;
    background: darken($white, 3%);
    padding: 12px;

    .btn {
      padding: 12px;
      width: calc(50% - 10px);
    }

    .btn-error {
      opacity: .4;
      transition: all 300ms ease;

      &:hover {
        opacity: 1;
      }
    }
  }

</style>
