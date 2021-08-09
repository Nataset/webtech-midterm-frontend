<template>
    <div class="container" id="navbar">
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/profile">Profile</router-link>
    </div> -->
        <div class="container my-3">
            <div class="row">
                <div class="col display-4 align-self-center">
                    <label style="font-family: Fira Sans; color: #f3262d; font-weight: 600"
                        >BRAND</label
                    >
                    <label class="ms-3" style="font-family: Raleway">LOGO</label>
                </div>
                <div class="col align-self-center text-end">
                    <lable class="me-5" v-if="isAuthen()">
                        Username:
                        {{ currentUser ? currentUser.user.username : 'Fail to Load' }}</lable
                    >
                    <label class="me-2 text-danger" v-if="isAuthen() && !isAdmin()">
                        Money:
                        {{ currentUser ? currentUser.user.money.toFixed(2) : 'Fail to Load' }}
                    </label>

                    <label class="me-5 text-danger" v-if="isAuthen() && !isAdmin()"
                        >Point:
                        {{ currentUser ? currentUser.user.allPoint : 'Fail to Load' }}</label
                    >
                    <router-link to="/login" class="me-4" v-if="!isAuthen()"
                        ><button
                            type="button"
                            class="btn btn-outline-dark px-3"
                            style="font-family: Raleway"
                        >
                            LOGIN
                        </button>
                    </router-link>
                    <router-link to="/logout" class="me-4" v-if="isAuthen()"
                        ><button
                            type="button"
                            class="btn btn-outline-dark px-3"
                            style="font-family: Raleway"
                        >
                            LOGOUT
                        </button>
                    </router-link>
                    <router-link to="/register" class="me-3" v-if="!isAuthen()"
                        ><button
                            type="button"
                            class="btn btn-danger px-5"
                            style="font-family: Fira Sans"
                        >
                            REGISTER &nbsp;&nbsp;>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <ul class="navbar-nav mx-auto" style="font-family: Fira Sans; font-weight: 600">
                <li class="nav-item active text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/">Home </router-link>
                </li>
                <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/topup">Topup</router-link>
                </li>
                <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/reward">Reward</router-link>
                </li>
                <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/leaderboard"
                        >Leaderboard</router-link
                    >
                </li>
                <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/profile">Profile</router-link>
                </li>
                <li v-if="isAdmin()" class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/orderlist"
                        >Order List</router-link
                    >
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import 'bootstrap/scss/bootstrap.scss';
import '@popperjs/core';
import 'bootstrap';
import ShopStore from '@/store/Shop';

export default {
    data() {
        return {
            currentUser: [],
        };
    },
    created() {
        this.currentUser = ShopStore.getters.getCurrentUser;
    },
    methods: {
        isAdmin() {
            return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
        },
        isAuthen() {
            return ShopStore.getters.isAuthen;
        },
        setNewCurrentUser() {
            this.currentUser = ShopStore.getters.getCurrentUser;
        },
    },
    name: 'Navbar',
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
</style>
