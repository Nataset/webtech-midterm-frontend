<template>
    <div id="app">
        <navbar></navbar>
        <router-view id="minHeight" />
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import FooterBar from './components/Footer.vue';
import 'bootstrap/scss/bootstrap.scss';
import '@popperjs/core';
import 'bootstrap';

export default {
    components: {
        Navbar,
        FooterBar,
    },
};
</script>

<style lang="scss">
body {
    background-color: #f2f2f2;
}

#minHeight {
    min-height: 700px;
    position: relative;
}

.min-height #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.title {
    color: white;
    font-weight: bold;
    font-family: Helvetica;
    text-transform: uppercase;
    margin: 0.5em;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa,
        0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3),
        0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
        0 20px 20px rgba(0, 0, 0, 0.15);
}
.custom-form {
    background-color: white;
    width: 500px;
    margin: 1em auto;
    padding: 1em;
    border-radius: 4px;
    box-shadow: 0px 2px 20px hsla(248, 78%, 19%, 0.4);
    div {
        margin: 1em;
        label {
            font-weight: 700;
            margin-right: 0.5em;
        }
        input {
            border-radius: 6px;
            width: 200px;
            outline: none;
            padding: 0 0.5em;
            border: 2px solid gray;
            line-height: 2;
            &:focus,
            &:hover {
                border: 2px solid hsl(248, 76%, 19%);
                border-radius: 6px;
            }
        }
    }
    button {
        padding: 0.3em 1.4em;
        margin-top: 0.5em;
        border: 0;
        border-radius: 20px;
        background-color: hsl(222, 94%, 53%);
        color: white;
        text-transform: uppercase;
        &:hover {
            cursor: pointer;
            background-color: hsl(222, 93%, 48%);
        }
    }
}
</style>
