<template>
  <div align='center'>
      <h2>Login</h2>
      <form @submit.prevent="login">
      <table>
          <tr>
              <td>Username :</td>
              <td><input type="text" v-model="loginFrom.username"></td>
          </tr>
          <tr>
              <td>Password :</td>
              <td><input type="password" v-model="loginFrom.password"></td>
          </tr>
      </table>
      <div>
      <button>Login</button>
      <button @click="goToRegister">Register</button>
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
    },created(){
        //เรียก modthod
        // this.fetchAllUser()
    },
    methods: {
        async fetchAllUser(){
            //เรียก action ใน Store ใช่ Store.dispatch(ชื่อ action)
            await ShopStore.dispatch('fetchAlluser')
            this.allUser = ShopStore.getters.getAllUser
        },
        async login(){
            let res = await AuthService.login(this.loginFrom)
             if (res.success){
                alert("Login Success" + `Welcome, ${res.user.username}`)
                // console.log(res.user);
                this.currentUser = res.user
                // console.log(this.currentUser);
                ShopStore.dispatch('setCurrentUser',this.currentUser)
                this.clearFrom()
            }
            else{
                alert("Login Failed" + res.message);
            }
        },
        // login(){
        //     let found = false;
        //     this.allUser.forEach(element => {
        //         if(element.Username === this.loginFrom.username && element.Password === this.loginFrom.password)
        //         {
        //             this.currentUser = element;
        //             // console.log("login success. ID:" + element.id)
        //             found = true
        //         }
        //     });
        //     if(found){
        //         // console.log(this.currentUser)
        //         this.loginFrom.loginStatus = 'login success.'
        //         ShopStore.dispatch('setCurrentUser',this.currentUser)
        //         this.clearFrom()
        //     }
        //     else{
        //         // console.log("Invaild Username or password.Please check your username and password !.")
        //         this.loginFrom.loginStatus = 'Invaild Username or password.Please check your username and password !.'
        //     }
        // },
        goToRegister(){
            this.$router.push('/register')
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