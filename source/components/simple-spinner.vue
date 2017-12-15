<template>
    <div class="simple-spinner" v-if="show"></div>
</template>

<script>
    export default {
        props: ['show']
    };
</script>

<style scoped>
    .simple-spinner {
        display: block;
        width: 1rem;
        height: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-top-color: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        animation: rotate 500ms linear infinite;
        will-change: transform;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>
