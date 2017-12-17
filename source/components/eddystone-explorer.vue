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
                <radio-tx-power-characteristic></radio-tx-power-characteristic>
                <advertised-tx-power-characteristic></advertised-tx-power-characteristic>
                <lock-state-characteristic></lock-state-characteristic>
                <public-ecdh-key-characteristic></public-ecdh-key-characteristic>
                <eid-identity-key-characteristic></eid-identity-key-characteristic>
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
    import RadioTxPowerCharacteristic from './radio-tx-power-characteristic.vue';
    import AdvertisedTxPowerCharacteristic from './advertised-tx-power-characteristic.vue';
    import LockStateCharacteristic from './lock-state-characteristic.vue';
    import PublicECDHKeyCharacteristic from './public-ecdh-key-characteristic.vue';
    import EIDIdentityKeyCharacteristic from './eid-identity-key-characteristic.vue';

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
            'advertising-interval-characteristic': AdvertisingIntervalCharacteristic,
            'radio-tx-power-characteristic': RadioTxPowerCharacteristic,
            'advertised-tx-power-characteristic': AdvertisedTxPowerCharacteristic,
            'lock-state-characteristic': LockStateCharacteristic,
            'public-ecdh-key-characteristic': PublicECDHKeyCharacteristic,
            'eid-identity-key-characteristic': EIDIdentityKeyCharacteristic
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
