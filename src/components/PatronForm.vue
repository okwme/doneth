<template>
  <div class="patron-form">
    <form @submit.prevent="addNewMember()">
      <h3>Add Member</h3>
      <div class="field">
        <label for="add_name">Name:</label>
        <input maxLength="64" type="text" name="add_name" v-model="firstName" required>
      </div>
      <div class="field">
        <label for="add_name">Shares:</label>
        <input min="0" type="number" name="add_shares" v-model="sharesTotal" required>
      </div>
      <div class="field field-address">
        <label for="add_address">Address:</label>
        <input maxLength="42" type="text" name="add_address" v-model="userAddress" required>
      </div>
      <div class="actions">
        <h2 v-if="submitting">
          <button class="btn btn-primary">Sending...</button>
        </h2>
        <template v-if="!submitting">
          <button class="btn btn-primary" type="submit" name="button">Submit</button>
        </template>
      </div>
    </form>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'PatronForm',
  props: ['address'],
  data () {
    return {
      firstName: '',
      sharesTotal: '',
      userAddress: '',
      submitting: false,
      confirming: false
    }
  },
  computed: {
    ...mapGetters(['account', 'metamask', 'connected'])
  },
  methods: {
    ...mapActions(['addNotification', 'setLoading', 'addMember']),
    addNewMember () {
      let member = {
        userAddress: this.userAddress,
        sharesTotal: this.sharesTotal,
        firstName: this.firstName
      }
      this.submitting = true
      this.addMember(member).then(() => {
        this.submitting = false
        this.userAddress = ''
        this.sharesTotal = ''
        this.firstName = ''
      }).catch((error) => {
        console.log('ERROR')
        this.submitting = false
        this.addNotification({
          text: error,
          class: 'error'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .patron-form {
    background: $white;
    border-radius: $border-radius;
    border: 2px solid $primary;
    box-shadow: 0 1px 10px -2px rgba(0,0,0,0.1);
    overflow: hidden;
    width: 250px;
    margin: 0 10px 10px;
    padding-bottom: 10px;

    form {
      display: flex;
      flex-direction: column;
    }

    .field {
      padding: 0 0 10px;
    }

    .field-address {
      input {
        padding-left: 80px;
        width: 147px;
      }
    }
  }

  .actions {

    .btn {
      margin: 10px 0 0;
      width: 70%;
    }
  }
</style>
