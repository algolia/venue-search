import Vue from 'vue';
import App from './App.vue';
import InstantSearch from 'vue-instantsearch';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(InstantSearch);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCdjcSqmKM2CdWDG1vXxVEc3Ml9b'
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
});
