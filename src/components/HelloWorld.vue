<template>

  <div class="hello">

    <div class="spacer16"></div>

    <div class="m100p pos-rel">
      <i class="icon icon-search pos-abt v-center m-l-large text-lg color-logan"></i>
      <input class="h80 w100p fill-white radius6 block elevation1 b-n p-l-xxlarge" placeholder="Search something.. "></input>
    </div>

    <div class="spacer16"></div>

    <div class="w100p">
      <div class="facets">
        <div class="facet">
          <div id="tags"></div>
        </div>
      </div>
    </div>

    <div class="flex-container flex-dir-row">
      <div class="elevation1 p-large fill-white m-l-r-auto radius6 text-center flex-it-2">
        <ul id="hits">
          <li v-for="result in results">
            {{ _hit.name }}
            {{ _hit.location.address }}
            {{ _hit.categories.name }}
          </li>
        </ul>
      </div>

      <div class="elevation1 p-large fill-white m-l-r-auto radius6 text-center flex-it-2">
        <gmap-map
          :center="{lat:10, lng:10}"
          :zoom="7"
          map-type-id="terrain"
          style="width: 300px; height: 300px"
        ></gmap-map>
      </div>
      <!-- <gmap-map
        :center="{lat:10, lng:10}"
        :zoom="12">
        <ais-index >
          <ais-results>
            <template scope="{ result }">
              <gmap-marker :position="result._geoloc"></gmap-marker>
            </template>
          </ais-results>
        </ais-index>
      </gmap-map> -->
    </div>

    
    <div class="w100p">
      <div id="pagination"></div>
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
