<template>
    <div class="task">
        <get-task-list />
        <router-view />
    </div>
</template>

<script>
import getTaskList from '@/components/boss/task/getTaskList.vue';
    export default {
        components: {
            getTaskList
        }
    }
</script>

<style scoped>
.task {
    margin: 6rem 1rem;
}
</style>