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
        <span>1 ETH</span> &#8594; <span>{{convertedSingleEth}} {{currency}}</span>
      </div>
      <div class="funds-actions">
        <label for="">ETH</label>
        <input v-if="depositing" v-model="depositAmount">
        <label for="">{{currency}}</label>
        <input v-if="depositing" :value="convertedAmount">
      </div>
      <div class="funds-footer">
        <button v-if="depositing" class="btn btn-error" @click="depositing = false">Cancel</button>
        <button @click="deposit()" type="button" name="button" class="btn btn-primary">Submit</button>
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
      convertedAmount: null,
      convertedSingleEth: null,
      depositAmount: null,
      depositing: false
    }
  },
  mounted () {
    this.convertToCurrency(1).then((amount) => {
      this.convertedSingleEth = amount
    })
  },
  computed: {
    ...mapGetters(['metamask', 'currency'])
  },
  watch: {
    depositAmount () {
      this.makeConversion()
    },
    currency () {
      this.makeConversion()
    }
  },
  methods: {
    ...mapActions(['makeDeposit', 'convertToCurrency']),
    makeConversion () {
      if (!this.depositAmount) return 0
      this.convertToCurrency(this.depositAmount).then((amount) => {
        this.convertedAmount = amount
      })
    },
    deposit () {
      if (this.depositing) {
        this.makeDeposit(this.depositAmount).then((result) => {
          this.depositing = false
        }).catch((error) => {
          console.error(error)
          this.depositing = false
        })
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
      z-index: 7;
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
    z-index: 8;
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
      font-size: 16pt;
      line-height: 13pt;
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

    span {
      font-size: 10pt;
      font-weight: 600;
    }
  }

  .funds-actions {
    display: flex;
    justify-content: space-between;
    padding: 40px 20px 15px;
    position: relative;

    label {
      font-weight: 600;
      top: 0;
      left: 8px;

      &:last-of-type {
        left: 183px;
      }
    }

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
