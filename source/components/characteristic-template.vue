<template>
    <article class="characteristic-template">
        <header>
            <span>{{ number }}</span>
            <h2>{{ name }}</h2>
            <simple-spinner v-bind:show="loading"></simple-spinner>
        </header>

        <slot></slot>
    </article>
</template>

<script>
    import SimpleSpinner from './simple-spinner.vue';

    export default {
        props: ['number', 'name', 'loading'],
        components: {
            'simple-spinner': SimpleSpinner
        }
    };
</script>

<style scoped>
    .characteristic-template {
        display: block;
    }

    article {
        padding-bottom: 1.6rem;
        background-color: rgba(255, 255, 255, 0.05);
    }

    header {
        display: flex;
        align-items: center;
        padding: 1.6rem 4.2rem;
        position: relative;
    }

    h2 {
        margin: 0;
        font-size: 1.6rem;
        font-weight: 400;
    }

    span {
        position: absolute;
        top: 1.8rem;
        right: calc(100% - 4.2rem + 0.8rem);
        font-family: var(--monospace-font);
        font-size: 1.2rem;
        opacity: 0.5;
    }

    span::before {
        content: "#";
    }

    .simple-spinner {
        margin-left: auto;
    }
</style>
