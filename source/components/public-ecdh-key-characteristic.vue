<template>
    <characteristic-template class="public-ecdh-key-characteristic" number="8" name="Public ECDH Key" :loading="loading" :loaded="loaded">
        <section class="padded">
            <binary-data :data="data.publicEcdhKey" bytes-per-row="16"></binary-data>
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
                this.characteristic = await service.getCharacteristic(this.uuids.publicEcdhKey);

                const publicEcdhKey = await this.characteristic.readValue();
                this.$store.commit('updateData', { publicEcdhKey });

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
