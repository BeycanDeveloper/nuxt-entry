<template>
    <form id="comment-form" @submit.prevent="addForm" class="bg-white rounded p-5 flex mb-20">
        <img class="inline-block w-10 h-10 rounded-full mr-5" src="https://via.placeholder.com/150/92c952" :alt="user.info.username">
        <textarea class="w-full p-2 rounded-lg border-2" rows="5" placeholder="Add a comment..." v-model="content"></textarea>
        <div class="mb-5 ml-5">
            <button type="submit" class="bg-blue-800 text-white p-2 rounded-lg">SEND</button>
        </div>
    </form>
</template>

<script setup>
    const content = ref('');

    const emits = defineEmits([
        'submitForm'
    ])

    const addForm = () => {
        emits('submitForm', content.value);
    }
    const user = useUserStore();

    defineExpose({
        updateContent: (value) => {
            content.value = value.replace(/<[^>]*>/g, '');
        }
    })
</script>