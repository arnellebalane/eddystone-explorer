<template>
    <div class="beacon-connection">
        <template v-if="status === 'default'">
            <p>Not connected to any beacon</p>
            <button class="default" @click="requestDevice">Scan for beacons</button>
        </template>
        <template v-else-if="status === 'scanning'">
            <p>Searching for beacons with support for the Eddystone Configuration Service</p>
            <button class="scanning">Scanning...</button>
        </template>
        <template v-else-if="status === 'connecting'">
            <p>Connecting to "{{ beacon.name }}"</p>
            <button class="connecting">Connecting...</button>
        </template>
        <template v-else-if="status === 'connected'">
            <p>Connected to "{{ beacon.name }}"</p>
            <button class="connected" @click="disconnect">Disconnect</button>
        </template>
    </div>
</template>

<script>
    export default {
        props: ['service'],

        data() {
            return {
                status: 'default',
                beacon: null
            };
        },

        methods: {
            async requestDevice() {
                this.status = 'scanning';

                try {
                    this.beacon = await navigator.bluetooth.requestDevice({
                        filters: [
                            { services: [this.service] }
                        ]
                    });

                    this.status = 'connecting';
                    await this.beacon.gatt.connect();

                    this.status = 'connected';
                    this.$store.commit('setBeacon', this.beacon);
                } catch (error) {
                    console.log(error);
                    this.status = 'default';
                }
            },
            async disconnect() {
                await this.beacon.gatt.disconnect();
                this.status = 'default';
                this.beacon = null;
                this.$store.commit('setBeacon', this.beacon);
            }
        }
    };
</script>

<style scoped>
    .beacon-connection {
        display: flex;
        align-items: center;
    }

    p {
        max-width: 25rem;
        margin: 0;
        font-size: 1.2rem;
        opacity: 0.75;
    }

    button {
        flex-shrink: 0;
        padding: 0 1.6rem;
        border: none;
        border-radius: 1.6rem;
        margin-left: auto;
        font: inherit;
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 3.2rem;
        color: #fff;
        background-color: var(--info-color);
    }

    button.scanning,
    button.connecting {
        opacity: 0.25;
        pointer-events: none;
    }

    button.connecting {
        color: #333;
        background-color: var(--warning-color);
    }

    button.connected {
        background-color: var(--danger-color);
    }
</style>
