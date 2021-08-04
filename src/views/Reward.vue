<template>
  <div>
    <div class="container-fluid">
      <jumbotron></jumbotron>
    </div>
  </div>
</template>

<script>
import Jumbotron from "../components/reward/Jumbotron.vue";
import Reward from "../components/reward/Reward.vue";
export default {
  name: "Reward",
  components: { Jumbotron, Reward },
};
</script>

<style>
</style>