<template>
  <section>
    <div class="page-card allocations">
      <div class="heading">Administration</div>
      <div class="actions">
        <button class="btn btn-primary" @click="openModal('modalAllocateShares')">Allocate Shares</button>
        <button class="btn btn-primary" @click="openModal('modalAllocateExpenseFunds')">Allocate Expense Funds</button>
        <button class="btn btn-primary" @click="openModal('modalWithdrawExpense')">Withdraw Expense</button>
      </div>
    </div>

    <ui-modal ref="modalAllocateShares" title="Allocate Shares">
      <allocation-form />
    </ui-modal>
  </section>
</template>

<script>
import UiModal from '@/components/UiModal'
import AllocationForm from '@/components/AllocationForm'

export default {
  name: 'Administration',
  data () {
    return {
    }
  },
  methods: {
    openModal (ref) {
      this.$refs[ref].open()
    },
    closeModal (ref) {
      this.$refs[ref].close()
    }
  },
  components: {
    AllocationForm,
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
