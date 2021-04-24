<template>
  <section>
    <div class="page-card allocations">
      <div class="heading">Administration</div>
      <div class="actions">
        <button class="btn btn-primary" @click="openModal('modalAllocateExpenseFunds')">Allocate Expense Funds</button>
        <button :disabled="totalExpense === '0'" class="btn btn-primary" @click="openModal('modalWithdrawExpense')">Withdraw Expense</button>
      </div>
    </div>

    <ui-modal modal-id="modalAllocateExpenseFunds" title="Allocate Funds for Expense">
      <expense-allocate-form />
    </ui-modal>

    <ui-modal modal-id="modalWithdrawExpense" title="Withdraw Expense Funds">
      <expense-withdraw-form />
    </ui-modal>
  </section>
</template>

<script>
import UiModal from '@/components/UiModal'
import ExpenseAllocateForm from '@/components/ExpenseAllocateForm'
import ExpenseWithdrawForm from '@/components/ExpenseWithdrawForm'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Administration',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['totalExpense'])
  },
  methods: {
    ...mapMutations({setModal: 'SET_MODAL'}),
    openModal (ref) {
      this.setModal(ref)
    },
    closeModal (ref) {
      this.setModal(false)
    }
  },
  components: {
    ExpenseAllocateForm,
    ExpenseWithdrawForm,
    UiModal
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .heading {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    font-size: 14pt;
    font-weight: 500;
    padding: 10px 12px 7px;
    text-align: left;
  }

  .actions {
    display: flex;
    padding: 20px 15px;

    .btn {
      margin-right: 15px;
    }
  }
</style>
