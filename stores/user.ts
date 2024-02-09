type User = {
    email: string | null;
    name: string | null;
}

export const useUserStore = defineStore('config', () => {
    const user: Ref<User> = ref({
        email: null,
        name: null
    });

    const isLoggedIn = computed(() => {
        return user.value.email;
    });

    const info = computed(() => {
        return user.value;
    });

    return { isLoggedIn, info }
});
