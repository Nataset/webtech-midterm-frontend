<template>
  <div class="main-container">
    <h2 class="title">Login</h2>
    <form @submit.prevent="login" class="custom-form">
    <div>
        <label>Username :</label>
        <input type="text" v-model="loginFrom.username" placeholder="username">
    </div>  
    <div>  
        <label>Password :</label>
        <input type="password" v-model="loginFrom.password" placeholder="password">
    </div>
    <button>Login</button>
    
    </form>
  </div>
</template>

<script>
import ShopStore from '@/store/Shop'
import AuthService from '@/services/AuthService'
export default {
    data(){
        return {
            allUser: [],
            currentUser:'',
            loginFrom:{
                username:'',
                password:'',
            }
        }
    },
    methods: {
        async login(){
            let res = await AuthService.login(this.loginFrom)
             if (res.success){
                this.$swal("Login Success" , `Welcome, ${res.user.username}`,"success")
                // console.log(res.user);
                this.currentUser = res.user
                // console.log(this.currentUser);
                ShopStore.dispatch('setCurrentUser',this.currentUser)
                this.$router.push("/")
            }
            else{
                this.$swal("Login Failed" , res.message,"error");
            }
        },
        clearFrom(){
            this.loginFrom.username = ''
            this.loginFrom.password = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    text-align: center;
    .custom-form {
        width: 400px;
        label {
            width: 90px;
        }
        
    }
}



</style>>

