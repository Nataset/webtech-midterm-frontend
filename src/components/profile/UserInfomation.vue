<template>
  <div align="center">
    <div>
      <h2>User Profile</h2>
      <table>
        <tr>
          <td>Username</td>
          <td>
            <label for="Username">{{ currentUser.user.username }}</label>
          </td>
        </tr>
        <tr>
          <td>Name</td>
          <td>
            <label for="Name">{{
              currentUser.user.firstname + " " + currentUser.user.lastname
            }}</label>
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>
            <label for="Email">{{ currentUser.user.email }}</label>
          </td>
        </tr>
        <tr>
          <td>Address</td>
          <td>
            <label for="Money">{{ currentUser.user.address }}</label>
          </td>
        </tr>
        <tr>
          <td>Money</td>
          <td>
            <label for="Money">{{ currentUser.user.money }}</label>
          </td>
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
          <tr v-for="(points, index) in currentUser.user.points" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ setDateFormat(points.created_at) }}</td>
            <td>{{ points.type }}</td>
            <td>{{ points.amount }}</td>
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
          <tr
            v-for="(Purchased, index) in currentUser.user.purchases"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ Purchased.product.name }}</td>
            <td>{{ Purchased.product.price }}</td>
            <td>{{ setDateFormat(Purchased.time) }}</td>
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
          <tr
            v-for="(redeemed, redeemindex) in currentUser.user.redeems"
            :key="redeemindex"
          >
            <td>{{ redeemindex + 1 }}</td>
            <td>{{ redeemed.reward.name }}</td>
            <td>{{ redeemed.reward.point }}</td>
            <td>{{ setDateFormat(redeemed.time) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import ShopStore from "@/store/Shop";
export default {
  data() {
    return {
      allProduct: [],
      allReward: [],
      tableReward: [],
      currentUser: "",
      Form: {
        username: "",
        email: "",
        address: "",
        firstname: "",
        lastname: "",
        money: 0,
        Allpoint: 0,
      },
    };
  },
  created() {
    //เรียก modthod
    if (this.isAuthen() === false) {
      this.$swal(
        "You are not logged in.",
        "Please login and go to this page again",
        "error"
      );
      this.$router.push("/login");
    }
    this.fetchAllData();
    this.setProduct();
    this.setReward();
    // console.log(this.allReward);
  },
  methods: {
    fetchAllData() {
      this.currentUser = JSON.parse(
        JSON.stringify(ShopStore.getters.getCurrentUser)
      );
      this.allProduct = ShopStore.getters.getProductList;
      this.allReward = ShopStore.getters.getRewardList;
    },
    goToLogin() {
      this.$router.push("/login");
    },
    isAuthen() {
      return ShopStore.getters.isAuthen;
    },
    setProduct() {
      this.currentUser.user.purchases.forEach((element) => {
        let id = element.product;
        element.product = this.findProduct(id);
      });
    },
    findProduct(id) {
      let target = "";
      this.allProduct.forEach((element) => {
        if (element.id === id) {
          target = element;
        }
      });
      return target;
    },
    setReward() {
      this.currentUser.user.redeems.forEach((element) => {
        let id = element.reward;
        element.reward = this.findReward(id);
      });
    },
    findReward(id) {
      let target = "";
      this.allReward.forEach((element) => {
        if (element.id === id) {
          target = element;
        }
      });
      return target;
    },
    setDateFormat(date) {
      return moment(date).format("D MMM YYYY HH:mm:ss");
    },
  },
};
</script>

<style>
</style>