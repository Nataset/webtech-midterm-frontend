import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import AuthService from '@/services/AuthService';

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
    },
    getters: {
        getAllUser: state => state.allUser,
        getCurrentUser: state => state.currentUser,
        getProductList: state => state.product,
        getRewardList: state => state.reward,
        getEndPoint: state => state.endPoint,
        isAuthen: state => state.currentUser.isAuthen,
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
            console.log(state.currentUser);
        },
        setMoney(state, money) {
            state.currentUser.user.money = money;
            console.log(currentUser);
        },
        updateUser(state, user){
            // console.log(state.currentUser.user);
            state.currentUser.user = user;
            // console.log(state.currentUser.user);
        }
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
            console.log(payload);
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
        async fetchCurrentUser({commit}){
            let res = await AuthService.fetchUser()
            // console.log(res);
            commit('updateUser',res)
        }
    },
    modules: {},
});
