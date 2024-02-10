type Blog = {
    id: number;
    title: string;
    content: string;
    username: string;
}

type BlogList = Blog[];

export const useBlogStore = defineStore('blog', () => {
    const blog: Ref<BlogList> = ref([]);

    const list = computed(async () => {
        if (blog.value.length > 0) {
            return blog.value;
        }

        return (blog.value = (await useApi('blog/list')).data);
    });

    const set = (data: BlogList) => {
        blog.value = data;
    }

    const getOne = async (slug: string) => {
        return (await useApi('blog/get/'+slug)).data;
    }

    return { list, set, getOne }
});
