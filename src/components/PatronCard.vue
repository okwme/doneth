<template>
  <div class="patron-cards">
    <div class="patron-card" v-for="member in patrons" v-on:mouseenter="toggleActive(member, true)" v-on:mouseleave="toggleActive(member, false)">
      <div class="user">
        <div class="avatar">
          <div>{{firstName(member)}}</div>
        </div>
        <div class="attributes">
          <h3>{{member.firstName || 'FirstName'}}</h3>
          <small>{{member.who || '0x0000...0000'}}</small>
        </div>
      </div>
      <hr class="divider" :style="{ background: colorHex(member) }">
      <div class="meta">
        <div class="meta-item">
          <span>Shares: {{member.shares}}</span>
          <span>Transactions: {{member.transactions || 0}}</span>
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
  },
  methods: {
    firstName (member) {
      let initial = (member && member.firstName) ? member.firstName.substring(0, 2) : '0x'
      return initial.toUpperCase()
    },
    colorHex (member) {
      return (member && member.who) ? `#${member.who.slice(-6)}` : '#CCCCCC'
    },
    toggleActive: function (member, bool) {
      // TODO: Come back when not confused :)
      // member.active = (typeof bool === 'undefined') ? true : bool
      // console.log('member', member.active)
      // this.$emit('activemember')
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
    margin: 20px auto 40px;
    width: 60vw;
  }

  .patron-card {
    background: $white;
    border-radius: $border-radius;
    box-shadow: 0 1px 10px -2px rgba(0,0,0,0.1);
    overflow: hidden;
    max-width: 33%;
    transition: all 220ms ease;

    &:hover {
      box-shadow: 0 1px 20px -2px rgba(0,0,0,0.3);
    }
  }

  .user {
    display: flex;
    margin: 0 12px;

    .avatar {
      margin: auto;
    }

    .attributes {
      padding: 10px;
      text-align: left;
      width: calc(75% - 24px);

      h3 {
        margin: 0;
        padding: 0;
      }
    }

    .divider {
      border: 0;
      height: 5px;
      width: 80%;
      margin: auto;
    }

    .meta {}

    .actions {}
  }
</style>
