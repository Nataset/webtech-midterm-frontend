<template>
  <div>
    <div class="container-fluid">
      <jumbotron></jumbotron>
    </div>
    <div class="container" id="flex">
      <product
        v-for="(product, index) in availableProducts"
        v-bind:key="index"
        :product="product"
        :endPoint="endPoint"
      ></product>
    </div>
  </div>
</template>

<script>
import Jumbotron from "./../components/home/Jumbotron.vue";
import Product from "../components/home/Product.vue";
import ShopStore from "@/store/Shop";

export default {
  name: "Home",
  components: { Jumbotron, Product },
  data: () => {
    return {
      currentUser: [],
      availableProducts: [],
      allProducts: [],
      endPoint: "",
    };
  },
  async created() {
    await this.initData();
    // console.log(this.currentUser);
  },
  methods: {
    async initData() {
      await ShopStore.dispatch("fetchAllproduct");
      await ShopStore.dispatch("fetchAllreward");
      if (this.isAuthen() === true) {
        await ShopStore.dispatch("fetchCurrentUser");
      }
      this.fetchProductData();
      this.getCurrent();
      this.getEndPoint();
    },
    fetchProductData() {
      this.allProducts = ShopStore.getters.getProductList;
      this.allProducts.forEach((product) => {
        if (product.available) this.availableProducts.push(product);
      });
    },
    getEndPoint() {
      this.endPoint = ShopStore.getters.getEndPoint;
    },
    getCurrent() {
      this.currentUser = ShopStore.getters.getCurrentUser;
    },
    isAuthen() {
      return ShopStore.getters.isAuthen;
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