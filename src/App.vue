<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/algolia-aerial@1.3.4/dist/aerial.css">
    <div class="w100p">
      <!-- <span class="text-heading">🎺🔎🍹🎷</span> -->
      <img src="./assets/necklace.png" width="30%" height="10%">
      <h1>Vue New Orleans</h1>
      <span class="text-bg">The most relevant search for 🍻 and 🎷</span>
    </div>

    <HelloWorld/>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
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

h1 {
  color:rgb(184,69,146) !important;
}

.text-bg {
  color: rgb(28,199,208)
}

</style>
