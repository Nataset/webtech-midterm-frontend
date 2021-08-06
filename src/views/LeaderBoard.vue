<template>
    <div class="main-container">
        <div class="title">Leaderboard</div>
        <!-- User view -->
        <form @submit.prevent="getSelectedData">
            <div class="date-selector">
                <div>
                    <label>From: </label>
                    <input type="date" v-model="startDate">
                </div>
                <div>
                    <label>To: </label>
                    <input type="date" v-model="endDate">
                </div>
            </div>
            <div>
                <button type="submit" class="submit-btn">submit</button>
                <button @click="reset" class="reset-btn">reset</button>
            </div>
        </form>
        <ScoreBoard :data='selectedData'/>
    </div>
  
</template>

<script>
import ShopStore from '@/store/Shop'
import ScoreBoard from '@/components/ScoreBoard.vue'
import moment from "moment";

export default {
  components: { ScoreBoard },
    component: {
        ScoreBoard,
    },
    data(){
        return {
            allUser: [],
            selectedData: [],
            startDate: "2021-08-01",
            endDate: moment().format("YYYY-MM-DD")
        }
    },
    async created() {
        await this.fetchAllUser();
        this.getSelectedData()
    },
    methods: {
        async fetchAllUser() {
            await ShopStore.dispatch("fetchAllUser");
            this.allUser = ShopStore.getters.getAllUser;
        },
        print(something) {
            console.log(something);
        },
        getSelectedData() {
            if(this.checkValidDate()) {
                this.selectedData = [];
                for(var i in this.allUser){
                    let username = this.allUser[i].username;
                    let data = { username: username, point: 0};
                    for(var j in this.allUser[i].points){
                        let type = this.allUser[i].points[j].type;
                        let amount = this.allUser[i].points[j].amount;
                        let date = Date.parse((this.allUser[i].points[j].created_at));
                        let start = Date.parse(this.startDate);
                        let end = Date.parse(moment(this.endDate).endOf('day'));
                        if(date >= start && date <= end){
                            (type === "RECEIVE") ? data.point += amount : data.point -= amount
                        }
                        // console.log("username: " + username +
                        //             " type: " + type + 
                        //             " amount: " + amount +
                        //             " date: " + date);
                        // console.log(data);
                        // console.log("start:" + start + ", end:" + end + ", date:" + date);
                    }
                    this.selectedData.push(data);
                }
                // console.log(this.selectedData);
            }
            else {
                this.$swal("Invalid date", "Try other date", "error");
                this.reset()
            }
        },
        reset() {
            this.startDate = "2021-08-01";
            this.endDate = moment().format("YYYY-MM-DD")
        },
        checkValidDate() {
            let start = Date.parse(this.startDate);
            let end = Date.parse(moment(this.endDate).endOf('day'));
            if(end < start)
                return false;
            else 
                return true;
        }
    }
}
</script>

<style lang="scss" scoped>

$clr-red: hsl(358, 84%, 55%);

*,
*::before,
*::after {
box-sizing: border-box;
}

.main-container{
    text-align: center;
    .title {
        color: white;
        font-size: 3em;
        font-weight: bold;
        font-family: Helvetica;
        text-transform: uppercase;
        margin: .5em;
        text-shadow: 
            0 1px 0 #ccc, 
            0 2px 0 #c9c9c9, 
            0 3px 0 #bbb, 
            0 4px 0 #b9b9b9, 
            0 5px 0 #aaa, 
            0 6px 1px rgba(0,0,0,.1), 
            0 0 5px rgba(0,0,0,.1), 
            0 1px 3px rgba(0,0,0,.3), 
            0 3px 5px rgba(0,0,0,.2), 
            0 5px 10px rgba(0,0,0,.25), 
            0 10px 10px rgba(0,0,0,.2), 
            0 20px 20px rgba(0,0,0,.15);
    }
    .date-selector {
        width: 500px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        label {
            margin: 0 .5em 1em 0;
            font-weight: 700;
        }
        
    }
    button {
        color: white;
        font-weight: 700;
        border: white 2px solid;
        text-transform: uppercase;
        padding: .5em;
        width: 100px;
        margin: .5em 1em 0 1em;
        &:hover {
            border-radius: 30px;
            transition: ease-in .2s;
            
        }
    }
    .submit-btn {
        background-color: $clr-red;
        &:hover {
            box-shadow: 0px 5px 20px rgba(228, 25, 25, 0.719);
        }
    }
    .reset-btn {
        background-color: hsl(130, 60%, 49%);
        &:hover {
            box-shadow: 0px 5px 20px rgba(59, 175, 29, 0.808);
        }
    }
}
</style>>

