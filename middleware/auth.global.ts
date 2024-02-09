export default defineNuxtRouteMiddleware((to) => {
    const user = useUserStore();
    if (!user.isLoggedIn && to.meta.layout === 'admin') {
        return navigateTo("/login");
    }
})