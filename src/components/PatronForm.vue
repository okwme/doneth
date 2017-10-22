<template>
  <div class="patron-form">
    <form class="" action="index.html" method="post">
      <h3>Add Member</h3>
      <div class="field">
        <label for="add_name">Name:</label>
        <input maxLength="64" type="text" name="add_name" v-model="firstName" >
      </div>
      <div class="field">
        <label for="add_name">Shares:</label>
        <input min="0" type="number" name="add_shares" v-model="sharesTotal" >
      </div>
      <div class="field field-address">
        <label for="add_address">Address:</label>
        <input maxLength="42" type="text" name="add_address" v-model="address" >
      </div>
      <div class="actions">
        <button class="btn btn-primary" name="button">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {

  name: 'PatronForm',

  data () {
    return {
      firstName: '',
      sharesTotal: '',
      address: ''
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
