<template>
  <div >
    <div class="topup-container" v-if="isAuthen()">
      <div class="card">
          <h2 class="card-title">Your Wallet Balance : </h2>
          <h3 class="card-text">{{ currentUser.money }} Bath</h3>
      </div>
      <div class="form-warp">
        <h4>Pumping Your Money</h4>
        <form @submit.prevent="addMoney">
            <div class="amount">
                <label>Amount:</label>
                <input v-model="form.amount" type="number" placeholder="0" />
            </div>
            <button type="submit">Add</button>
        </form>
      </div>
    </div>
    <div class="not-auth" v-if="!isAuthen()">
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
import ShopStore from "@/store/Shop";
export default {
  data() {
    return {
      form: { amount: "" },
      allUser: [],
      currentUser: [],
      currentMoney: 0,
    };
  },
  created() {
    this.currentUser = ShopStore.getters.getCurrentUser.user;
    this.currentMoney = this.currentUser.money;
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
          id: this.currentUser.id,
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
    checkAddValue(money) {
      if (money > 0) return true;
      else return false;
    },
  },
};
</script>

<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.topup-container {
  h2, h3 {
        margin: .5em;
  }
  .card {
      width: 50%;
      max-width: 500px;
      margin: 1em auto;
      height: 200px;
      position: relative;
      background: linear-gradient(#EB696D, #F0262D,);;
      color: white;
      
      &::before, &::after {
          content: '';
          position: absolute;
          border: 1px solid white;
          bottom: .8rem;
          right: .8rem;
      }
      &::before {
          top: 1rem;
      }
      &::after {
          left: 1rem;
      }
  }
  .card-title {
      font-size: 2.5rem;
      line-height: 1;
      margin-bottom: .5em;
      position: relative;
      z-index: 1;
      color: white;
      &::before {
          content: '';
          position: absolute;
          background: black;
          width: calc(100% + 4.5rem);
          top: -.1em;
          bottom: -.15em;
          left: -5rem;
          z-index: -1;
          box-shadow: inset -15px 0 10px -10px hsla(358, 84%, 55%, 0.6);
      }
      &::after {
          content: '';
          position: absolute;
          top: -.1em;
          bottom: -.15em;
          left: calc(100% + 1.25rem);
          width: 3rem;
          background: black;
          box-shadow: inset 12px 0 10px -10px hsla(358, 84%, 55%, 0.6);
      }
      
  }
  .card-text {
      text-align: right;
      padding: 1rem;
  }
  .form-warp {
      text-align: center;
      background: white;
      width: 50%;
      max-width: 500px;
      margin: 2em auto;
      border-radius: 4px;
      padding: 1em;
      h4 {
          margin-bottom: 1em;
      }
      .amount {
          margin: 1em;
          display: flex;
          justify-content: space-evenly;
          label {
              font-size: 1.5em
          }
          input {
              text-align: right;
              border-radius: 6px;
              outline: none;
              border: 2px solid gray;
              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin-right: 1em;
              }
              &:hover, &:focus {
                border: 2px solid black;
              }
          }
      }
      button {
          width: 80px;
          height: 45px;
          border-radius: 6px;
          border: 2px solid black;
          margin-top: 1em;
          background-color: hsl(358, 84%, 55%);
          font-weight: 700;
          color: white;
          &:hover {
              background-color: hsl(118, 72%, 35%);
              color: white;
              transform: scale(1.2);
              transition: ease-out .3s;
          }
      }
  }
}
.not-auth {
    text-align: center;
    margin: 1em;
}
    
</style>
