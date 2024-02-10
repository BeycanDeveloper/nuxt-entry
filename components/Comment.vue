<template>
    <div class="flex items-start relative">
        <ul class="bg-blue-100 rounded inline-block p-2 text-center mr-5">
            <li class="text-blue-400 cursor-pointer" @click.prevent="like"><i class="fas fa-plus"></i></li>
            <li class="text-blue-900 font-bold"><span>{{ liked }}</span></li>
            <li class="text-blue-400 cursor-pointer" @click.prevent="unLike"><i class="fas fa-minus"></i></li>
        </ul>

        <div class="inline-block">
            <header class="mb-2">
                <div>
                    <img class="inline-block w-10 h-10 rounded-full mr-5" src="https://via.placeholder.com/150/92c952" :alt="comment.email">
                    <span class="inline-block font-bold mr-5">{{ comment.email }}</span>
                    <client-only>
                        <span v-if="user.matchUser(comment.username)" class="bg-blue-900 rounded px-2 mr-5 text-white">You</span>
                    </client-only>
                    <span class="inline-block">{{ comment.date }}</span>
                </div>

                <client-only>
                    <span class="absolute right-0 top-0">
                        <div v-if="user.matchUser(comment.username)">
                            <a href="#" @click.prevent="del(comment.id)" class=" text-red-600">
                                <i class="fas fa-trash-alt mr-1"></i>Delete
                            </a>
                            <a href="#" @click.prevent="emits('edit', comment)" class="text-blue-900 ml-2">
                                <i class="fas fa-edit mr-1"></i>Edit
                            </a>
                        </div>
                        <a href="#" @click.prevent="emits('replyFor', comment)" class="text-blue-900" v-else>
                            <i class="fa-solid fa-reply mr-2"></i>Reply
                        </a>
                    </span>
                </client-only>
            </header>

            <div class="body" v-html="comment.body"></div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['comment'])
    const emits = defineEmits([
        'replyFor',
        'edit'
    ])
    const user = useUserStore()

    const liked = ref(props.comment.liked)

    const like = () => {
        liked.value++
    }

    const unLike = () => {
        liked.value--
    }

    const del = (id) => {
        document.getElementById('comment-'+id).remove()
    }
    
</script>

<style lang="scss">
    .body {
        .mention {
            color: #1e3a8a;
            cursor: pointer;
            font-weight: bold;
        }
    }
</style>