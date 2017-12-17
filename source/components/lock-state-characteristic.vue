<template>
    <characteristic-template class="lock-state-characteristic" number="6" name="Lock State" :loading="loading" :loaded="loaded">
        <section class="padded">
            <tab-selection :selected="data.lockState" selected-class="success" :loading="loading">
                <button :value="0x00">Locked</button>
                <button :value="0x01">Unlocked</button>
                <button :value="0x02">Unlocked and Automatic Relock Disabled</button>
            </tab-selection>
        </section>
    </characteristic-template>
</template>

<script>
    import { mapState } from 'vuex';
    import DependenciesMixin from '../mixins/dependencies-mixin';
    import CharacteristicTemplate from './characteristic-template.vue';
    import TabSelection from './tab-selection.vue';

    export default {
        mixins: [DependenciesMixin],

        data() {
            return {
                dependencies: ['service'],
                characterisitc: null,
                loading: true,
                loaded: false
            };
        },

        computed: mapState(['service', 'uuids', 'data']),

        methods: {
            async initialize(service) {
                this.characteristic = await service.getCharacteristic(this.uuids.lockState);
                const binaryData = await this.characteristic.readValue();

                const lockState = binaryData.getUint8(0);
                this.$store.commit('updateData', { lockState });

                this.loading = false;
                this.loaded = true;
            }
        },

        components: {
            'characteristic-template': CharacteristicTemplate,
            'tab-selection': TabSelection
        }
    };
</script>

<style scoped src="../stylesheets/buttons.css"></style>
<style scoped src="../stylesheets/characteristics.css"></style>
