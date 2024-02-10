type User = {
    username: string | null;
    role: string | null;
}

export const useUserStore = defineStore('user', () => {
    const user: Ref<User> = ref({
        username: null,
        role: null
    });

    const isLoggedIn = computed(() => {
        return Boolean(user.value.username);
    });

    const set = (newUser: User) => {
        user.value = newUser;
    }

    const info = computed(() => {
        return user.value;
    });

    return { isLoggedIn, set, info }
});
