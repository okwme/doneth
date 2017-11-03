<template>
  <div>
    <div class="field">
      <label for="alloc_patron">To:</label>
      <select name="alloc_patron" v-model="patron" required>
        <option v-for="item in members" :value="item.address">{{item.memberName}}</option>
      </select>
    </div>
    <div class="field">
      <label for="alloc_shares">Shares:</label>
      <input type="number" name="alloc_shares" v-model="sharesAllocated" placeholder="Shares" required>
    </div>

    <div slot="footer">
      <template v-if="!submitting">
        <button class="btn btn-secondary" @click="closeModal('modalAddMember')">Cancel</button>
        <button class="btn btn-primary" name="button" @click="allocate()">Submit</button>
      </template>
      <template v-if="submitting">
        <button class="btn btn-primary">Sending...</button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

  name: 'AllocationForm',

  data () {
    return {
      patron: null,
      sharesAllocated: 0,
      submitting: false
    }
  },
  computed: {
    ...mapGetters(['members'])
  },
  methods: {
    ...mapActions(['allocateShares']),
    allocate () {
      this.submitting = true
      this.allocateShares({address: this.patron, amount: this.sharesAllocated}).then((done) => {
        this.submitting = false
        this.patron = null
        this.sharesAllocated = 0
        this.closeModal('modalAllocateShares')
      }).catch((error) => {
        this.submitting = false
        this.addNotification({
          text: error,
          class: 'error'
        })
      })
    },
    closeModal (ref) {
      this.$refs[ref].close()
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
