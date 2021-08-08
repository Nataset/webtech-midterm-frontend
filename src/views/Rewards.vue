<template>
    <div>
        <div class="container-fluid text-center">
            <jumbotron></jumbotron>
            <modal name="edit" :width="500" :height="320" :adaptive="true">
                <form class="container mt-3" v-on:submit.prevent="onEdit">
                    <div class="mb-3 col-9 mx-auto">
                        <label class="form-label">Name of New Reward</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="editFrom.name"
                            placeholder="Enter Name (text)"
                        />
                    </div>
                    <div class="mb-3 col-9 mx-auto">
                        <label class="form-label">Amount of Point to Redeem it</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="editFrom.point"
                            placeholder="Enter Point (number)"
                        />
                    </div>
                    <div class="mb-3 col-9 mx-auto">
                        <label class="form-label">amount of Stock of Reward</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="editFrom.stock"
                            placeholder="Enter Stock (number)"
                        />
                    </div>
                </form>
                <button class="btn btn-success d-inline w-25 mx-5" @click="onEdit">Edit</button>
                <button class="btn btn-danger d-inline w-25 mx-5" @click="onCancel">Cancel</button>
            </modal>
            <div class="container" id="flex">
                <reward
                    v-for="(reward, index) in availableReward"
                    v-bind:key="index"
                    :reward="reward"
                    :endPoint="endPoint"
                    @send="updateEdit"
                    @send2="setReward"
                ></reward>
                <reward-add v-if="isAdmin()" @send="updateAdd"></reward-add>
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
            editReward: '',
            editFrom: {
                id: '',
                name: '',
                point: '',
                stock: '',
            },
        };
    },
    async created() {
        await this.initData();
    },
    methods: {
        async updateAdd(childData) {
            // await this.initData();
            location.reload();
        },

        updateEdit(childData) {
            location.reload();
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

        setReward(reward) {
            this.editFrom = {
                id: reward.id,
                name: reward.name,
                point: reward.point,
                stock: reward.stock,
            };
        },

        async onEdit() {
            if (this.checkEditInput()) {
                await ShopStore.dispatch('EditReward', this.editFrom);
                const result = ShopStore.getters.getEditRewardResult;
                this.$modal.hide('edit');
                this.editFrom = '';
                result
                    ? this.$swal('Edit success', '', 'success').then(() => this.updateEdit())
                    : this.$swal("Something went wrong can't Edit reward", '', 'error');
            } else {
                this.$swal('Invalid Input', '', 'error');
            }
        },

        onCancel() {
            this.$modal.hide('edit');
        },

        checkEditInput() {
            const name = this.editFrom.name;
            const point = this.editFrom.point;
            const stock = this.editFrom.stock;

            return (
                name !== '' &&
                point !== '' &&
                parseFloat(point) &&
                point >= 0 &&
                stock !== '' &&
                parseFloat(stock) &&
                stock >= 0
            );
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
