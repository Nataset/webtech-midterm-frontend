<template>
  <div class="mb-4" id="flex-content">
    <img v-bind:src="picURL" class="mt-4" width="250" height="250" />
    <h4 class="mt-3">{{ title }}</h4>
    <h5 class="mt-1">Point: {{ point }}</h5>
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
  name: "Reward",
  props: ["reward", "endPoint"],
  data() {
    return {
      placeholder: "https://via.placeholder.com/250x250",
      title: "",
      point: "",
      picURL: "",
    };
  },
  created() {
    this.validRewardData();
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

    async validRewardData() {
      this.title = this.reward.name || "reward TITLE";
      this.point = this.reward.point ? this.reward.point : "REWARD POINT";
      this.picURL = this.reward.photo
        ? await this.getValidImageUrl(this.reward.photo.formats.small.url)
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