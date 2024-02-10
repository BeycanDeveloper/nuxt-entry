<template>
    <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Blog list</h1>
        <div v-if="blogList.length > 0">
            <NuxtLink :to="'/blog/'+ item.slug" v-for="item in blogList" :key="item.slug">
                <div class="space-y-6 mb-5">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-xl font-semibold">{{ item.title }}</h2>
                        <p class="text-gray-700 mt-2">{{ item.content }}</p>
                    </div>
                </div>
            </NuxtLink>
        </div>
        <div v-else>
            <div class="space-y-6" >
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p class="text-gray-700">Not found any blog post!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: 'container'
    });
    const blog = useBlogStore();
    const blogList = await blog.list;
</script>