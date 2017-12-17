<template>
    <characteristic-template class="radio-tx-power-characteristic" number="4" name="Radio Tx Power" :loading="loading" :loaded="loaded">
        <section class="padded">
            <tab-selection :selected="radioTxPower" selected-class="success" :loading="loading" @selected-changed="onRadioTxPowerChanged">
                <button v-for="item in radioTxPowers" :value="item">{{ item }} dBm</button>
            </tab-selection>
        </section>
        <section class="padded messages">
            <p v-if="data.variableTxPowerSupported">Writing a value to this characteristic will set the radio Tx power for <strong>{{ activeSlotLabel }}</strong>.</p>
            <p v-else class="warning">Because <strong>variable Tx power</strong> is not supported, writing a value to this characteristic will set the radio Tx power for all slots.</p>
        </section>
    </characteristic-template>
</template>

<script>
    import { mapState } from 'vuex';
    import CharacteristicTemplate from './characteristic-template.vue';
    import TabSelection from './tab-selection.vue';

    export default {
        data() {
            return {
                characteristic: null,
                loading: true,
                loaded: false,
                radioTxPower: null,
                radioTxPowers: []
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
                this.initialize(service, this.data.supportedRadioTxPowers);
            },
            'data.supportedRadioTxPowers'(supportedRadioTxPowers) {
                this.initialize(this.service, supportedRadioTxPowers);
            },
            'data.activeSlot'(activeSlot) {
                this.initialize(this.service, this.data.supportedRadioTxPowers);
                this.updateRadioTxPower();
            },
            async radioTxPower(radioTxPower, oldValue) {
                if (radioTxPower === undefined) return;
                if (oldValue === null) return;
                this.loading = true;

                const binaryData = new Int8Array([radioTxPower]);
                await this.characteristic.writeValue(binaryData);
                this.$store.commit('updateData', { radioTxPower });

                this.loading = false;
            }
        },

        methods: {
            async initialize(service, supportedRadioTxPowers) {
                if (!service) return;
                if (!supportedRadioTxPowers) return;
                if (this.characteristic) return;

                this.characteristic = await service.getCharacteristic(this.uuids.radioTxPower);
                this.radioTxPowers = supportedRadioTxPowers;
                await this.updateRadioTxPower();

                this.loading = false;
                this.loaded = true;
            },
            async updateRadioTxPower() {
                if (!this.characteristic) return;
                this.loading = true;

                const binaryData = await this.characteristic.readValue();
                const radioTxPower = binaryData.getInt8(0);
                this.radioTxPower = radioTxPower;
                this.$store.commit('updateData', { radioTxPower });

                this.loading = false;
            },
            onRadioTxPowerChanged(radioTxPower) {
                this.radioTxPower = radioTxPower;
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
<style scoped>
    button {
        text-transform: initial;
    }
</style>
