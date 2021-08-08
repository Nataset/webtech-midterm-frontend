<template>
    <div>
        <div class="container-fluid text-center">
            <jumbotron></jumbotron>
            <div class="container" id="flex">
                <reward
                    v-for="(reward, index) in availableReward"
                    v-bind:key="index"
                    :reward="reward"
                    :endPoint="endPoint"
                ></reward>
                <reward-add v-if="isAdmin()" @send="receive"></reward-add>
            </div>
        </div>
    </div>
</template>

<script>
import Jumbotron from '../components/reward/Jumbotron_reward.vue';
import Reward from '../components/reward/Reward.vue';
import RewardAdd from '../components/reward/RewardAdd.vue';
import ShopStore from '../store/Shop';
export default {
    name: 'Rewards',
    components: { Jumbotron, Reward, RewardAdd },
    data() {
        return {
            currentUser: [],
            availableReward: [],
            allReward: [],
            endPoint: '',
        };
    },
    async mounted() {
        await this.initData();
    },
    methods: {
        receive() {
            this.initData();
        },

        async initData() {
            await ShopStore.dispatch('fetchAllreward');
            this.fetchRewardData();
            this.getCurrectUser();
            this.getEndPoint();
        },

        fetchRewardData() {
            this.availableReward = [];
            this.allReward = ShopStore.getters.getRewardList;
            this.allReward.forEach(reward => {
                if (reward.available) {
                    this.availableReward.push(reward);
                }
            });
        },

        getCurrectUser() {
            if (ShopStore.getters.isAuthen) this.currentUser = ShopStore.getters.getCurrentUser;
        },

        getEndPoint() {
            this.endPoint = ShopStore.getters.getEndPoint;
        },

        isAdmin() {
            return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
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
