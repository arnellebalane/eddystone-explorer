<template>
    <characteristic-template class="capabilities-characteristic" number="1" name="Capabilities" :loading="loading" :loaded="loaded">
        <section>
            <characteristic-value label="Spec version" :value="data.specVersion"></characteristic-value>
            <characteristic-value label="Max supported total slots" :value="data.maxSupportedTotalSlots"></characteristic-value>
            <characteristic-value label="Max supported EID slots" :value="data.maxSupportedEidSlots"></characteristic-value>
            <characteristic-value label="Variable ADV interval supported?" :value="data.variableAdvIntervalSupported"></characteristic-value>
            <characteristic-value label="Variable Tx power supported?" :value="data.variableTxPowerSupported"></characteristic-value>
            <characteristic-value label="Supported frame types">
                <items-availability>
                    <template v-for="item in data.supportedFrameTypes">
                        <p :class="{available: item.available}">{{ item.name }}</p>
                    </template>
                </items-availability>
            </characteristic-value>
            <characteristic-value label="Supported radio Tx power">
                <value-with-unit unit="dBm">
                    <p>{{ data.supportedRadioTxPowers }}</p>
                </value-with-unit>
            </characteristic-value>
        </section>
    </characteristic-template>
</template>

<script>
    import { mapState } from 'vuex';
    import CharacteristicTemplate from './characteristic-template.vue';
    import CharacteristicValue from './characteristic-value.vue';
    import ItemsAvailability from './items-availability.vue';
    import ValueWithUnit from './value-with-unit.vue';

    export default {
        data() {
            return {
                characteristic: null,
                loading: true,
                loaded: false
            };
        },

        computed: mapState(['service', 'uuids', 'data']),

        watch: {
            async service(service) {
                if (this.characteristic) return;

                this.characteristic = await service.getCharacteristic(this.uuids.capabilities);
                const binaryData = await this.characteristic.readValue();

                const data = {
                    specVersion: this.computeSpecVersion(binaryData),
                    maxSupportedTotalSlots: this.computeMaxSupportedTotalSlots(binaryData),
                    maxSupportedEidSlots: this.computeMaxSupportedEidSlots(binaryData),
                    variableAdvIntervalSupported: this.computeVariableAdvIntervalSupported(binaryData),
                    variableTxPowerSupported: this.computeVariableTxPowerSupported(binaryData),
                    supportedFrameTypes: this.computeSupportedFrameTypes(binaryData),
                    supportedRadioTxPowers: this.computeSupportedRadioTxPowers(binaryData)
                };
                this.$store.commit('updateData', data);

                this.loading = false;
                this.loaded = true;
            }
        },

        methods: {
            computeSpecVersion(binaryData) {
                return binaryData.getUint8(0);
            },
            computeMaxSupportedTotalSlots(binaryData) {
                return binaryData.getUint8(1);
            },
            computeMaxSupportedEidSlots(binaryData) {
                return binaryData.getUint8(2);
            },
            computeVariableAdvIntervalSupported(binaryData) {
                return Boolean(binaryData.getUint8(3) & 0x01);
            },
            computeVariableTxPowerSupported(binaryData) {
                return Boolean(binaryData.getUint8(3) & 0x02);
            },
            computeSupportedFrameTypes(binaryData) {
                const frameTypes = [
                    { name: 'UID', code: 0x0001 },
                    { name: 'URL', code: 0x0002 },
                    { name: 'TLM', code: 0x0004 },
                    { name: 'EID', code: 0x0008 }
                ];
                const frameTypeBits = binaryData.getUint16(2);
                return frameTypes.map((frameType) => {
                    frameType.available = Boolean(frameTypeBits & frameType.code);
                    return frameType;
                });
            },
            computeSupportedRadioTxPowers(binaryData) {
                const radioTxPowers = [];
                for (let i = 6; i < binaryData.byteLength; i++) {
                    radioTxPowers.push(binaryData.getInt8(i));
                }
                return radioTxPowers.join(', ');
            }
        },

        components: {
            'characteristic-template': CharacteristicTemplate,
            'characteristic-value': CharacteristicValue,
            'items-availability': ItemsAvailability,
            'value-with-unit': ValueWithUnit
        }
    };
</script>

<style src="../stylesheets/characteristics.css"></style>
