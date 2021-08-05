<template>
  <div>
    <div class="container-fluid">
      <jumbotron></jumbotron>
      <div class="container" id="flex">
        <reward
          v-for="(reward, index) in availableReward"
          v-bind:key="index"
          :reward="reward"
          :endPoint="endPoint"
        ></reward>
      </div>
    </div>
  </div>
</template>

<script>
import Jumbotron from "../components/reward/Jumbotron_reward.vue";
import Reward from "../components/reward/Reward.vue";
import ShopStore from "../store/Shop";
export default {
  name: "Rewards",
  components: { Jumbotron, Reward },
  data() {
    return {
      currentUser: [],
      availableReward: [],
      allReward: [],
      test: [1, 2, 3, 4],
      endPoint: "",
    };
  },
  async created() {
    await this.initData();
  },
  methods: {
    async initData() {
      await ShopStore.dispatch("fetchAllreward");
      this.fetchRewardData();
      this.getCurrectUser();
      this.getEndPoint();
      console.log(this.availableReward);
    },

    fetchRewardData() {
      this.allReward = ShopStore.getters.getRewardList;
      this.allReward.forEach((reward) => {
        if (reward.available) {
          this.availableReward.push(reward);
        }
      });
    },

    getCurrectUser() {
      if (ShopStore.getters.isAuthen)
        this.currentUser = ShopStore.getters.getCurrectUser;
    },

    getEndPoint() {
      this.endPoint = ShopStore.getters.getEndPoint;
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