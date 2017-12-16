<template>
    <div class="binary-data">
        <p v-for="row in bytes">{{ row }}</p>
    </div>
</template>

<script>
    export default {
        props: ['data', 'bytesPerRow'],

        computed: {
            bytes(data) {
                const bytes = [];
                const bytesPerRow = this.bytesPerRow;

                for (let i = 0; i < data.byteLength; i++) {
                    const row = Math.floor(i / bytesPerRow);
                    if (i % bytesPerRow === 0) {
                        bytes[row] = [];
                    }
                    const byte = data.getUint8(i).toString(16);
                    bytes[row][i % bytesPerRow] = byte.length < 2 ? '0' : byte;
                }
                return bytes;
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
