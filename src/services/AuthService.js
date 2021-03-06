import Axios from 'axios';

const auth_key = 'auth-shop';
let auth = JSON.parse(localStorage.getItem(auth_key));
const user = auth ? auth.user : '';
const jwt = auth ? auth.jwt : '';
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:1337';

export default {
    isAuthen() {
        return user !== '' && jwt !== '';
    },
    getApiHeader() {
        if (jwt !== '') {
            return {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            };
        }
        return {};
    },
    getUser() {
        return user;
    },

    getJwt() {
        return jwt;
    },
    async login({ username, password }) {
        try {
            let url = api_endpoint + '/auth/local';
            let body = {
                identifier: username,
                password: password,
            };
            let res = await Axios.post(url, body);
            if (res.status === 200) {
                // console.log(res.data);
                localStorage.setItem(auth_key, JSON.stringify(res.data));
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt,
                };
            } else {
                console.log('NOT 200', res);
            }
        } catch (e) {
            console.error(e);
            if (e.response.status === 400) {
                // console.log(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message,
                };
            }
        }
    },

    async register({ username, email, password, firstname, lastname, address, money, allPoint }) {
        try {
            let url = `${api_endpoint}/auth/local/register`;
            let body = {
                username: username,
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname,
                address: address,
                money: money,
                allPoint: allPoint,
            };
            let res = await Axios.post(url, body);
            if (res.status === 200) {
                localStorage.setItem(auth_key, JSON.stringify(res.data));
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt,
                };
            } else {
                console.log('NOT 200', res);
            }
        } catch (e) {
            if (e.response.status === 400) {
                // console.log(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message,
                };
            } else {
                return;
            }
        }
    },

    logout() {
        localStorage.removeItem(auth_key);
    },

    async fetchUser({ id }) {
        let url = api_endpoint + '/users/' + id;
        let header = this.getApiHeader();
        let res = await Axios.get(url, header);
        return res.data;
    },
};

// export const
