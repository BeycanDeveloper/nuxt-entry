<template>
    <form @submit.prevent="addForm" class="bg-white rounded p-5 flex mb-20">
        <client-only>
            <img class="inline-block w-10 h-10 rounded-full mr-5" src="https://via.placeholder.com/150/92c952" :alt="user.info.username">
        </client-only>
        <textarea class="w-full p-2 rounded-lg border-2" rows="5" placeholder="Add a comment..." v-html="content"></textarea>
        <div class="mb-5 ml-5">
            <button type="submit" class="bg-blue-800 text-white p-2 rounded-lg">SEND</button>
        </div>
    </form>
</template>

<script setup>
    const content = ref('');

    const addForm = () => {
        console.log('addForm');
    }
    const user = useUserStore();

    defineExpose({
        updateContent: (value) => {
            content.value = value;
        }
    })
</script>