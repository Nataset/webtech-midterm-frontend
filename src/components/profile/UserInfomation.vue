<template>
    <div class="main-container">
        <div>
            <h2 class="title">User Profile</h2>
            <table class="table-container user">
                <tr>
                    <td>Username</td>
                    <td>{{ currentUser.user.username }}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>
                        {{ currentUser.user.firstname + ' ' + currentUser.user.lastname }}
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{{ currentUser.user.email }}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{{ currentUser.user.address }}</td>
                </tr>
                <tr>
                    <td>Money</td>
                    <td>{{ currentUser.user.money }} bath</td>
                </tr>
            </table>
        </div>
        <div>
            <h2 class="title">Point</h2>
            <h3 class="title">Total Point : {{ currentUser.user.allPoint }}</h3>
            <div class="scroll-wrap">
                <table class="table-container point">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(points, index) in currentUser.user.points" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ setDateFormat(points.created_at) }}</td>
                            <td>{{ points.type }}</td>
                            <td>{{ points.amount }} point</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <h2 class="title">Purchased History</h2>
            <div class="scroll-wrap">
                <table class="table-container purchase">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Purchased Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(Purchased, index) in currentUser.user.purchases" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ Purchased.product.name }}</td>
                            <td>{{ Purchased.product.price }} bath</td>
                            <td>{{ setDateFormat(Purchased.time) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <h2 class="title">Reward History</h2>
            <div class="scroll-wrap">
                <table class="table-container reward">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Reward Name</th>
                            <th>Price</th>
                            <th>Redeemed Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(redeemed, redeemindex) in currentUser.user.redeems"
                            :key="redeemindex"
                        >
                            <td>{{ redeemindex + 1 }}</td>
                            <td>{{ redeemed.reward.name }}</td>
                            <td>{{ redeemed.reward.point }} point</td>
                            <td>{{ setDateFormat(redeemed.time) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import ShopStore from '@/store/Shop';
export default {
    data() {
        return {
            allProduct: [],
            allReward: [],
            tableReward: [],
            currentUser: '',
            Form: {
                username: '',
                email: '',
                address: '',
                firstname: '',
                lastname: '',
                money: 0,
                Allpoint: 0,
            },
        };
    },
    created() {
        //เรียก modthod
        if (this.isAuthen() === false) {
            this.$swal('You are not logged in.', 'Please login and go to this page again', 'error');
            this.$router.push('/login');
        }
        this.fetchAllData();
        this.setProduct();
        this.setReward();
        // console.log(this.allReward);
    },
    methods: {
        async fetchAllData() {
            this.currentUser = JSON.parse(JSON.stringify(ShopStore.getters.getCurrentUser));
            console.log(this.currentUser);
            this.allProduct = ShopStore.getters.getProductList;
            this.allReward = ShopStore.getters.getRewardList;
        },
        goToLogin() {
            this.$router.push('/login');
        },
        isAuthen() {
            return ShopStore.getters.isAuthen;
        },
        setProduct() {
            this.currentUser.user.purchases.forEach(element => {
                let id = element.product;
                element.product = this.findProduct(id);
            });
        },
        findProduct(id) {
            let target = '';
            this.allProduct.forEach(element => {
                if (element.id === id) {
                    target = element;
                }
            });
            return target;
        },
        setReward() {
            this.currentUser.user.redeems.forEach(element => {
                let id = element.reward;
                element.reward = this.findReward(id);
            });
        },
        findReward(id) {
            let target = '';
            this.allReward.forEach(element => {
                if (element.id === id) {
                    target = element;
                }
            });
            return target;
        },
        setDateFormat(date) {
            return moment(date).format('D MMM YYYY HH:mm:ss');
        },
    },
};
</script>

<style lang="scss" scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
}
.main-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2em;
    margin: 1em auto;
    width: 1000px;
    h2,
    h3 {
        margin: 0.5em;
        text-align: center;
    }
    .table-container {
        text-align: left;
        overflow: hidden;
        width: 100%;
        margin: 0 auto;
        display: table;
        padding: 0 0 8em 0;
        border-radius: 10px;
        td,
        th {
            padding-bottom: 2%;
            padding-top: 2%;
            padding-left: 2%;
        }
        th {
            background-color: #1f2739;
            font-weight: bold;
            font-size: 1em;
            text-align: left;
            color: hsl(182, 70%, 65%);
        }
        tr:nth-child(odd) {
            background-color: #323c50;
        }
        tr:nth-child(even) {
            background-color: #2c3446;
        }
        td:first-child {
            color: #fb667a;
            min-width: 20px;
            text-align: center;
        }
        th {
            text-align: center;
        }
        tr {
            &:hover {
                background-color: #464a52;
                z-index: -1;
            }
        }
        td {
            color: white;
            padding-right: 0.5em;
            &:hover {
                cursor: pointer;
                background-color: yellow;
                color: black;
                font-weight: 700;
                box-shadow: #7f7c21 -1px 1px, #7f7c21 -2px 2px, #7f7c21 -3px 3px, #7f7c21 -4px 4px,
                    #7f7c21 -5px 5px, #7f7c21 -6px 6px;
                transform: translate3d(5px, -5px, 0);
                transition: 0.3s ease-out;
            }
        }
    }
    .user {
        width: fit-content;
        min-width: 300px;
        td {
            padding: 0.5em 1em;
            &:first-child {
                width: 100px;
            }
        }
    }
    .point {
        td {
            &:nth-child(2),
            &:nth-child(3) {
                text-align: center;
            }
            &:last-child {
                text-align: right;
                padding-right: 1em;
            }
        }
    }
    .purchase {
        td {
            padding-right: 0.5em;
            &:first-child {
                min-width: 25px;
            }
            &:nth-child(3) {
                text-align: right;
                padding-right: 0.5em;
            }
            &:last-child {
                text-align: center;
            }
        }
    }
    .reward {
        td {
            &:nth-child(3) {
                text-align: right;
            }
            &:last-child {
                text-align: center;
            }
        }
    }
    .title {
        color: white;
        font-weight: bold;
        font-family: Helvetica;
        text-transform: uppercase;
        margin: 0.5em;
        text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa,
            0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3),
            0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15);
    }
}
.scroll-wrap {
    display: block;
    height: 220px;
    overflow: auto;
    margin-top: 2em;
    border-radius: 6px;
}
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    background-color: #1f2739;
    box-shadow: inset 0 0 5px grey;
    border-radius: 30px;
}
::-webkit-scrollbar-thumb {
    background: hsl(182, 70%, 65%);
    border-radius: 30px;
}</style
>>
