<template>
    <div>
        <header>
            <h1>{{ $route.meta.title || 'Admin' }}</h1>
            <nav>
                <NuxtLink to="/admin">Home</NuxtLink>
                <NuxtLink to="/admin/blog">Blog list</NuxtLink>
                <NuxtLink to="/admin/blog/add">Add blog</NuxtLink>
            </nav>
        </header>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
header {
    background-color: #2d2828;
    color: #fff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    nav {
        a {
            color: #fff;
            margin-left: 10px;
        }
    }
}
</style>