<template>
    <form @submit.prevent="addPost">
        <div>
            <label for="title">Title</label>
            <input v-model="title" type="text" id="title" />
        </div>
        <div>
            <label for="content">Content</label>
            <textarea v-model="content" id="content"></textarea>
        </div>
        <button type="submit">Add</button>
    </form>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'admin',
        title: 'Add blog',
    })

    const { $modal } = useNuxtApp()

    const title = ref('')
    const content = ref('')

    const addPost = async () => {
        if (!title.value || !content.value) {
            return $modal.info('Please fill in all fields');
        }

        let result = await useApi('admin/blog/add', {
            title: title.value,
            content: content.value
        }, 'POST');

        if (result.status === 200) {
            $modal.success('Blog added successfully');
            title.value = '';
            content.value = '';
        } else {
            $modal.error('Failed to add blog');
        }
    }
</script>

<style scoped lang="scss">
    form {
        gap: 10px;
        display: flex;
        max-width: 300px;
        margin-top: 20px;
        text-align: center;
        flex-direction: column;
        label {
            font-weight: bold;
            display: block;
        }
        input, textarea {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #333;
            color: #fff;
            cursor: pointer;
        }
    }
</style>