<template>
    <div class="bg-gray-100 min-h-screen">
        <Header />
        <slot />
    </div>
</template>

<script setup>
import Header from '~/components/AppHeader.vue'
</script>