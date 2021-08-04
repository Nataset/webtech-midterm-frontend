<template>
  <div>
    <div class="container-fluid">
      <jumbotron></jumbotron>
    </div>
    <div class="container" id="flex">
      <product
        v-for="(product, index) in products"
        v-bind:key="index"
        :title="product.name"
        :price="product.price.toFixed(2)"
        :picURL="'http://localhost:1337' + product.photo.formats.small.url"
      ></product>
    </div>
  </div>
</template>

<script>
import Jumbotron from "./../components/homepage/Jumbotron.vue";
import Product from "../components/homepage/Product.vue";
import ShopStore from "@/store/Shop";

export default {
  name: "Home",
  data: () => {
    return {
      products: [],
    };
  },
  components: { Jumbotron, Product },
  async created() {
    await ShopStore.dispatch("fetchAllproduct");
    await ShopStore.dispatch("fetchAllreward")
    this.fetchProductData();
  },
  methods: {
    fetchProductData() {
      this.products = ShopStore.getters.getProductList;
    },
  },
};
</script>

<style lang="scss" scoped>
#flex {
  display: flex;
  flex-wrap: wrap;
}
</style>