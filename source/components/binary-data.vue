<template>
    <div class="binary-data">
        <p v-for="row in bytes">{{ displayBytesRow(row) }}</p>
    </div>
</template>

<script>
    export default {
        props: ['data', 'bytesPerRow'],

        computed: {
            bytes() {
                const bytes = [];
                const bytesPerRow = this.bytesPerRow;
                const data = this.data;

                for (let i = 0; i < data.byteLength; i++) {
                    const row = Math.floor(i / bytesPerRow);
                    if (i % bytesPerRow === 0) {
                        bytes[row] = [];
                    }
                    const byte = data.getUint8(i).toString(16).padStart(2, '0');
                    bytes[row][i % bytesPerRow] = byte;
                }
                return bytes;
            }
        },

        methods: {
            displayBytesRow(bytes) {
                return bytes.join(' ');
            }
        }
    };
</script>

<style scoped>
    p {
        margin: 0;
        font-family: var(--monospace-font);
        font-size: 1.4rem;
        font-weight: 600;
        text-transform: uppercase;
        opacity: 0.5;
    }
</style>
