import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import AuthService from '@/services/AuthService';
import PurchaseProduct from '../services/PurchaseProduct';
import AddReward from '../services/AddReward.js';

const end_point = process.env.SHOP_VUE_APP_SHOP_ENDPOINT || 'http://localhost:1337';

Vue.use(Vuex);

let auth_key = 'auth-shop';
let auth = JSON.parse(localStorage.getItem(auth_key));
const initialStateUser = {
    user: auth ? auth.user : '',
    jwt: auth ? auth.jwt : '',
    isAuthen: auth ? true : false,
};

export default new Vuex.Store({
    state: {
        currentUser: initialStateUser,
        endPoint: end_point,
        allUser: [],
        product: [],
        reward: [],
        point: [],
        newPoint: '',
        newPurchase: '',
        newRedeem: '',
        newReward: '',
    },
    getters: {
        getAllUser: state => state.allUser,
        getCurrentUser: state => state.currentUser,
        getProductList: state => state.product,
        getRewardList: state => state.reward,
        getEndPoint: state => state.endPoint,
        getNewPoint: state => state.newPoint,
        getNewPurchase: state => state.newPurchase,
        getNewRedeem: state => state.newRedeem,
        getNewImage: state => state.newImage,
        getNewReward: state => state.newReward,
        isAuthen: state => state.currentUser.isAuthen,
        isAdmin: state => state.currentUser.user.role.type == 'admin',
    },
    mutations: {
        fetchAllUser(state, { res }) {
            state.allUser = res.data;
        },
        fetchProduct(state, { res }) {
            state.product = res.data;
        },
        fetchReward(state, { res }) {
            state.reward = res.data;
        },
        setCurrentUser(state, user, jwt) {
            (state.currentUser.user = user),
                (state.currentUser.jwt = jwt),
                (state.currentUser.isAuthen = true);
        },
        logoutSuccess(state) {
            (state.currentUser.user = ''),
                (state.currentUser.jwt = ''),
                (state.currentUser.isAuthen = false);
            // console.log(state.currentUser);
        },
        setMoney(state, money) {
            state.currentUser.user.money = money;
            // console.log(money);
            // console.log(currentUser);
        },
        updateUser(state, user) {
            // console.log(state.currentUser.user);
            state.currentUser.user = user;
            // console.log(state.currentUser.user);
        },
        setNewPoint(state, newPoint) {
            state.newPoint = newPoint;
        },
        setNewPurchase(state, newPurchase) {
            state.newPurchase = newPurchase;
            // console.log(state.newPurchase);
        },
        setNewRedeem(state, newRedeem) {
            state.newRedeem = newRedeem;
        },
        setNewImage(state, newImage) {
            state.newImage = newImage;
        },
        setNewReward(state, newReward) {
            state.reward.push(newReward);
        },
    },
    actions: {
        async fetchAllUser({ commit }) {
            let res = await axios.get(end_point + '/users');
            // console.log(res)
            commit('fetchAllUser', { res });
        },
        async fetchAllproduct({ commit }) {
            let res = await axios.get(end_point + '/products');
            // console.log(res)
            commit('fetchProduct', { res });
        },
        async fetchAllreward({ commit }) {
            let res = await axios.get(end_point + '/rewards');
            // console.log(res)
            commit('fetchReward', { res });
        },
        setCurrentUser({ commit }, payload) {
            // console.log(payload);
            commit('setCurrentUser', payload);
        },
        async login({ commit }, { username, password }) {
            let res = await AuthService.login({ username, password });
            if (res.success) {
                commit('setCurrentUser', res.user, res.jwt);
            }
            return res;
        },
        async logout({ commit }) {
            AuthService.logout();
            commit('logoutSuccess');
        },
        async register(
            { commit },
            { username, email, password, firstname, lastname, address, money, allPoint },
        ) {
            let res = await AuthService.register({
                username,
                email,
                password,
                firstname,
                lastname,
                address,
                money,
                allPoint,
            });
            if (res.success) {
                commit('setCurrentUser', res.user, res.jwt);
            }
            return res;
        },
        async addMoney({ commit }, { id, money }) {
            try {
                let url = end_point + '/users/' + id;
                let body = { money: money };
                let header = AuthService.getApiHeader();
                await axios.put(url, body, header);
            } catch (error) {
                console.log(error);
            }
            commit('setMoney', money);
        },
        async fetchCurrentUser({ commit }) {
            let res = await AuthService.fetchUser(this.state.currentUser.user);
            commit('updateUser', res);
        },
        async createPurchase({ commit }, { user, product, time }) {
            let res = await PurchaseProduct.createPurchase({ user, product, time });
            commit('setNewPurchase', res);
            return res;
        },
        async createPoint({ commit }, { type, amount, purchase, user }) {
            let res = await PurchaseProduct.createPoint({ type, amount, purchase, user });
            commit('setNewPoint', res);
            return res;
        },
        async updatePointAndMoneyToUser({ commit }, { allPoint, money, id }) {
            // console.log(id);
            let res = await PurchaseProduct.updatePointAndMoneyToUser({ allPoint, money, id });
            // console.log(res);
            // console.log(res.user);
            commit('setCurrentUser', res.user);
            return res;
        },
        async createRedeem({ commit }, { user, reward, time }) {
            let res = await PurchaseProduct.createRedeem({ user, reward, time });
            commit('setNewRedeem', res);
            return res;
        },

        async uploadImage({ commit }, image) {
            const res = await AddReward.uploadImage(image);
            commit('setNewImage', res.photo);
        },

        async AddReward({ commit }, body) {
            const res = await AddReward.createReward(body);
            if (res.success) commit('setNewReward', res.reward);
            else commit('setNewReward', false);
        },
    },
    modules: {},
});
