<template>
  <div>
    <div class="container-fluid">
      <jumbotron></jumbotron>
    </div>
    <div class="container" id="flex">
      <product
        v-for="(product, index) in products"
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
  data: () => {
    return {
      currentUser: [],
      products: [],
      endPoint: "",
    };
  },
  components: { Jumbotron, Product },
  async created() {
    await this.initData();
    console.log(this.currentUser);
  },
  methods: {
    async initData() {
      await ShopStore.dispatch("fetchAllproduct");
      await ShopStore.dispatch("fetchAllreward");
      this.fetchProductData();
      this.getCurrent();
      this.getEndPoint();
    },
    fetchProductData() {
      this.products = ShopStore.getters.getProductList;
    },
    getEndPoint() {
      this.endPoint = ShopStore.getters.getEndPoint;
    },
    getCurrent() {
      this.currentUser = ShopStore.getters.getCurrentUser;
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