<template>
    <div class="characteristic-value">
        <p class="label">{{ label }}</p>

        <img v-if="value === true" :src="trueIcon" alt="true">
        <img v-else-if="value === false" :src="falseIcon" alt="false">
        <p v-else-if="value !== undefined" class="value">{{ value }}</p>
        <slot v-else></slot>
    </div>
</template>

<script>
    export default {
        props: ['label', 'value'],

        data() {
            return {
                trueIcon: require('../images/check.png'),
                falseIcon: require('../images/close.png')
            };
        }
    };
</script>

<style scoped>
    .characteristic-value {
        display: flex;
        align-items: center;
        padding: 0 4.2rem;
    }

    .characteristic-value:nth-of-type(odd) {
        background-color: rgba(196, 196, 196, 0.05);
    }

    .characteristic-value:nth-of-type(even) {
        background-color: rgba(196, 196, 196, 0.1);
    }

    p {
        margin: 0;
        font-size: 1.4rem;
        line-height: 3.2rem;
    }

    .label {
        margin-right: auto;
    }

    .value {
        font-family: var(--monospace-font);
        font-weight: 600;
    }
</style>
