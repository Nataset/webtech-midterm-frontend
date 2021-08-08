<template>
  <div class="main-container">
      <h2 class="title">Register</h2>
      <form @submit.prevent="register" class="custom-form">
        <div class="container">
            <div>
                <label>Username : </label>
                <input type="text" name="username" v-model="registerForm.username" autocomplete="off" placeholder="username">
            </div>
            <div>
                <label>Password :</label>
                <input type="password" name="password" v-model="registerForm.password" autocomplete="off" placeholder="password">
            </div>
            <div>
                <label>Confrim Password :</label>
                <input type="password" name="confrimPass" v-model="confirm_password" autocomplete="off" placeholder="confirm password">
            </div>
            <div>
                <label>Email :</label>
                <input type="email" name="email" v-model="registerForm.email" autocomplete="off" placeholder="email">
            </div>
            <div>
                <label>Firstname :</label>
                <input type="text" name="firstname" v-model="registerForm.firstname" autocomplete="off" placeholder="firstname">
            </div>
            <div>
                <label>Lastname :</label>
                <input type="text" name="lastname" v-model="registerForm.lastname" autocomplete="off" placeholder="lastname">
            </div>
            <div>
                <label>Address :</label>
                <input type="text" name="lastname" v-model="registerForm.address" autocomplete="off" placeholder="address">
            </div>
        </div>
        <div class="btn">
            <button>Submit</button>
        </div>
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
                allpoint:0,
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

<style lang="scss" scoped>
.title {
    text-align: center;
}
.custom-form {
    padding: 0;
    div {
        margin: 0;
    }
    .btn {
        display: block;
        text-align: center;
        margin: 0;
        button {
            margin: 0 0 .5em 0;
        }
    }
}
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  div {
      display: flex;
      flex-direction: column;
      margin: .4em auto;
      input {
          width: 100%;
      }
      &:last-child {
          margin: .4em .5em;
          input {
              margin: 0 auto .4em auto;
              width: 208%;
          }
      }
      label {
          margin: 0;
      }
  }
}

</style>>

