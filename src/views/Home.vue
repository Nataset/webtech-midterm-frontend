<template>
  <div>
    <div class="container-fluid">
      <jumbotron></jumbotron>
    </div>
    <div class="container" id="flex">
      <product v-for="index in product" v-bind:key="index"></product>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Jumbotron from "./../components/homepage/Jumbotron.vue";
import Product from "../components/homepage/Product.vue";
import FooterBar from "../components/Footer.vue";

export default {
  name: "Home",
  data: () => {
    return {
      product: [0, 1, 2, 3, 4, 5, 6, 7],
    };
  },
  components: { Jumbotron, Product, FooterBar },
};
</script>

<style lang="scss" scoped>
#flex {
  display: flex;
  flex-wrap: wrap;
}
</style>