<template>
    <div class="value-with-unit">
        <slot></slot>
        <span class="unit">{{ unit }}</span>
    </div>
</template>

<script>
    export default {
        props: ['unit']
    };
</script>

<style scoped>
    .value-with-unit {
        display: flex;
        align-items: center;
        font-family: var(--monospace-font);
        font-size: 1.4rem;
        font-weight: 600;
    }

    .value-with-unit > * {
        margin: 0;
    }

    .unit {
        display: inline-block;
        margin-left: 0.8rem;
        font-weight: 400;
        opacity: 0.5;
    }
</style>
