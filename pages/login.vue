<template>
    <div class="bg-gray-100 h-screen flex justify-center items-center">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="text-center text-3xl font-bold text-gray-800">Welcome the Nuxt Entry!</h2>
                <p class="mt-2 text-center text-sm text-gray-600">You need login for continue</p>
            </div>
            <form class="mt-8 space-y-6" method="POST" @submit.prevent="login">
                <input type="hidden" name="remember" value="true">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="username" class="sr-only">Username</label>
                        <input v-model="username" id="username" name="username" type="text" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input v-model="password" id="password" name="password" type="password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password">
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M10 12a2 2 0 100-4 2 2 0 000 4zM4 8V6a4 4 0 118 0v2h1a1 1 0 011 1v7a2 2 0 01-2 2H5a2 2 0 01-2-2V9a1 1 0 011-1h1zm9-4v2h2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v2h2V4h9z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
const username = ref('admin')
const password = ref('adminPassword')

const user = useUserStore()
const { $modal } = useNuxtApp()


const expirationDate = new Date()
expirationDate.setDate(expirationDate.getDate() + 7)
const token = useCookie('token', { expires: expirationDate })

const login = async () => {
    if (username.value === '' || password.value === '') {
        return $modal.info('Username and password is required');
    }
    const result = await useApi('auth/login', { username: username.value, password: password.value }, 'POST');

    if (result.status == 200) {
        navigateTo('/admin');
        user.set(result.data.user);
        $modal.success(result.data.message);
        token.value = result.data.token;
    } else {
        $modal.error(result.data.message);
    }
}

</script>
