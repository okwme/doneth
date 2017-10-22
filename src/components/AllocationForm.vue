<template>
  <div class="page-card allocations">
    <h3>Allocate Shares</h3>
    <form class="allocations-form" action="" method="post">
      <div class="field">
        <label for="alloc_patron">To:</label>
        <select name="alloc_patron" v-model="patron" required>
          <option v-for="item in patrons" :value="item">{{item.firstName}}</option>
        </select>
      </div>
      <div class="field">
        <label for="alloc_shares">Shares:</label>
        <input type="number" name="alloc_shares" :value="sharesAllocated" placeholder="Shares" required>
      </div>
      <div class="field">
        <button class="btn btn-primary" type="submit" name="button">Allocate</button>
      </div>
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

    .btn {
      display: block;
      width: 100%;
      font-size: 13pt;
      font-weight: 500;
      padding: 11px 12px 9px;
    }
  }

</style>
