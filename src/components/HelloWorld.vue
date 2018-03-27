<template>
  <ais-index
    :app-id="applicationId"
    :api-key="apiKey"
    :index-name="indexName"
  > 
    <div class="hello">
      <div class="spacer16"></div>

      <div class="m100p pos-rel">
        <i class="icon icon-search pos-abt v-center m-l-large text-lg color-logan"></i>
        <ais-search-box>
          <ais-input
            class="h80 w100p fill-white radius6 block elevation1 b-n p-l-xxlarge search-input"
            placeholder="Search the party landscape 🌈"
          />
        </ais-search-box>
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
            <ais-results>
              <template slot-scope="{ result }">
                <li class="result">
                  <strong>{{ result.name }}</strong>
                  <em>{{ result.location.address }}</em>
                  <em>{{ result.categories.name }}</em>
                </li>
              </template>
            </ais-results>
          </ul>
        </div>
        <div class="elevation1 p-large fill-white m-l-r-auto radius6 text-center flex-it-2">
          <gmap-map
            ref="map"
            :center="{lat:30, lng:-90.3}"
            :zoom="12"
            map-type-id="terrain"
            style="width: 100%; height: 100%;"
          >
            <ais-results>
              <template slot-scope="{ result }">
                <gmap-marker :position="result._geoloc"></gmap-marker>
              </template>
            </ais-results>
          </gmap-map>
        </div>
      </div>
      
      <div class="w100p">
        <div id="pagination">
          <ais-pagination></ais-pagination>
        </div>
      </div>
    </div>
  </ais-index>

</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      apiKey: '4b932dcfb48a5d22cfd59de26add8e2c',
      applicationId: 'Y8X7A3GQF1',
      indexName: 'venues'
    };
  },
  mounted() {
    this.$refs.map.resize();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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

.result {
  display: block;
  margin: 0;
  text-align: left;
}

.result em {
  display: block;
}

.search-input::placeholder {
  opacity: 0.5;
}
</style>
