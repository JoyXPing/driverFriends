<template>
    <div class="task">
        <get-demand-list />
    </div>
</template>

<script>
import getDemandList from '@/components/driver/demand/getDemandList.vue';
    export default {
        components: {
            getDemandList
        }
    }
</script>

<style scoped>
.task {
    margin: 5rem 1rem;
}
</style>