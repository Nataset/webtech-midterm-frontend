<template>
    <div>
        <h2>Leaderboard</h2>
        <!-- User view -->
        <ScoreBoard :data='allUser'/>
    </div>
  
</template>

<script>
import ShopStore from '@/store/Shop'
import AuthService from '@/services/AuthService.js'
import ScoreBoard from '@/components/ScoreBoard.vue'

export default {
  components: { ScoreBoard },
    component: {
        ScoreBoard,
    },
    data(){
        return {
            allUser: [],
            //currentUser: AuthService.getUser()
        }
    },
    created() {
        this.fetchAllUser();
        //console.log(this.currentUser);
    },
    methods: {
        async fetchAllUser() {
            await ShopStore.dispatch("fetchAllUser");
            this.allUser = ShopStore.getters.getAllUser;
        },
        
    },
    
}
</script>

<style>

</style>