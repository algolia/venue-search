<template>
  <div class="hello">
    <div class="m100p pos-rel">
      <i class="icon icon-search pos-abt v-center m-l-large text-lg color-logan"></i>
      <input class="h80 w100p fill-white radius6 block elevation1 b-n p-l-xxlarge" placeholder="Search something.. "></input>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="facets">
          <div class="facet">
            <div id="tags"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div id="hits">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div id="pagination"></div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
