<template>
    <div class="mb-4" id="flex-content">
        <img v-bind:src="picURL" class="mt-4" width="250" height="250" />
        <h4 class="mt-3">{{ title }}</h4>
        <h5 class="mt-1">Price: {{ price }} Baht</h5>
        <div>
            <button type="button" class="btn btn-danger px-5 mb-4" @click="buyProduct">
                &nbsp;&nbsp;&nbsp;&nbsp;BUY NOW!!&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import ShopStore from '@/store/Shop';

export default {
    name: 'Product',
    props: ['product', 'endPoint'],
    data() {
        return {
            placeholder: 'https://via.placeholder.com/250x250',
            title: '',
            price: '',
            picURL: '',
            currentUser: '',
            purchaseFrom: {
                user: '',
                product: '',
                time: '',
            },
            pointFrom: {
                type: '',
                amount: '',
                purchase: '',
                user: '',
            },
            updateUserAllPoint: {
                id: 0,
                allPoint: 0,
                money: 0,
            },
            newPurchase: '',
            newPoint: '',
            updateProductStock: {
                stock: 0,
                available: true,
                id: 0,
            },
        };
    },
    created() {
        this.validProductData();
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

        async validProductData() {
            this.title = this.product.name || 'PRODUCT TITLE';
            this.price = this.product.price ? this.product.price.toFixed(2) : 'PRODUCT PRICE';
            this.picURL = this.product.photo
                ? await this.getValidImageUrl(this.product.photo.formats.small.url)
                : this.placeholder;
        },
        fetchCurrentUserdata() {
            this.currentUser = ShopStore.getters.getCurrentUser;
        },
        async buyProduct() {
            swal({
                title: 'Are you sure?',
                text: 'Please check your money',
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
                    } else if (this.isAdmin() === true) {
                        this.$swal('You are admin.', "You can't buy shit.", 'error');
                    } else if (this.currentUser.user.money < this.product.price) {
                        this.$swal(
                            'Your money is not enough to buy',
                            'Please topup and buy again',
                            'error',
                        );
                    } else {
                        this.purchaseProduct();
                    }
                } else {
                }
            });
        },
        setPurchaseFrom() {
            this.purchaseFrom.product = this.product.id;
            this.purchaseFrom.user = this.currentUser.user.id;
            this.purchaseFrom.time = moment().format();
            // console.log(this.purchaseFrom);
        },
        setPointFrom() {
            this.pointFrom.type = 'RECEIVE';
            this.pointFrom.amount = this.product.point;
            this.pointFrom.purchase = this.newPurchase.purchase.id;
            this.pointFrom.user = this.currentUser.user.id;
            // console.log(this.pointFrom);
        },
        setUpdateUserAllPoint() {
            this.updateUserAllPoint.id = this.currentUser.user.id;
            this.updateUserAllPoint.allPoint =
                parseInt(this.currentUser.user.allPoint) + parseInt(this.product.point);
            // console.log(this.updateUserAllPoint.allPoint);
            this.updateUserAllPoint.money =
                parseInt(this.currentUser.user.money) - parseInt(this.product.price);
        },
        setUpdateStock() {
            this.updateProductStock.id = this.product.id;
            this.updateProductStock.stock = parseInt(this.product.stock) - 1;
            if (this.updateProductStock.stock <= 0) {
                this.updateProductStock.available = false;
            }
        },
        isAuthen() {
            return ShopStore.getters.isAuthen;
        },
        isAdmin() {
            return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
        },
        async purchaseProduct() {
            this.setPurchaseFrom();
            let res = await ShopStore.dispatch('createPurchase', this.purchaseFrom);
            // console.log(res);
            this.newPurchase = ShopStore.getters.getNewPurchase;
            // console.log(this.newPurchase);
            if (res.success) {
                this.setPointFrom();
                // console.log(this.pointFrom);
                let res2 = await ShopStore.dispatch('createPoint', this.pointFrom);
                // console.log(res2);
                if (res2.success) {
                    this.newPoint = ShopStore.getters.getNewPoint;
                    this.setUpdateUserAllPoint();

                    // console.log(this.setUpdateUserAllPoint);
                    let res3 = await ShopStore.dispatch(
                        'updatePointAndMoneyToUser',
                        this.updateUserAllPoint,
                    );
                    console.log(res3.success);
                    if (res3.success) {
                        this.setUpdateStock();
                        let res4 = await ShopStore.dispatch(
                            'updateProductStock',
                            this.updateProductStock,
                        );
                        if (res4.success) {
                            this.$swal(
                                'Purchases Success',
                                `${this.currentUser.user.username} purchase ${this.product.name}.`,
                                'success',
                            ).then(() => {
                                location.reload();
                            });
                        }
                    }
                }
            }
        },
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
