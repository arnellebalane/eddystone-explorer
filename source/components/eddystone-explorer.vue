<template>
    <div class="eddystone-explorer">
        <div class="wrapper">
            <header>
                <h2>Explore and configure your beacons that support Eddystone, an open beacon format from Google.</h2>
                <beacon-connection
                    v-bind:beacon="beacon"
                    v-bind:uuids="uuids"
                    v-on:beacon-change="onBeaconChange">
                </beacon-connection>
            </header>
        </div>
    </div>
</template>

<script>
    import BeaconConnection from './beacon-connection.vue';

    export default {
        data() {
            return {
                beacon: null,
                uuids: {
                    eddystone: 'a3c87500-8ed3-4bdf-8a39-a01bebede295',
                    capabilities: 'a3c87501-8ed3-4bdf-8a39-a01bebede295',
                    activeSlot: 'a3c87502-8ed3-4bdf-8a39-a01bebede295',
                    advertisingInterval: 'a3c87503-8ed3-4bdf-8a39-a01bebede295',
                    radioTxPower: 'a3c87504-8ed3-4bdf-8a39-a01bebede295',
                    advertisedTxPower: 'a3c87505-8ed3-4bdf-8a39-a01bebede295',
                    lockState: 'a3c87506-8ed3-4bdf-8a39-a01bebede295',
                    unlock: 'a3c87507-8ed3-4bdf-8a39-a01bebede295',
                    publicEcdhKey: 'a3c87508-8ed3-4bdf-8a39-a01bebede295',
                    eidIdentityKey: 'a3c87509-8ed3-4bdf-8a39-a01bebede295',
                    advSlotData: 'a3c8750a-8ed3-4bdf-8a39-a01bebede295',
                    factoryReset: 'a3c8750b-8ed3-4bdf-8a39-a01bebede295',
                    remainConnectable: 'a3c8750c-8ed3-4bdf-8a39-a01bebede295'
                }
            };
        },
        watch: {
            beacon(beacon) {
                console.log(beacon);
            }
        },
        methods: {
            onBeaconChange(beacon) {
                this.beacon = beacon;
            }
        },
        components: {
            'beacon-connection': BeaconConnection
        }
    };
</script>

<style scoped>
    .eddystone-explorer {
        display: block;
    }

    .wrapper {
        width: 95vw;
        max-width: 532px;
        margin: 0 auto;
    }

    header {
        padding: 2.4rem 1.6rem;
    }

    h2 {
        margin: 0;
        margin-bottom: 2.4rem;
        font-size: 1.8rem;
        font-weight: 400;
    }

    main {
        padding-bottom: 2.4rem;
    }

    main > *:not(:first-child) {
        margin-top: 2.4rem;
    }

    main > *:not(:last-child) {
        margin-bottom: 2.4rem;
    }
</style>
