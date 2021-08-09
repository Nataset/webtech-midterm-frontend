<template>
    <div class="mb-4" id="flex-content">
        <img v-bind:src="picURL" class="mt-4" width="250" height="250" />
        <h4 class="mt-3">{{ title }}</h4>
        <h5 class="mt-1">Point: {{ point }}</h5>
        <div class="d-grid gap-2 col-8 mx-auto">
            <button type="button" class="btn btn-danger mb-4" @click="buyReward" v-if="!isAdmin()">
                REDEEM NOW!!
            </button>
            <button
                type="button"
                class="btn btn-primary mt-4 mb-1"
                @click="showEdit"
                v-if="isAdmin()"
            >
                Edit
            </button>
            <button
                type="button"
                class="btn btn-danger mb-4"
                @click="deleteReward"
                v-if="isAdmin()"
            >
                Delete
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import ShopStore from '@/store/Shop';

export default {
    name: 'Reward',
    props: ['reward', 'endPoint'],
    data() {
        return {
            placeholder: 'https://via.placeholder.com/250x250',
            title: '',
            point: '',
            picURL: '',
            currentUser: '',
            redeemFrom: {
                user: '',
                reward: '',
                time: '',
            },
            pointFrom: {
                type: '',
                amount: '',
                reward: '',
                user: '',
            },
            updateUserAllPoint: {
                id: 0,
                allPoint: 0,
                money: 0,
            },
            newRedeem: '',
            newPoint: '',
            editFrom: {
                name: '',
                point: '',
                stock: '',
            },
            updateRewardStock: {
                stock: 0,
                available: true,
                id: 0,
            },
        };
    },
    created() {
        this.validRewardData();
        this.fetchCurrentUserdata();
    },
    methods: {
        checkImage(url) {
            return axios.get(url).then(result => {
                return result.status == 200 ? true : false;
            });
        },

        async getValidImageUrl(url) {
            url = this.endPoint + url;
            return (await this.checkImage(url)) ? url : this.placeholder;
        },

        async validRewardData() {
            this.title = this.reward.name || 'reward TITLE';
            this.point = this.reward.point ? this.reward.point : 'REWARD POINT';
            this.picURL = this.reward.photo
                ? await this.getValidImageUrl(this.reward.photo.formats.small.url)
                : this.placeholder;
        },
        fetchCurrentUserdata() {
            this.currentUser = ShopStore.getters.getCurrentUser;
        },
        setRedeenFrom() {
            this.redeemFrom.reward = this.reward.id;
            this.redeemFrom.user = this.currentUser.user.id;
            this.redeemFrom.time = moment().format();
            // console.log(this.purchaseFrom);
        },
        setPointFrom() {
            this.pointFrom.type = 'REDEEM';
            this.pointFrom.amount = this.reward.point;
            this.pointFrom.redeem = this.newRedeem.redeem.id;
            this.pointFrom.user = this.currentUser.user.id;
            // console.log(this.pointFrom);
        },
        setUpdateUserAllPoint() {
            this.updateUserAllPoint.id = this.currentUser.user.id;
            this.updateUserAllPoint.allPoint =
                parseInt(this.currentUser.user.allPoint) - parseInt(this.reward.point);
            // console.log(this.updateUserAllPoint.allPoint);
            this.updateUserAllPoint.money = parseInt(this.currentUser.user.money);
        },
        setUpdateStock() {
            this.updateRewardStock.id = this.reward.id;
            this.updateRewardStock.stock = parseInt(this.reward.stock) - 1;
            if (this.updateRewardStock.stock <= 0) {
                this.updateRewardStock.available = false;
            }
        },
        isAuthen() {
            return ShopStore.getters.isAuthen;
        },
        isAdmin() {
            return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
        },
        async redeemReward() {
            this.setRedeenFrom();
            // console.log(this.redeemFrom);
            let res = await ShopStore.dispatch('createRedeem', this.redeemFrom);
            // console.log(res);
            this.newRedeem = ShopStore.getters.getNewRedeem;
            if (res.success) {
                this.setPointFrom();
                // console.log(this.pointFrom);
                let res2 = await ShopStore.dispatch('createPoint', this.pointFrom);
                // console.log(res2);
                if (res2.success) {
                    this.newPoint = ShopStore.getters.getNewPoint;
                    this.setUpdateUserAllPoint();
                    this.setUpdateStock();
                    // console.log(this.setUpdateUserAllPoint);
                    let res3 = await ShopStore.dispatch(
                        'updatePointAndMoneyToUser',
                        this.updateUserAllPoint,
                    );
                    if (res3.success) {
                        this.setUpdateStock();
                        let res4 = await ShopStore.dispatch(
                            'updateRewardStock',
                            this.updateRewardStock,
                        );
                        if (res4.success) {
                            this.$swal(
                                'Redeem Success',
                                `${this.currentUser.user.username} redeem ${this.reward.name}.`,
                                'success',
                            ).then(() => {
                                location.reload();
                            });
                        }
                    }
                }
            }
        },
        async buyReward() {
            swal({
                title: 'Are you sure?',
                text: 'Please check your point again.',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then(willBuy => {
                if (willBuy) {
                    if (this.isAuthen() === false) {
                        this.$swal(
                            'You are not logged in.',
                            'Please login and go to this page again',
                            'error',
                        );
                        this.$router.push('/login');
                    } else if (this.isAdmin() == true) {
                        this.$swal('You are Admin.', "You can't redeem shit too", 'error');
                    } else if (this.currentUser.user.allPoint < this.reward.point) {
                        this.$swal(
                            'Your point is not enough to buy',
                            'Please check and redeem again',
                            'error',
                        );
                    } else {
                        this.redeemReward();
                    }
                } else {
                }
            });
        },

        async deleteReward() {
            await ShopStore.dispatch('deleteReward', this.reward.id);
            const result = ShopStore.getters.getDeleteRewardResult;
            result
                ? this.$swal('Delete success', '', 'success').then(() => this.update(result))
                : this.$swal("Something went wrong can't delete reward", '', 'error');
        },

        update(result) {
            this.$emit('send', result);
        },
        showEdit() {
            this.$modal.show('edit');
            this.$emit('send2', this.reward);
        },

        hideEdit() {
            this.$modal.hide('edit');
        },

        onEdit() {},
        onCancel() {},
    },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');

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
    font-family: 'Questrial', sans-serif;
}

#flex-content::before {
    content: '';
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
