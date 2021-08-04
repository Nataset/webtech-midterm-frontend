import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UserProfile from '@/views/UserProfile.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import LeaderBoard from '@/views/LeaderBoard.vue';
import Logout from '@/views/Logout.vue';
import Topup from '@/views/Topup.vue';
import Reward from '../views/Reward.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/profile',
        name: 'UserProfile',
        component: UserProfile,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/leaderboard',
        name: 'LeaderBoard',
        component: LeaderBoard,
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout,
    },
    {
        path: '/Topup',
        name: 'Topup',
        component: Topup,
    },
    {
        path: '/reward',
        name: 'Reward',
        component: Reward,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
