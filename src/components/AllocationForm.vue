<template>
  <div class="page-card allocations">
    <h3>Allocate Shares</h3>
    <form class="allocations-form" action="" method="post">
      <div class="field">
        <label for="alloc_patron"></label>
        <select name="alloc_patron" v-model="patron">
          <option v-for="item in patrons" value="item">{{item.firstName}}</option>
        </select>
      </div>
      <div class="field">
        <label for="alloc_shares"></label>
        <input type="number" name="alloc_shares" :value="sharesAllocated" placeholder="Shares">
      </div>
      <button class="btn btn-primary" type="submit" name="button">Allocate</button>
    </form>
  </div>
</template>

<script>
export default {

  name: 'AllocationForm',

  data () {
    return {
      patron: {
        address: '0x0000000000000000000000000000000000000',
        firstName: 'Billy'
      },
      patrons: [{
        address: '0x0000000000000000000000000000000000000',
        firstName: 'Billy'
      }, {
        address: '0x0000000000000000000000000000000000001',
        firstName: 'Trevor'
      }, {
        address: '0x0000000000000000000000000000000000002',
        firstName: 'Tim'
      }],
      sharesAllocated: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';
  @import '../scss/buttons';

  .allocations {

    h3 {
      color: $darkgrey;
      margin: 0;
      text-align: left;
      padding: 10px 12px 7px;
    }
  }

  .allocations-form {
    display: flex;

    .field {

    }
  }

</style>
