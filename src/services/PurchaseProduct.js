import Axios from "axios"
import AuthService from "./AuthService"
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:1337'
const purchase = ''
const point = ''

export default {
    async createPurchase({user,product,time}){
        try {
            let url = `${api_endpoint}/purchases`
            let body = {
                user: user,
                product: product,
                time: time
            }
            let header = AuthService.getApiHeader()
            let res = await Axios.post(url, body, header)
            // console.log(res);
            if(res.status === 200){
                return {
                    success: true,
                    purchase: res.data,
                }
            }else{
                console.log("NOT 200", res);
            }
        } catch (e) {
            if(e.response.status === 400){
                // console.log(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                return {
                    success: false,
                }
            }
        }
    },

    async createPoint({type,amount,purchase,user}){
        try {
            let url = `${api_endpoint}/points`
            let body = {
                type: type,
                amount: amount,
                purchase: purchase,
                user: user
            }
            let header = AuthService.getApiHeader()
            let res = await Axios.post(url, body, header)
            if(res.status === 200){
                return {
                    success: true,
                    point: res.data,
                }
            }else{
                console.log("NOT 200", res);
            }
        } catch (e) {
            if(e.response.status === 400){
                // console.log(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                return {
                    success: false,
                }
            }
        }
    },

    async updatePointAndMoneyToUser({allPoint,money,id}){
        try {
            let url = api_endpoint+"/users/"+id
            let body = {
                allPoint:allPoint,
                money:money
            }
            let header = AuthService.getApiHeader()
            let res = await Axios.put(url, body, header)
            if(res.status === 200){
                return {
                    success: true,
                    user: res.data,
                }
            }else{
                console.log("NOT 200", res);
            }
        } catch (e) {
            if(e.response.status === 400){
                // console.log(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                return {
                    success: false,
                }
            }
        }
    },

    async createRedeem({user,reward,time}){
        try {
            let url = `${api_endpoint}/redeems`
            let body = {
                user: user,
                reward: reward,
                time: time
            }
            let header = AuthService.getApiHeader()
            let res = await Axios.post(url, body, header)
            // console.log(res);
            if(res.status === 200){
                return {
                    success: true,
                    redeem: res.data,
                }
            }else{
                console.log("NOT 200", res);
            }
        } catch (e) {
            if(e.response.status === 400){
                // console.log(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                return {
                    success: false,
                }
            }
        }
    }
}
