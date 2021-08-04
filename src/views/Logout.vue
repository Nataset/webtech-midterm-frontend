<template>
    <div></div>
</template>

<script>
// import AuthService from '@/services/AuthService'
import ShopStore from '@/store/Shop'
export default {
    mounted(){
        // AuthService.logout()
        ShopStore.dispatch('logout')
        this.$router.push('/')
    }
}
</script>

<style>

</style>