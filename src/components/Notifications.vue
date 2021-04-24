<template>
  <div>
    <div id="note-fixed">
      <div id="note-relative">
        <div
        v-bind:key="note"
        v-for="note in notifications"
        @click="removeNotification(note.id)"
        :class="note.class"
        v-text="note.text"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

  name: 'Notifications',

  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['notifications'])
  },
  methods: {
    ...mapActions(['removeNotification'])
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';
#note-fixed {
  position: fixed;
  left:0px;
  bottom:0px;
  width:100%;
  z-index:999;
}
#note-relative {
  max-width:80vw;
  margin:auto;
  > div {
    margin:1em;
    padding:2em;
    border-radius: 5px;
    color: white;
    &.success {
      background-color: $primary;
    }
    &.error {
      background-color: $error;
    }
  }
}
</style>
