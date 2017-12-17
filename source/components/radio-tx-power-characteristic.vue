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
    import DependenciesMixin from '../mixins/dependencies-mixin';
    import CharacteristicTemplate from './characteristic-template.vue';
    import TabSelection from './tab-selection.vue';

    export default {
        mixins: [DependenciesMixin],

        data() {
            return {
                dependencies: ['service', 'data.supportedRadioTxPowers', 'data.activeSlot'],
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
            'data.activeSlot': 'updateRadioTxPower'
        },

        methods: {
            async initialize(service, supportedRadioTxPowers, activeSlot) {
                this.characteristic = await service.getCharacteristic(this.uuids.radioTxPower);
                this.radioTxPowers = supportedRadioTxPowers;
                await this.updateRadioTxPower();

                this.loading = false;
                this.loaded = true;
            },
            async updateRadioTxPower() {
                if (!this.characteristic) return;
                if (this.loading && this.loaded) return;
                this.loading = true;

                const binaryData = await this.characteristic.readValue();
                const radioTxPower = binaryData.getInt8(0);
                this.radioTxPower = radioTxPower;
                this.$store.commit('updateData', { radioTxPower });

                this.loading = false;
            },
            async onRadioTxPowerChanged(radioTxPower) {
                this.radioTxPower = radioTxPower;
                await this.writeRadioTxPower();
            },
            async writeRadioTxPower() {
                if (!this.characteristic) return;
                if (this.loading && this.loaded) return;
                this.loading = true;

                const radioTxPower = this.radioTxPower;
                const binaryData = new Int8Array([radioTxPower]);
                await this.characteristic.writeValue(binaryData);
                this.$store.commit('updateData', { radioTxPower });

                this.loading = false;
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
