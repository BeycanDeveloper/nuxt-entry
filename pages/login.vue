<template>
    <div class="flex">
        <div class="flex-none w-14 h-14">
            01
        </div>
        <div class="flex-initial w-64 ...">
            02
        </div>
        <div class="flex-initial w-32 ...">
            03
        </div>
    </div>
    {{ user.info.email }}
</template>

<script lang="ts" setup>
const user = useUserStore()
</script>

<style lang="scss" scoped>
.flex {
    div:nth-child(1) {
        background-color: #f00;
    }
    div:nth-child(2) {
        background-color: #0f0;
    }
    div:nth-child(3) {
        background-color: #00f;
    }
}
</style>
