<template>
    <div>
        <user-register-from class="center "></user-register-from>
    </div>
</template>

<script>
import UserRegisterFrom from '@/components/UserRegisterFrom.vue';
export default {
    components: { UserRegisterFrom },
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
