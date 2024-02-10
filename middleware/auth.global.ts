import Cookies from 'js-cookie';

export default defineNuxtRouteMiddleware(async (to) => {
    const user = useUserStore();
    const checkAuth = async () => {
        if (Cookies.get('token')) {
            const result = await useApi('auth/verify', {}, 'POST');
            if (result.status === 200) {
                user.set(result.data.user);
            }
        }
    }

    if (
        to.name === 'login' ||
        to.meta.auth === true ||
        to.meta.layout === 'admin'
    ) {
        await checkAuth();
    }

    if (to.name === 'login') {
        if (user.isLoggedIn) {
            return navigateTo('/');
        }
    } else if (to.meta.layout === 'admin') {
        if (!user.isLoggedIn) {
            return navigateTo('/login');
        }
        if (user.info.role !== 'admin') {
            return navigateTo('/');
        }
    } 
})