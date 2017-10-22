<template>
  <div class="patron-cards">
    <div class="patron-card" v-for="member in members">
      <div class="user">
        <div class="avatar">
          <i>TR</i>
        </div>
        <div class="attributes">
          <h3>firstName</h3>
          <h5>(owner)</h5>
          <small>0x0000...00000</small>
        </div>
      </div>
      <hr class="divider" :style="{ background: '#' + member.who.slice(-6) }">
      <div class="meta">
        <div class="meta-item">
          <span>Shares: 132</span>
          <span>Transactions: 132</span>
        </div>
        <div class="meta-item">
          <span>Ownership: 132</span>
        </div>
      </div>
      <div class="actions">
        <button class="btn btn-primary btn-outlined" name="button">Withdraw</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'PatronCard',

  props: ['patrons'],

  data () {
    return {
      members: []
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .patron-cards {
    display: flex;
    flex-direction: column;
    min-width: 760px;
    margin: 20px auto;
    width: 60vw;
  }

  .patron-card {
    background: $white;
    border-radius: $border-radius;
  }
</style>
