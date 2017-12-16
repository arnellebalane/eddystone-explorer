<template>
    <div class="items-availability">
        <slot></slot>
    </div>
</template>

<style scoped>
    .items-availability {
        display: flex;
        font-family: var(--monospace-font);
    }

    .items-availability > * {
        margin: 0;
        font-size: 1.4rem;
    }

    .items-availability > *:not(:first-child) {
        margin-left: 0.4rem;
    }

    .items-availability > *:not(:last-child) {
        margin-right: 0.4rem;
    }

    .items-availability > .available {
        font-weight: 600;
        color: var(--success-color);
    }

    .items-availability > *:not(.available) {
        color: var(--danger-color);
        opacity: 0.5;
    }
</style>
