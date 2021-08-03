<template>
  <div align='center'>
      <div v-if="currentUser !== ''">
      <h2>User Profile</h2>
      <table>
          <tr>
              <td>Username</td>
              <td><label for="Username">{{ currentUser.user.username }}</label></td>
          </tr>
          <tr>
              <td>Name</td>
              <td><label for="Name">{{ currentUser.user.firstname +' '+ currentUser.user.lastname }}</label></td>
          </tr>
          <tr>
              <td>Email</td>
              <td><label for="Email">{{ currentUser.user.email }}</label></td>
          </tr>
          <tr>
              <td>Money</td>
              <td><label for="Money">{{ currentUser.user.money }}</label></td>
          </tr>
      </table>
      <h2>Point</h2>
    <h3>Total Point : {{ currentUser.user.allPoint }}</h3>
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
              </tr>
          </thead>
        <tbody>
            <tr v-for="(point,index) in currentUser.points" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ point.Time }}</td>
            <td>{{ point.Type }}</td>
            <td>{{ point.Amount }}</td>
            </tr>
        </tbody>
      </table>
      <h2>Purchased History</h2>
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Purchased Product Date</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
          </tbody>
      </table>
      <h2>Reward History</h2>
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Reward Name</th>
                  <th>Price</th>
                  <th>Purchased Reward Date</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
          </tbody>
      </table>
      </div>
      <div v-if="currentUser === ''">
          <h2>Please login.</h2>
          click this <button @click="goToLogin">Login</button> to go to login page.
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
        goToLogin(){
            this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>