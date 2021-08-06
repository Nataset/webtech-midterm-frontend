<template>
    <div class="scoreboard">
        <ol>
            <div class="title">
                <h3 >Highest user point</h3>
            </div>
            <li v-for="(user, index) in findTopList()" :key="index">
                <p class="username">{{ user.username }}</p>
                <p class="point">{{ user.point }} Point</p>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    props: {
        data: Array
    },
    methods: {
        findTopList() {
            var sortable = [];
            for(var i in this.data)
                sortable.push(this.data[i])
            sortable.sort((a, b) => b.point - a.point);
            return sortable;
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

.scoreboard {
  width: 480px;
  margin: 2em auto;
    ol {
        list-style-type: none;
        transform: translateX(-4%);
        .title {
            background-color: hsl(210, 45%, 24%);
            margin: 0;
            height: 50px;
            border-radius: 10px 10px 0 0;
            position: relative;
            overflow: hidden;
            z-index: 0;
            h3 {
                transform: translateY(25%);
                color: white;
            }
            &:after {
                position: absolute;
                content: '';
                width: 0;
                bottom: 0;
                background: black;
                height: 100%;
                left: 0;
                z-index: -1;
            }
            &:hover {
                cursor: pointer;
                &::after {
                    width: 120%;
                    left: -10%;
                    transform: skewX(15deg);
                    transition: .3s ;
                }
                h3 {
                    color: yellow;
                }
            }
        }
        li {
            position: relative;
            z-index: 1;
            font-size: 14px;
            counter-increment: scoreboard;
            padding: 1em ;
            height: 50px;
            cursor: pointer;
            background: hsl(358, 70%, 60%);
            color: white;
            
            &::before {
                content: counter(scoreboard);
                position: absolute;
                top: 10px;
                left: 30px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                color: $clr-red;
                background: white;
                border-radius: 20px;
                font-size: 1.5em;
            }
            .username {
                position: absolute;
                top: -18px;
                left: -10px;
                width: 100%;
                padding: 1em;
                font-size: 24px;
            }
            .point {
                position: absolute;
                top: -10px;
                right: 20px;
                padding: 1em 0;
                font-size: 20px;
            }   
            &:nth-child(2) {
                background: hsl(354, 80%, 45%);
            }
            &:nth-last-child(1) {
                border-radius: 0 0 10px 10px;
            }
            &:hover {
                transform: scaleX(1.08) scaleY(1.03);
                transition: .2s ease-in-out;
                border-radius: 0;
            }
        }
    }
}


    
</style>>

