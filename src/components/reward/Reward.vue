<template>
  <div class="mb-4" id="flex-content">
    <img v-bind:src="picURL" class="mt-4" width="250" height="250" />
    <h4 class="mt-3">{{ title }}</h4>
    <h5 class="mt-1">Price: {{ price }} Bath</h5>
    <div>
      <button type="button" class="btn btn-danger px-5 mb-4">
        &nbsp;&nbsp;&nbsp;&nbsp;REDEEM NOW!!&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Product",
  props: ["product", "endPoint"],
  data() {
    return {
      placeholder: "https://via.placeholder.com/250x250",
      title: "",
      price: "",
      picURL: "",
    };
  },
  created() {
    // this.getValidImageUrl(this.picURL).then(
    //   (result) => (this.validImageUrl = result)
    // );
    this.validProductData();
  },
  methods: {
    checkImage(url) {
      return axios.get(url).then((result) => {
        return result.status == 200 ? true : false;
      });
    },

    async getValidImageUrl(url) {
      url = this.endPoint + url;
      return (await this.checkImage(url)) ? url : this.placeholder;
    },

    async validProductData() {
      this.title = this.product.name || "PRODUCT TITLE";
      this.price = this.product.price
        ? this.product.price.toFixed(2)
        : "PRODUCT PRICE";
      this.picURL = this.product.photo
        ? await this.getValidImageUrl(this.product.photo.formats.small.url)
        : this.placeholder;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Questrial&display=swap");

* {
  box-sizing: border-box;
}
#flex {
  display: flex;
  flex-wrap: wrap;
}

#flex-content {
  position: relative;
  width: 29%;
  margin-left: 4%;
  text-align: center;
  padding-top: 10px;
  font-family: "Questrial", sans-serif;
}

#flex-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  z-index: -1;
  background-color: white;
}
</style>