<template>
    <div>
        <login-from class="center mb-5"></login-from>
    </div>
</template>

<script>
import LoginFrom from '@/components/LoginFrom.vue';
export default {
    components: { LoginFrom },
};
</script>

<style>
.center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
