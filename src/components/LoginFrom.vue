<template>
  <div align='center'>
      <h2>Login</h2>
      <form @submit.prevent="login">
      <table>
          <tr>
              <td>Username :</td>
              <td><input type="text" v-model="loginFrom.username" placeholder="username"></td>
          </tr>
          <tr>
              <td>Password :</td>
              <td><input type="password" v-model="loginFrom.password" placeholder="password"></td>
          </tr>
      </table>
      <div>
      <button>Login</button>
      </div>
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

<style>

</style>