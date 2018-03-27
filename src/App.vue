<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/algolia-aerial@1.3.4/dist/aerial.css">
    <h1>🎺🎷🔎🍹</h1>
    <h1>For a good time, search {party}</h1>
    <span class="text-regular">hello alex</span>

    <HelloWorld/>
  </div>

</template>

<script>
import Vue from 'vue';
import HelloWorld from './components/HelloWorld';
import InstantSearch from 'vue-instantsearch';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCdjcSqmKM2CdWDG1vXxVEc3Ml9b-gJ2PU'
    // libraries: 'places', //// If you need to use place input
  }
});

Vue.use(InstantSearch);

export default {
  name: 'App',
  components: {
    HelloWorld
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
