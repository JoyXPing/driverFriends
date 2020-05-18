<template>
    <div class="task">
        <get-task-list />
    </div>
</template>

<script>
import getTaskList from '@/components/driver/task/getTaskList.vue';
    export default {
        components: {
            getTaskList
        }
    }
</script>

<style scoped>
.task {
    margin: 5rem 1rem;
}
</style>