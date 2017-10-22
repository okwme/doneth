<template>
  <div class="donate-embed">
    <button type="button" name="button" class="btn btn-white btn-outlined">
      <b>{{btntitle || 'Donate Ether'}}</b>
      <short-hash :hash="address"/>
    </button>
  </div>
</template>

<script>
import ShortHash from '@/components/ShortHash'
export default {

  name: 'DonateButton',
  props: ['address', 'btntitle'],
  data () {
    return {
    }
  },
  components: {
    ShortHash
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

</style>
