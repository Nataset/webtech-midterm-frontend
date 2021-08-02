<template>
  <div align='center'>
      <h2>Login</h2>
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
      <button @click="login">Login</button>
      <button @click="goToRegister">Register</button>
      </div>
      <div>
      <label for="loginStatus">{{ loginFrom.loginStatus }}</label>
      </div>
  </div>
</template>

<script>
import ShopStore from '@/store/Shop'
export default {
    data(){
        return {
            allUser: [],
            currentUser:'',
            loginFrom:{
                username:'',
                password:'',
                loginStatus:''
            }
        }
    },created(){
        //เรียก modthod
        this.fetchAllUser()
    },
    methods: {
        async fetchAllUser(){
            //เรียก action ใน Store ใช่ Store.dispatch(ชื่อ action)
            await ShopStore.dispatch('fetchAlluser')
            this.allUser = ShopStore.getters.getAllUser
        },
        login(){
            let found = false;
            this.allUser.forEach(element => {
                if(element.Username === this.loginFrom.username && element.Password === this.loginFrom.password)
                {
                    this.currentUser = element;
                    // console.log("login success. ID:" + element.id)
                    found = true
                }
            });
            if(found){
                // console.log(this.currentUser)
                this.loginFrom.loginStatus = 'login success.'
                ShopStore.dispatch('setCurrentUser',this.currentUser)
                this.clearFrom()
            }
            else{
                // console.log("Invaild Username or password.Please check your username and password !.")
                this.loginFrom.loginStatus = 'Invaild Username or password.Please check your username and password !.'
            }
        },
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