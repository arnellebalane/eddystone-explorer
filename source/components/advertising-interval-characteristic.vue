<template>
    <characteristic-template class="advertising-interval-characteristic" number="2" name="Advertising Interval" :loading="loading" :loaded="loaded">
        <section>
            <characteristic-value label="Advertising Interval">
                <value-with-unit unit="ms">
                    <flexible-input ref="input" :value="advertisingInterval" @value-changed="onAdvertisingIntervalChanged"></flexible-input>
                </value-with-unit>
            </characteristic-value>
        </section>
        <section class="flex padded">
            <div class="messages">
                <p v-if="data.variableAdvIntervalSupported">Writing a value to this characteristic will set the advertising interval for <strong>{{ activeSlotLabel }}</strong>.</p>
                <p v-else class="warning">Because <strong>variable ADV interval</strong> is not supported, writing a value to this characteristic will set the advertising interval for all slots.</p>
            </div>
            <button class="info" @click="writeAdvertisingInterval">Update</button>
        </section>
    </characteristic-template>
</template>

<script>
    import { mapState } from 'vuex';
    import CharacteristicTemplate from './characteristic-template.vue';
    import CharacteristicValue from './characteristic-value.vue';
    import FlexibleInput from './flexible-input.vue';
    import ValueWithUnit from './value-with-unit.vue';

    export default {
        data() {
            return {
                characteristic: null,
                loading: true,
                loaded: false,
                advertisingInterval: null
            };
        },

        computed: {
            ...mapState(['service', 'uuids', 'data']),

            activeSlotLabel() {
                return `Slot #${this.data.activeSlot + 1}`;
            }
        },

        watch: {
            service(service) {
                this.initialize(service, this.data.activeSlot);
            },
            'data.activeSlot'(activeSlot) {
                this.initialize(this.service, activeSlot);
                this.updateAdvertisingInterval();
            }
        },

        methods: {
            async initialize(service, activeSlot) {
                if (!service) return;
                if (typeof activeSlot !== 'number') return;
                if (this.characteristic) return;

                this.characteristic = await service.getCharacteristic(this.uuids.advertisingInterval);
                await this.updateAdvertisingInterval();

                this.loading = false;
                this.loaded = true;
            },
            async updateAdvertisingInterval() {
                if (!this.characteristic) return;
                this.loading = true;

                const binaryData = await this.characteristic.readValue();
                const advertisingInterval = binaryData.getUint16(0);
                this.advertisingInterval = advertisingInterval;
                this.$store.commit('updateData', { advertisingInterval });

                this.loading = false;
            },
            onAdvertisingIntervalChanged(advertisingInterval) {
                this.advertisingInterval = parseInt(advertisingInterval, 10);
            },
            async writeAdvertisingInterval() {
                if (!this.characteristic) return;
                this.loading = true;

                const binaryData = new ArrayBuffer(2);
                new DataView(binaryData).setUint16(0, this.advertisingInterval);
                await this.characteristic.writeValue(binaryData);

                const data = { advertisingInterval: this.advertisingInterval };
                this.$store.commit('updateData', data);

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
