<template>
    <div class="goods">
        <get-goods-list />
    </div>
</template>

<script>
import getGoodsList from '@/components/boss/goods/getGoodsList.vue';
export default {
    components: {
        getGoodsList
    }
}
</script>

<style scoped>
.goods {
    margin: 5rem 1rem;
}
</style>