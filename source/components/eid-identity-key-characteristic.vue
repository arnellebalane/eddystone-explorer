<template>
    <characteristic-template class="eid-identity-key-characteristic" number="9" name="EID Identity Key" :loading="loading" :loaded="loaded">
        <section class="padded">
            <binary-data :data="data.eidIdentityKey" bytes-per-row="16"></binary-data>
        </section>
        <section class="padded messages">
            <p class="info">Displayed key still needs to be decrypted using the beacon's current lock code.</p>
        </section>
    </characteristic-template>
</template>

<script>
    import { mapState } from 'vuex';
    import DependenciesMixin from '../mixins/dependencies-mixin';
    import BinaryData from './binary-data.vue';
    import CharacteristicTemplate from './characteristic-template.vue';

    export default {
        mixins: [DependenciesMixin],

        data() {
            return {
                dependencies: ['service'],
                characteristic: null,
                loading: true,
                loaded: false
            };
        },

        computed: mapState(['service', 'uuids', 'data']),

        methods: {
            async initialize(service) {
                this.characteristic = await service.getCharacteristic(this.uuids.eidIdentityKey);

                const eidIdentityKey = await this.characteristic.readValue();
                this.$store.commit('updateData', { eidIdentityKey });

                this.loading = false;
                this.loaded = true;
            }
        },

        components: {
            'binary-data': BinaryData,
            'characteristic-template': CharacteristicTemplate
        }
    };
</script>

<style scoped src="../stylesheets/characteristics.css"></style>
