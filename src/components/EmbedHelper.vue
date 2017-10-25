<template>
  <section class="page-card bk-green embed-cont">
    <h3>Embeddable Donations for your website!</h3>
    <p>Copy & Paste the following code snippet, and add it inline.</p>

    <div class="embed-preview">
      <div class="left">
        <textarea rows="4" cols="40" v-text="codeSnippet"></textarea>
      </div>
      <div class="right" id="embedHere">
        <div v-html="htm"></div>
      </div>
      <div class="left">
        <textarea rows="4" cols="40" v-text="codeSnippetSmall"></textarea>
      </div>
      <div class="right" id="embedHere">
        <div v-html="htmSmall"></div>
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
      htm: '',
      htmSmall: ''
    }
  },
  computed: {
    codeSnippet () {
      return this.htm
    },
    codeSnippetSmall () {
      return this.htmSmall
    }
  },
  mounted () {
    this.iframePreview()
  },
  methods: {
    iframePreview () {
      // let mainurl = `https://doneth.org/${this.address}`
      let mainurl = `http://localhost:8080/${this.address}`
      let url = `${mainurl}/donate-button`
      let urlSmall = `${mainurl}/donate-button-small`
      this.htm = `<iframe border="0" src="${url}" width="305px" height="50px"></iframe>`
      this.htmSmall = `<iframe border="0" src="${urlSmall}" width="130px" height="28px"></iframe>`
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
    flex-wrap: wrap;
    padding: 20px 10px;

    .left,
    .right {
      flex:1 1 50%;
      display: flex;
      padding: 0 10px;
      max-width: 47%;
      margin-bottom: 20px;
    }

    .right {
      display: flex;
      width: 100%;

      div {
        display: flex;
        justify-content: center;
        margin: auto;
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
