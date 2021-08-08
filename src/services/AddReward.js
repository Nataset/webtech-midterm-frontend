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
            if (res.status === 200) {
                return {
                    success: true,
                    photo: res.data[0],
                };
            } else {
                console.log('Error at upload image res', res);
            }
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
        console.log(image);
        const body = {
            name: name,
            point: point,
            stock: stock,
            photo: image.id,
        };
        try {
            const res = await axios.post(url, body, header);
            console.log(res);
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
};
