<template>
  <div class="mb-4" id="flex-content">
    <img
      src="./../../../public/photo/rublik.jpg"
      class="mt-4"
      width="250"
      height="250"
    />
    <h4 class="mt-3">RUBIK</h4>
    <h5 class="mt-1">Price: 500.00 Baht</h5>
    <div>
      <button type="button" class="btn btn-danger px-5 mb-4">
        &nbsp;&nbsp;&nbsp;&nbsp;BUY NOW!!&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Questrial&display=swap");

* {
  box-sizing: border-box;
}
#flex {
  display: flex;
  flex-wrap: wrap;
}

#flex-content {
  position: relative;
  width: 29%;
  margin-left: 4%;
  text-align: center;
  padding-top: 10px;
  font-family: "Questrial", sans-serif;
}

#flex-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  z-index: -1;
  background-color: white;
}
</style>