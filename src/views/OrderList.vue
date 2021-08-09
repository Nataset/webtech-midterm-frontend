<template>
    <div>
        <table class="table container mt-5 table-secondary text-center">
            <thead class="table-dark">
                <tr>
                    <th class="col-1" scope="col">id</th>
                    <th class="col-2" scope="col">Username</th>
                    <th class="col-2" scope="col ">Product</th>
                    <th class="col-4 text-start" scope="col">Address</th>
                    <th class="col-1" scope="col">Shipped</th>
                    <th class="col-1" scope="col "></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(purchase, index) in purchaseList" v-bind:key="index">
                    <td>{{ purchase.id }}</td>
                    <td>{{ purchase.user.username }}</td>
                    <td>{{ purchase.product.name }}</td>
                    <td class="text-start">{{ purchase.user.address }}</td>
                    <td>{{ purchase.shipped }}</td>
                    <td>
                        <button @click="purchaseShipped(purchase.id)" class="btn btn-primary">
                            Delivery
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="table container mt-5 mb-5 table-secondary text-center">
            <thead class="table-dark">
                <tr>
                    <th class="col-1" scope="col">id</th>
                    <th class="col-2" scope="col">Username</th>
                    <th class="col-2" scope="col ">Reward</th>
                    <th class="col-4 text-start" scope="col">Address</th>
                    <th class="col-1" scope="col">Shipped</th>
                    <th class="col-1" scope="col "></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(redeem, index) in redeemList" v-bind:key="index">
                    <td>{{ redeem.id }}</td>
                    <td>{{ redeem.user.username }}</td>
                    <td>{{ redeem.reward.name }}</td>
                    <td class="text-start">{{ redeem.user.address }}</td>
                    <td>{{ redeem.shipped }}</td>
                    <td>
                        <button @click="redeemShipped(redeem.id)" class="btn btn-primary">
                            Delivery
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
import ShopStore from '@/store/Shop';
import AuthService from '@/services/AuthService';
export default {
    name: 'orderList',
    data() {
        return {
            end_point: '',
            purchaseList: [],
            redeemList: [],
        };
    },
    watch: {
        firstName: function(val) {
            this.fullName = val + ' ' + this.lastName + 'test';
        },
        lastName: function(val) {
            this.fullName = this.firstName + ' ' + val;
        },
    },
    async created() {
        if (!this.isAdmin()) {
            this.$swal(
                'You are not logged in as Admin.',
                'Please login and go to this page again',
                'error',
            );
            this.$router.push('/login');
        }
        this.end_point = ShopStore.getters.getEndPoint;
        await ShopStore.dispatch('fetchPurchase');
        await ShopStore.dispatch('fetchRedeem');
        this.purchaseList = ShopStore.getters.getPurchaseList;
        this.redeemList = ShopStore.getters.getRedeemList;
        // console.log(this.purchaseList, this.redeemList);
        // console.log('Product');
        // console.log(
        //     this.purchaseList[0].id,
        //     this.purchaseList[0].user.username,
        //     this.purchaseList[0].product.name,
        //     this.purchaseList[0].user.address,
        // );
    },
    methods: {
        async purchaseShipped(id) {
            const url = this.end_point + '/purchases' + '/' + id;
            const header = AuthService.getApiHeader();
            const body = {
                shipped: true,
            };
            try {
                const res = await axios.put(url, body, header);
                if (res.status !== 200) throw "error can't change shipped";
                this.purchaseList = this.purchaseList.map(item => {
                    if (item.id === id) item.shipped = true;
                    return item;
                });
            } catch (e) {
                console.error(e);
            }
        },

        async redeemShipped(id) {
            const url = this.end_point + '/redeems' + '/' + id;
            const header = AuthService.getApiHeader();
            const body = {
                shipped: true,
            };
            try {
                const res = await axios.put(url, body, header);
                if (res.status !== 200) throw "error can't change shipped";
                this.redeemList = this.redeemList.map(item => {
                    if (item.id === id) {
                        item.shipped = true;
                        console.log(item);
                    }
                    return item;
                });
            } catch (e) {
                console.error(e);
            }
        },
        isAdmin() {
            return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
        },
    },
};
</script>
<style></style>
