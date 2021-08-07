<template>
  <div id="app">
    <navbar></navbar>
    <router-view id="minHeight" />
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import FooterBar from "./components/Footer.vue";
import "bootstrap/scss/bootstrap.scss";
import "@popperjs/core";
import "bootstrap";

export default {
  components: {
    Navbar,
    FooterBar,
  },
};
</script>

<style lang="scss">
body {
  background-color: #f2f2f2;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#minHeight {
  min-height: 940px;
}
</style>
