<template>
  <div class="donate-cta">
    <section-header :title="'Donate & Help Us Out!'" class="cl-white"></section-header>
    <div class="cta-content">
      <div class="flex-2 cta-copy">
        <p>Want to help keep this project alive?<br>Send us some ether via this donation address, and it will go directly to development and maintenance, helping easy finanancial contracts remain in your control!<br>Keep being awesome! Your pals,</p>
        <ul>
          <li><a href="https://github.com/okwme" target="_blank"><img src="https://avatars3.githubusercontent.com/u/964052?s=460&v=4" alt="okwme"> <span>@okwme</span></a></li>
          <li><a href="https://github.com/trevorjtclarke" target="_blank"><img src="https://avatars2.githubusercontent.com/u/2633184?s=460&v=4" alt="trevorjtclarke"> <span>@trevorjtclarke</span></a></li>
          <li><a href="https://github.com/defactoknife" target="_blank"><img src="https://avatars2.githubusercontent.com/u/32988654?s=460&v=4" alt="defactoknife"> <span>@defactoknife</span></a></li>
        </ul>
      </div>
      <div class="flex-1 cta-action">
        <button type="button" name="button" class="btn btn-white btn-outlined">
          <b>Donate Ether</b>
          <short-hash :hash="address"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader'
import ShortHash from '@/components/ShortHash'
export default {

  name: 'DonateCta',

  data () {
    return {
      address: '0x0000000000000000000000000000000000001'
    }
  },
  components: {
    SectionHeader,
    ShortHash
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';
  section-header {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding-top: 10px;
    margin: 0 20px;

    h2 {
      color: $darkgrey;
      font-size: 18pt;
      text-align: left;
      padding: 10px 0px;
      margin: 0px;
    }

    &.cl-white h2 {
      color: $white;
    }
  }

  .cta-content {
    display: flex;
  }

  .cta-copy {}

  .cta-action {
    margin: auto;

    .btn {
      width: 80%;
    }
  }

  ul {
    display: flex;
    padding: 0 20px 20px;

    li {
      display: inline-flex;
      line-height: 23pt;
      margin-right: 20px;
    }

    a {
      color: $white;
      border: 1px solid white;
      border-radius: 40px;
      padding: 0 7px;
      text-decoration: none;
    }

    img {
      display: inline;
      border-radius: 50%;
      height: 18px;
      width: 18px;
      overflow: hidden;
      margin: 0 0 -3px 0;
    }
  }
</style>
