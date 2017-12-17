<template>
    <div class="flexible-input">
        <input type="text" ref="input" :placeholder="placeholder" v-model="inputValue">
    </div>
</template>

<script>
    export default {
        props: ['value', 'placeholder', 'length'],

        data() {
            return {
                inputValue: this.value
            };
        },

        watch: {
            value(value) {
                this.inputValue = value;
            },
            inputValue(inputValue) {
                this.updateInputWidth();
                this.$emit('value-changed', inputValue);
            }
        },

        methods: {
            updateInputWidth() {
                this.$refs.input.style.width = this.calculateInputWidth() + 'ch';
            },
            calculateInputWidth() {
                if (this.length) {
                    return this.length;
                } else if (this.inputValue) {
                    return this.inputValue.length;
                } else if (this.placeholder) {
                    return this.placeholder.length;
                }
                return 0;
            }
        },

        mounted() {
            this.updateInputWidth();
        }
    };
</script>

<style scoped>
    input {
        width: 3ch;
        min-width: 3ch;
        padding: 0;
        border: none;
        border-top: 2px solid transparent;
        border-bottom: 2px solid rgba(255, 255, 255, 0.25);
        font-family: var(--monospace-font);
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 2.8rem;
        text-align: right;
        color: #fff;
        background: none;
        outline: none;
    }

    input:focus {
        border-bottom-color: rgba(255, 255, 255, 0.5);
    }
</style>
