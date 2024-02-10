export default defineNuxtRouteMiddleware(async (to) => {
    const user = useUserStore();
    const { session } = await useSession();
    const checkAuth = async () => {
        if (session?.value?.token) {
            const result = await useApi('auth/verify', {}, 'POST');
            if (result.status === 200) {
                user.set(result.data.user);
            }
        }
    }
    if (to.name === 'login') {
        await checkAuth();
        if (user.isLoggedIn) {
            return navigateTo('/');
        }
    } else if (to.meta.layout === 'admin') {
        await checkAuth();
        if (!user.isLoggedIn) {
            return navigateTo('/login');
        }
        if (user.info.role !== 'admin') {
            return navigateTo('/');
        }
    } 
})