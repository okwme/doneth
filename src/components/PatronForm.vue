<template>
  <div>
    <div class="patron-form" @click="openModal('modalAddMember')">
      <h1>+</h1>
      <h3>Add Member</h3>
    </div>

    <ui-modal modal-id="modalAddMember" :title="title">
      <form @submit.prevent="addNewMember()">
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
          <input minLength="42"  maxLength="42" type="text" name="add_address" v-model="userAddress" required>
        </div>
        <div class="field checkbox">
          <input :disabled="userAddress.toLowerCase() === account.toLowerCase()" type="checkbox" name="add_admin" v-model="isAdmin">
          <label for="add_admin">Is Admin?</label>
        </div>

        <div slot="footer">
          <template v-if="!submitting">
            <button class="btn btn-primary" name="button" >Submit</button>
            <button class="btn btn-secondary" @click.prevent="closeModal()">Cancel</button>
          </template>
          <template v-if="submitting">
            <button class="btn btn-primary">Sending...</button>
          </template>
        </div>
      </form>
    </ui-modal>
  </div>
</template>

<script>
import UiModal from '@/components/UiModal'
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'

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
    ...mapState(['editMember']),
    ...mapGetters(['account', 'metamask', 'connected']),
    title () {
      return (this.editMember ? 'Edit ' : 'Add ') + 'Member'
    }
  },
  watch: {
    editMember () {
      if (this.editMember) {
        this.userAddress = this.editMember.address
        this.sharesTotal = this.editMember.shares
        this.firstName = this.editMember.memberName
        this.isAdmin = this.editMember.admin
      } else {
        this.clearData()
      }
    }
  },
  methods: {
    ...mapMutations({setModal: 'SET_MODAL'}),
    ...mapActions(['addNotification', 'setLoading', 'updateMember']),
    clearData () {
      this.userAddress = ''
      this.sharesTotal = ''
      this.firstName = ''
      this.isAdmin = false
    },
    addNewMember () {
      let member = {
        userAddress: this.userAddress,
        sharesTotal: this.sharesTotal,
        firstName: this.firstName,
        isAdmin: this.isAdmin
      }
      this.submitting = true
      member.action = this.editMember ? 'updateMember' : 'addMember'
      this.updateMember(member).then(() => {
        this.submitting = false
        this.clearData()
        this.closeModal()
      }).catch((error) => {
        console.error(error)
        this.submitting = false
        this.addNotification({
          text: error,
          class: 'error'
        })
      })
    },
    openModal (ref) {
      this.setModal(ref)
    },
    closeModal () {
      this.setModal(false)
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
