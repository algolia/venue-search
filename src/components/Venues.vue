<template class="app-container">
  <ais-index
    v-if="loaded"
    :search-store="searchStore"
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
        <ais-refinement-list attribute-name="categories.title"></ais-refinement-list>
      </div>

      <div class="flex-container flex-dir-row">
        <div class="elevation1 p-large fill-white m-l-r-auto radius6 text-center flex-it-2  m-small">
          <ul id="hits">
            <ais-results>
              <template slot-scope="{ result }">
                <li class="result" @click="zoomOnPinLocation(result)">
                  <div class= "img-wrapper">
                    <img :src="result.image_url"/>
                  </div>
                  <div class="details">
                    <span class="name"><ais-highlight :result="result" attribute-name="name"></ais-highlight></span>
                    <p class="address">{{ result.location.address1 }}</p>
                    <p class="address">{{ result.location.address2 }}</p>
                    <p class="address">{{ result.location.city }}, {{ result.location.state }} {{ result.location.zip_code }}</p>
                  </div>
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
            style="width: 100%; height: 100vh;"
          >
            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
              {{infoContent}}
            </gmap-info-window>
            <ais-results>
              <template slot-scope="{ result, index }">
                <gmap-marker :position="result._geoloc" :clickable="true" @click="toggleInfoWindow(result, index)"></gmap-marker>
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
import { loaded } from 'vue2-google-maps';
import { createFromAlgoliaCredentials } from 'vue-instantsearch';

const searchStore = createFromAlgoliaCredentials(
  'Y8X7A3GQF1',
  '4b932dcfb48a5d22cfd59de26add8e2c'
);

export default {
  data() {
    return {
      loaded: false,
      searchStore,
      indexName: 'venues_search_test',
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  methods: {
    fitBounds() {
      const bounds = new google.maps.LatLngBounds();

      this.markers.forEach(marker => bounds.extend(marker._geoloc));
      this.$refs.map.fitBounds(bounds);
      this.$refs.map.panToBounds(bounds);
    },
    zoomOnPinLocation(venue) {
      let marker = this.markers.filter(
        marker => marker.objectID === venue.objectID
      );
      console.log(venue);
      console.log(marker);

      if (marker.length) {
        marker = marker[0];
      }

      const bounds = new google.maps.LatLngBounds();
      // const loc = new google.maps.LatLng(marker._geoloc.lat, marker._geoloc.lng);

      bounds.extend(marker._geoloc);
      console.log(bounds);

      this.$refs.map.fitBounds(bounds);
      this.$refs.map.panToBounds(bounds);
      this.toggleInfoWindow(marker, this.markers.indexOf(marker));
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker._geoloc;
      this.infoContent = marker.name;

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    }
  },
  computed: {
    markers() {
      return this.searchStore._results.map(result => ({
        objectID: result.objectID,
        name: result.name,
        _geoloc: result._geoloc
      }));
    }
  },
  mounted() {
    loaded.then(() => (this.loaded = true));
  },
  watch: {
    'searchStore._results': {
      handler() {
        this.fitBounds();
      }
    }
  }
};
</script>

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
  cursor: pointer;
  margin-bottom: 20px;
}

.result .details {
  display: inline-block;
}

.result .img-wrapper img {
  height: 100px;
  width: 100px;
  object-fit: cover;
  display: inline-block;
  border-radius: 50%;
}

.result .img-wrapper {
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  margin-right: 15px;
  border-radius: 2px;
}

.search-input::placeholder {
  opacity: 0.5;
}

.ais-results em {
  background-color: rgb(255, 255, 51);
}

.ais-highlight {
  color: rgb(184, 69, 146);
  font-weight: bold;
}

.ais-refinement-list {
  margin: 0 auto 40px auto;
  display: flex;
  justify-content: center;
  max-width: 60%;
  flex-wrap: inherit;
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
  white-space: nowrap;
}

.ais-refinement-list__value {
  padding: 6px 24px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 32px;
  color: #555;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}

.ais-refinement-list__checkbox {
  display: none;
}

.ais-refinement-list__item.ais-refinement-list__item--active
  .ais-refinement-list__value {
  background: rgb(184, 69, 146);
  color: #ffffff;
}

/* copied from the instantsearch theme located at
   https://cdn.jsdelivr.net/npm/instantsearch.js@2.2.0/dist/instantsearch-theme-algolia.css */
.ais-pagination {
  background: #ffffff;
  -webkit-box-shadow: 0 1px 1px 0 rgba(85, 95, 110, 0.2);
  box-shadow: 0 1px 1px 0 rgba(85, 95, 110, 0.2);
  border: solid 1px #d4d8e3;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  padding: 8px 16px;
  width: 0 auto;
}
</style>