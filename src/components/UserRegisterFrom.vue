<template>
  <div align='center'>
      <h2>Register</h2>
      <table>
          <tr>
              <td>Username : </td>
              <td><input type="text" name="username" v-model="registerForm.username"></td>
          </tr>
          <tr>
              <td>Password :</td>
              <td><input type="password" name="password" v-model="registerForm.password"></td>
          </tr>
          <tr>
              <td>Confrim Password :</td>
              <td><input type="password" name="comfrimPass"></td>
          </tr>
          <tr>
              <td>Email :</td>
              <td><input type="email" name="email" v-model="registerForm.email"></td>
          </tr>
          <tr>
              <td>Firstname :</td>
              <td><input type="text" name="firstname" v-model="registerForm.firstname"></td>
          </tr>
          <tr>
              <td>Lastname :</td>
              <td><input type="text" name="lastname" v-model="registerForm.lastname"></td>
          </tr>
      </table>
      <button>Submit</button>
  </div>
</template>

<script>
import ShopStore from '@/store/Shop'
export default {
    data(){
        return {
            allUser: [],
            currentUser:'',
            registerForm:{
                username:'',
                password:'',
                email:'',
                firstname:'',
                lastname:'',
                money:0,
                Allpoint:0,
                point:'',
                userType: 'USER'
            }
        }
    },created(){
        //เรียก modthod
        this.fetchAllData()
    },
    methods: {
        fetchAllData(){
            this.allUser = ShopStore.getters.getAllUser
            this.currentUser = ShopStore.getters.getCurrentUser
        },
        
    }
}
</script>

<style>

</style>