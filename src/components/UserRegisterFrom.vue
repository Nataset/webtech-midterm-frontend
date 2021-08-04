<template>
  <div align='center'>
      <h2>Register</h2>
      <form @submit.prevent="register">
      <table>
          <tr>
              <td>Username : </td>
              <td><input type="text" name="username" v-model="registerForm.username" autocomplete="off" placeholder="username"></td>
          </tr>
          <tr>
              <td>Password :</td>
              <td><input type="password" name="password" v-model="registerForm.password" autocomplete="off" placeholder="password"></td>
          </tr>
          <tr>
              <td>Confrim Password :</td>
              <td><input type="password" name="confrimPass" v-model="confirm_password" autocomplete="off" placeholder="confirm password"></td>
          </tr>
          <tr>
              <td>Email :</td>
              <td><input type="email" name="email" v-model="registerForm.email" autocomplete="off" placeholder="email"></td>
          </tr>
            <tr>
              <td>Address :</td>
              <td><input type="text" name="lastname" v-model="registerForm.address" autocomplete="off" placeholder="address"></td>
          </tr>
          <tr>
              <td>Firstname :</td>
              <td><input type="text" name="firstname" v-model="registerForm.firstname" autocomplete="off" placeholder="firstname"></td>
          </tr>
          <tr>
              <td>Lastname :</td>
              <td><input type="text" name="lastname" v-model="registerForm.lastname" autocomplete="off" placeholder="lastname"></td>
          </tr>
      </table>
      <button>Submit</button>
      </form>
  </div>
</template>

<script>
import ShopStore from '@/store/Shop'
export default {
    data(){
        return {
            allUser: [],
            currentUser:'',
            edit: false,
            confirm_password:'',
            registerForm:{
                username:'',
                password:'',
                email:'',
                address:'',
                firstname:'',
                lastname:'',
                money:0,
                Allpoint:0,
            }
        }
    },
    methods: {
        async register(){
            if(this.checkNull()){
                if(this.registerForm.password === this.confirm_password){
                    let res = await ShopStore.dispatch('register',this.registerForm)
                    if(res.success){
                        this.$swal("Register Success", `Welcome ${res.user.username}`, "success")
                        this.$router.push("/")
                    }else{
                        this.$swal("Register Failed", res.message, "error")
                    }
                }
                else{
                    this.$swal("Register Failed","Your password and confirm password is not match!","error")
                }
            }
            else{
                this.$swal("Register Failed","Please check that the information you have entered is complete.","error")
            }
        },
        checkNull(){
            return (this.registerForm.username !== '' && this.registerForm.password !== '' && this.registerForm.email !== '' &&
                    this.registerForm.address !== '' && this.registerForm.firstname !== '' && this.registerForm.lastname !== '')
        },
    }
}
</script>

<style>

</style>