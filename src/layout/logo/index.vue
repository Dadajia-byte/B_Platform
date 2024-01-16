<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
    display: flex;
    align-items: center;
    height: $logoHight;
    width: 100%;
    color: white;
    padding: 20px;

    img {
        height: 40px;
        width: 40px;
    }

    p {
        font-size: $logoFontSize;
        margin-left: 10px;
    }

}
</style>