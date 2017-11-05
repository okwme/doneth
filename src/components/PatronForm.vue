<template>
  <div>
    <div class="patron-form" @click="openModal('modalAddMember')">
      <h1>+</h1>
      <h3>Add Member</h3>
    </div>

    <ui-modal ref="modalAddMember" title="Add Member">
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
      <div class="field checkbox">
        <input type="checkbox" name="add_admin" v-model="isAdmin">
        <label for="add_admin">Is Admin?</label>
      </div>

      <div slot="footer">
        <template v-if="!submitting">
          <button class="btn btn-secondary" @click="closeModal('modalAddMember')">Cancel</button>
          <button class="btn btn-primary" name="button" @click="addNewMember()">Submit</button>
        </template>
        <template v-if="submitting">
          <button class="btn btn-primary">Sending...</button>
        </template>
      </div>
    </ui-modal>
  </div>
</template>

<script>
import UiModal from '@/components/UiModal'
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'PatronForm',
  props: ['address'],
  data () {
    return {
      firstName: '',
      sharesTotal: '',
      userAddress: '',
      isAdmin: false,
      submitting: false
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
        firstName: this.firstName,
        isAdmin: this.isAdmin
      }
      this.submitting = true
      this.addMember(member).then(() => {
        this.submitting = false
        this.userAddress = ''
        this.sharesTotal = ''
        this.firstName = ''
        this.closeModal('modalAddMember')
      }).catch((error) => {
        this.submitting = false
        this.addNotification({
          text: error,
          class: 'error'
        })
      })
    },
    openModal (ref) {
      this.$refs[ref].open()
    },
    closeModal (ref) {
      this.$refs[ref].close()
    }
  },
  components: {
    UiModal
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .patron-form {
    color: $lightgrey;
    cursor: pointer;
    overflow: hidden;
    margin: auto;
    padding-bottom: 10px;
    transition: color 220ms ease;
    width: 100%;

    h1 {
      font-size: 75pt;
      font-weight: 100;
      line-height: 45pt;
      margin: 30px 0 10px;
    }

    &:hover {
      border-color: $primary;
      color: $darkgrey;
    }
  }
</style>
