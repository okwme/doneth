<template>
  <div>
    <form @submit.prevent="allocate()">
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

      <div class="footer">
        <template v-if="!submitting">
          <button class="btn btn-secondary" @click="closeModal()">Cancel</button>
          <button class="btn btn-primary" name="button" >Submit</button>
        </template>
        <template v-if="submitting">
          <button class="btn btn-primary">Sending...</button>
        </template>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
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
  watch: {
    patron () {
      console.log('patron changed')
      console.log(this.patron)
      if (!this.patron) return
      let member = this.members.find((m) => m.address === this.patron)
      this.sharesAllocated = (member && parseInt(member.shares)) || 0
    }
  },
  methods: {
    ...mapActions(['allocateShares', 'addNotification']),
    ...mapMutations({setModal: 'SET_MODAL'}),
    allocate () {
      this.submitting = true
      this.allocateShares({address: this.patron, amount: this.sharesAllocated})
      .then((done) => {
        this.submitting = false
        this.patron = null
        this.sharesAllocated = 0
        this.closeModal()
      }).catch((error) => {
        console.error('ERROR', error)
        this.submitting = false
        this.addNotification({
          text: error,
          class: 'error'
        })
      })
    },
    closeModal () {
      this.setModal(false)
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

  .footer {
    display: flex;
    justify-content: flex-end;
    margin: 10px -24px -24px;
    background: #f5f5f5;
    padding: 15px 24px;

    .btn {
      min-width: 100px;
    }
  }

</style>
