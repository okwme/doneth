<template>
  <section class="page-card bk-green embed-cont">
    <h3>Embeddable Donations for your website!</h3>
    <p>Copy & Paste the following code snippet, and add it inline.</p>

    <div class="embed-preview">
      <div class="left">
        <textarea rows="8" cols="40" v-text="codeSnippet"></textarea>
      </div>
      <div class="right" id="embedHere">
        <div v-html="htm"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

  name: 'EmbedHelper',
  props: ['address'],
  data () {
    return {
      htm: ''
    }
  },
  computed: {
    codeSnippet () {
      return this.htm
    }
  },
  mounted () {
    this.iframePreview()
  },
  methods: {
    iframePreview () {
      let mainurl = `https://doneth.org/${this.address}`
      // let mainurl = `http://localhost:8080/${this.address}`
      let url = `${mainurl}/donate-button`
      this.htm = `<iframe src="${url}" width="305px" height="100px"></iframe>`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .embed-cont {
    overflow: hidden;

    h3 {
      display: block;
      margin: 0 auto;
      font-size: 16pt;
      padding: 10px 15px;
      text-align: left;
    }

    p {
      padding: 0px 20px 10px;
    }
  }

  .embed-preview {
    background: darken($white, 3%);
    display: flex;
    padding: 20px 10px;

    .left,
    .right {
      flex:1;
      display: flex;
      padding: 0 10px;
    }

    .right {
      display: flex;
      width: 100%;

      div {
        display: flex;
        width: 100%;
      }
    }

    textarea {
      background: $white;
      border-radius: 3px;
      border-color: $lightgrey;
      resize: none;
      width: 100%;
    }

    a {
      display: block;
      margin: auto;
    }

    iframe {
      margin: auto;
    }
  }

</style>
