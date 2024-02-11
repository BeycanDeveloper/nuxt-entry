<template>
    <div class="max-w-screen-xl mx-auto">
        <div class="flex justify-between flex-wrap">
            <main class="px-5 lg:w-8/12 w-12/12">
                <article class="bg-white rounded-xl p-5 shadow-sm mb-5">
                    <h1 class="text-3xl font-semibold mb-5">{{ singleBlog.title }}</h1>
                    <div v-html="singleBlog.content"></div>
                </article>
                <comments></comments>
            </main>

            <aside class="px-5 lg:w-4/12 w-full">
                <div class="bg-white rounded-xl p-5 shadow-sm">
                    <h2 class="text-lg font-semibold">Related Posts</h2>
                    <ul>
                        <li v-for="item in blogList" :key="item.slug">
                            <nuxt-link :to="`/blog/${item.slug}`">{{ item.title }}</nuxt-link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
    import comments from '~/components/Comments.vue';

    definePageMeta({
        layout: 'container',
        auth: true
    });

    const route = useRoute();
    const blog = useBlogStore();
    const blogList = await blog.list;
    const singleBlog = await blog.getOne(
        String(route.params.slug)
    );
</script>