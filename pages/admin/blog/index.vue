<template>
    <div class="blog-list">
        <ul v-if="blogList.length > 0">
            <li v-for="item in blogList" :key="item.slug">
                <h2>{{ item.title }}</h2>
            </li>
        </ul>
        <div v-else>
            <p>Not found any blog post!</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'admin',
        title: 'Blog list'
    });

    const blog = useBlogStore();
    const blogList = await blog.list;
</script>

<style scoped lang="scss">
    .blog-list {
        ul {
            list-style: none;
            padding: 0;
            li {
                margin-bottom: 20px;
                h2 {
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
    }
</style>