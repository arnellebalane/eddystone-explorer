<template>
    <div class="eddystone-explorer">
        <div class="wrapper">
            <header>
                <h2>Explore and configure your beacons that support Eddystone, an open beacon format from Google.</h2>
                <beacon-connection :service="uuids.eddystone"></beacon-connection>
            </header>

            <main v-if="beacon">
                <capabilities-characteristic></capabilities-characteristic>
                <active-slot-characteristic></active-slot-characteristic>
                <advertising-interval-characteristic></advertising-interval-characteristic>
            </main>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import BeaconConnection from './beacon-connection.vue';
    import CapabilitiesCharacteristic from './capabilities-characteristic.vue';
    import ActiveSlotCharacteristic from './active-slot-characteristic.vue';
    import AdvertisingIntervalCharacteristic from './advertising-interval-characteristic.vue';

    export default {
        computed: mapState(['beacon', 'uuids']),

        watch: {
            async beacon(beacon) {
                const service = beacon
                    ? await beacon.gatt.getPrimaryService(this.uuids.eddystone)
                    : null;
                this.$store.commit('setService', service);
            }
        },

        components: {
            'beacon-connection': BeaconConnection,
            'capabilities-characteristic': CapabilitiesCharacteristic,
            'active-slot-characteristic': ActiveSlotCharacteristic,
            'advertising-interval-characteristic': AdvertisingIntervalCharacteristic
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
