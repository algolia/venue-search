import Vue from 'vue';
import App from './App.vue'
import InstantSearch from 'vue-instantsearch';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(InstantSearch);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_MAPS_KEY,
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
});
