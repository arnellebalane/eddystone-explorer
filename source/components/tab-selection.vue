<template>
    <div class="tab-selection" ref="element">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ['selected', 'selectedClass', 'loading'],
        watch: {
            selected(...args) {
                this.onSelectedChange(...args);
            },
            loading(loading) {
                this.classList[loading ? 'add' : 'remove']('loading');
            }
        },
        methods: {
            onSelectedChange(selected) {
                // Placed here instead of in the watchers because watchers by
                // default does not fire on the initial value, unless the
                // "immediate" option is set but in which case the refs are
                // not yet defined.

                const children = Array.from(this.$refs.element.children);
                children.forEach((child) => {
                    this.attemptParseValue(child.value) === selected
                        ? child.classList.add(this.selectedClass)
                        : child.classList.remove(this.selectedClass);
                });
            },
            attemptParseValue(value) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return value;
                }
            }
        },
        mounted() {
            this.onSelectedChange(this.selected);

            this.$refs.element.addEventListener('click', (e) => {
                if (e.target.value) {
                    this.$emit('selected-changed', e.target.value);
                }
            });
        }
    };
</script>

<style scoped>
    .tab-selection {
        display: flex;
    }

    .tab-selection.loading {
        pointer-events: none;
    }

    .tab-selection button:not(:last-child) {
        margin-right: 1px;
    }
</style>
