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

      
      
      <div class="w100p flex-dir-row">
        <ais-refinement-list attribute-name="categories.name"></ais-refinement-list>
      </div>

      <div class="flex-container flex-dir-row">
        <div class="elevation1 p-large fill-white m-l-r-auto radius6 text-center flex-it-2 hfull">
          <ul id="hits">
            <ais-results>
              <template slot-scope="{ result }">
                <li class="result">
                  <span class="name"><ais-highlight :result="result" attribute-name="name"></ais-highlight></span>
                  <p class="address">{{ result.location.address }}</p>
                </li>
              </template>
            </ais-results>
          </ul>
        </div>
        <div class="elevation1 p-large fill-white m-l-r-auto radius6 text-center flex-it-2 hfull">
          <gmap-map
            ref="map"
            :center="{lat:30, lng:-90.3}"
            :zoom="12"
            map-type-id="terrain"
            style="width: 600px; height: 800px;"
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
<style>
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
  font-style: bold;
}

.search-input::placeholder {
  opacity: 0.5;
}

.ais-results em {
  background-color: rgb(255,193,104);
}

.ais-highlight {
  color: rgb(184,69,146);
  font-weight: bold;
}

.ais-refinement-list {
  max-width: 70%;
  margin: 0 auto 40px auto;
  display: flex;
  justify-content: center;
}

.ais-refinement-list__count {
  display: none;
}

.ais-refinement-list__list {
}

.ais-refinement-list__item {
  margin: 0 16px 24px 0;
  float: left;
}

.ais-refinement-list__label {
  padding: 6px 24px;
  background: rgba(0,0,0,0.05);
  border-radius: 32px;
  color: #555;
  cursor:pointer;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background: rgba(0,0,0,0.1);
  }
}

.ais-refinement-list__checkbox {
  display: none;
}

.ais-refinement-list--item__active .ais-refinement-list--label {
  background: #00AEFF;
  color: #fff;
  
}

/* copied from the instantsearch theme located at
   https://cdn.jsdelivr.net/npm/instantsearch.js@2.2.0/dist/instantsearch-theme-algolia.css */
.ais-pagination {
  background: #FFFFFF;
  -webkit-box-shadow: 0 1px 1px 0 rgba(85, 95, 110, 0.2);
          box-shadow: 0 1px 1px 0 rgba(85, 95, 110, 0.2);
  border: solid 1px #D4D8E3;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  padding: 8px 16px;
  width: 0 auto; 
}

</style>