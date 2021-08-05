<template>
  <div class="topup-container">
    <div v-if="isAuthen()">
      <h2>Your Total Value : {{ getCurrentMoney() }}</h2>
      <h3>Pumping Your Money</h3>
      <form @submit.prevent="addMoney">
        <div>
          <label>Amount:</label>
          <input v-model="form.amount" type="number" />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
    <div v-if="!isAuthen()">
      <h2>
        Please
        <router-link to="/login" class="me-4">
          <button
            type="button"
            class="btn btn-outline-dark px-3"
            style="font-family: Raleway"
          >
            LOGIN
          </button>
        </router-link>
        to add your money.
      </h2>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import ShopStore from "@/store/Shop";
export default {
  data() {
    return {
      form: { amount: 0 },
      allUser: [],
      currentUser: ShopStore.get,
      currentMoney: 0,
    };
  },
  created() {
    this.fetchAllUser();
  },
  methods: {
    isAuthen() {
      return ShopStore.getters.isAuthen;
    },

    async addMoney() {
      // console.log("amount: " + this.form.amount);
      // console.log("currMoney: " + this.currentMoney);
      if (this.checkAddValue(this.form.amount)) {
        let total =
          parseFloat(this.form.amount) + parseFloat(this.currentMoney);
        // console.log("total: " + total);
        let payload = {
          id: this.currentUser.user.id,
          money: total,
        };
        this.$swal(
          "Hehe Adding Success",
          `Adding ${this.form.amount}`,
          "success"
        );
        await ShopStore.dispatch("addMoney", payload);
        this.$router.push("/");
      } else {
        this.$swal(
          "Ahh Adding Failed",
          "Your need to pump more than 0.",
          "error"
        );
      }
    },
    async fetchAllUser() {
      await ShopStore.dispatch("fetchAllUser");
      this.allUser = ShopStore.getters.getAllUser;
      this.currentUser = ShopStore.getters.getCurrentUser;
    },
    getCurrentMoney() {
      this.allUser.forEach((e) => {
        // console.log(e.id+" money: "+e.money);
        if (e.id === this.currentUser.id) {
          // console.log(this.currentUser.id);
          this.currentMoney = e.money;
          // console.log(this.currentMoney);
        }
      });
      return this.currentMoney;
    },
    checkAddValue(money) {
      if (money > 0) return true;
      else return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.topup-container {
  text-align: center;
  h2,
  h3 {
    margin: 0.5em;
  }
}
</style>>

