<template>
    <h1>Dashboard</h1>
    <p>Welcome, {{ user.info.username }}</p>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'admin'
    })
    const user = useUserStore()
</script>

<style scoped>

</style>