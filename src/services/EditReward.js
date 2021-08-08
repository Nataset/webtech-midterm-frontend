import axios from 'axios';
import AuthService from './AuthService';
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:1337';

export default {
    async uploadImage(image) {
        const url = `${api_endpoint}/upload`;
        const fd = new FormData();
        const header = AuthService.getApiHeader();
        fd.append('files', image);

        try {
            const res = await axios.post(url, fd, header);
            // console.log('From EditReward:', res);
            return res.status === 200
                ? {
                      success: true,
                      photo: res.data[0],
                  }
                : {
                      success: false,
                  };
        } catch (e) {
            if (e.response.status === 400) {
                return {
                    success: false,
                    message: e.response.data.message[0].message[0].message,
                };
            } else {
                return {
                    success: false,
                };
            }
        }
    },

    async createReward({ name, point, stock, image }) {
        const url = `${api_endpoint}/rewards`;
        const header = AuthService.getApiHeader();
        // console.log(image);
        const body = {
            name: name,
            point: point,
            stock: stock,
            photo: image.id,
        };
        try {
            const res = await axios.post(url, body, header);
            // console.log(res);
            if (res.status === 200) {
                return {
                    success: true,
                    reward: res.data,
                };
            } else {
                console.log('Error at create reward', res);
            }
        } catch (e) {
            if (e.response.status == 400) {
                return {
                    success: false,
                    message: e.response.data.message[0].message[0].message,
                };
            } else {
                return {
                    success: false,
                };
            }
        }
    },

    async deleteReward(id) {
        const url = `${api_endpoint}/rewards/${id}`;
        const header = AuthService.getApiHeader();
        const body = {
            available: false,
        };
        try {
            const res = await axios.put(url, body, header);
            // console.log(res);
            if (res.status !== 200) throw 'deleteReward fail at html res != 200';
            return {
                success: true,
                reward: res.data,
            };
        } catch {
            return {
                success: false,
            };
        }
    },

    async updateReward({ id, name, point, stock }) {
        // console.log(id);
        const url = `${api_endpoint}/rewards/${id}`;
        const header = AuthService.getApiHeader();
        const body = {
            name: name,
            point: point,
            stock: stock,
        };

        try {
            const res = await axios.put(url, body, header);
            if (res.status !== 200) throw 'edit error at html res != 200 ';
            return {
                success: true,
                reward: res.data,
            };
        } catch {
            return {
                success: false,
            };
        }
    },
};
