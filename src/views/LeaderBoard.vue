<template>
    <div class="main-container">
        <h2 class="title">Leaderboard</h2>
        <!-- User view -->
        <ScoreBoard :data='allUser'/>
    </div>
  
</template>

<script>
import ShopStore from '@/store/Shop'
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

<style lang="scss" scoped>
    .main-container{
        text-align: center;
        .title {
            margin: .5em;
        }
    }
</style>>

