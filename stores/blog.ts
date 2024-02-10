type Blog = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type BlogList = Blog[];

export const useBlogStore = defineStore('blog', () => {
    const blog: Ref<BlogList> = ref([]);

    const list = computed(async () => {
        if (blog.value.length > 0) {
            return blog.value;
        }

        const posts = await useJsonP('posts');

        return (blog.value = posts.slice(0, 10));
    });

    return { list }
});
