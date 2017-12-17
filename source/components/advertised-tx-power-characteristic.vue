<template>
    <characteristic-template class="advertised-tx-power-characteristic" number="5" name="Advertised Tx Power" :loading="loading" :loaded="loaded">
        <section>
            <characteristic-value label="Advertised Tx Power">
                <value-with-unit unit="dBm">
                    <flexible-input
                        :value="advertisedTxPower"
                        :placeholder="data.radioTxPower"
                        @value-changed="onAdvertisedTxPowerChanged">
                    </flexible-input>
                </value-with-unit>
            </characteristic-value>
        </section>
        <section class="flex padded">
            <div class="messages">
                <p>Writing a value to this characteristic will set the advertised Tx power for <strong>{{ activeSlotLabel }}</strong>.</p>
                <p>When not set, the value of this characteristic defaults to the value of <strong>Radio Tx Power</strong>.</p>
            </div>
            <button class="info" @click="writeAdvertisedTxPower">Update</button>
        </section>
    </characteristic-template>
</template>

<script>
    import { mapState } from 'vuex';
    import DependenciesMixin from '../mixins/dependencies-mixin';
    import CharacteristicTemplate from './characteristic-template.vue';
    import CharacteristicValue from './characteristic-value.vue';
    import FlexibleInput from './flexible-input.vue';
    import ValueWithUnit from './value-with-unit.vue';

    export default {
        mixins: [DependenciesMixin],

        data() {
            return {
                dependencies: ['service', 'data.radioTxPower', 'data.activeSlot'],
                characteristic: null,
                loading: true,
                loaded: false,
                advertisedTxPower: null
            };
        },

        computed: {
            ...mapState(['service', 'uuids', 'data']),

            activeSlotLabel() {
                return `Slot #${this.data.activeSlot + 1}`;
            }
        },

        watch: {
            'data.activeSlot': 'updateAdvertisedTxPower',
            'data.radioTxPower': 'updateAdvertisedTxPower'
        },

        methods: {
            async initialize(service, radioTxPower, activeSlot) {
                this.characteristic = await service.getCharacteristic(this.uuids.advertisedTxPower);
                await this.updateAdvertisedTxPower();

                this.loading = false;
                this.loaded = true;
            },
            async updateAdvertisedTxPower() {
                if (!this.characteristic) return;
                if (this.loading && this.loaded) return;
                this.loading = true;

                const binaryData = await this.characteristic.readValue();
                const advertisedTxPower = binaryData.getInt8(0);
                this.advertisedTxPower = advertisedTxPower;
                this.$store.commit('updateData', { advertisedTxPower });

                this.loading = false;
            },
            onAdvertisedTxPowerChanged(advertisedTxPower) {
                this.advertisedTxPower = advertisedTxPower;
            },
            async writeAdvertisedTxPower() {
                if (!this.characteristic) return;
                if (this.loading && this.loaded) return;
                this.loading = true;

                const advertisedTxPower = this.advertisedTxPower;
                const binaryData = new Int8Array([advertisedTxPower]);
                await this.characteristic.writeValue(binaryData);
                this.$store.commit('updateData', { advertisedTxPower });

                this.loading = false;
            }
        },

        components: {
            'characteristic-template': CharacteristicTemplate,
            'characteristic-value': CharacteristicValue,
            'flexible-input': FlexibleInput,
            'value-with-unit': ValueWithUnit
        }
    };
</script>

<style scoped src="../stylesheets/buttons.css"></style>
<style scoped src="../stylesheets/characteristics.css"></style>
