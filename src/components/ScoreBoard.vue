<template>
    <div class="scoreboard">
        <ol>
            <div class="header">
                <h3 >Highest Point</h3>
            </div>
            <li v-for="(user, index) in findTopList()" :key="index">
                <img class="crown" v-if="index===0" src="https://image.flaticon.com/icons/png/512/1198/1198990.png" alt="crown-icon">
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
        .header {
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
                font-weight: 700;
                text-transform: uppercase;
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
                left: 50px;
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
                background-color: black;
            }
        }
    }
    .crown {
        box-sizing: border-box;
        position: absolute;
        top: 15%;
        left: 2%;
        width: 32px;
        height: 32px;
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        animation-iteration-count: infinite;
        animation-duration: 2s;
        animation-delay: 0s;
        animation-timing-function: linear ;
    }
    @keyframes shake {
        5%, 45% {
            transform: translate3d(-1px, 0, 0);
        }
        10%, 40% {
            transform: translate3d(2px, 0, 0);
        }
        15%, 25%, 35% {
            transform: translate3d(-4px, 0, 0);
        }
        20%, 30% {
            transform: translate3d(4px, 0, 0);
        }
    }
}
 


    
</style>>

