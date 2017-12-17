<template>
    <characteristic-template class="active-slot-characteristic" number="2" name="Active Slot" :loading="loading" :loaded="loaded">
        <section class="padded">
            <tab-selection :selected="data.activeSlot" selected-class="success" :loading="loading" @selected-changed="onActiveSlotChanged">
                <button v-for="slot in slots" :value="slot.value">{{ slot.label }}</button>
            </tab-selection>
        </section>
        <section class="padded messages">
            <p>Number of slots is based on <strong>Max supported total slots</strong>capability.</p>
            <p>Subsequent writes to other characteristics will act on the active slot.</p>
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
                slots: []
            };
        },

        computed: mapState(['service', 'uuids', 'data']),

        watch: {
            service(service) {
                this.initialize(service, this.data.maxSupportedTotalSlots);
            },
            'data.maxSupportedTotalSlots'(maxSupportedTotalSlots) {
                this.initialize(this.service, maxSupportedTotalSlots);
            },
            async 'data.activeSlot'(activeSlot) {
                if (activeSlot === undefined) return;
                this.loading = true;

                const binaryData = new Uint8Array([activeSlot]);
                await this.characteristic.writeValue(binaryData);

                this.$emit('active-slot-changed', activeSlot);
                this.loading = false;
            }
        },

        methods: {
            async initialize(service, maxSupportedTotalSlots) {
                if (!service) return;
                if (typeof maxSupportedTotalSlots !== 'number') return;
                if (this.characteristic) return;

                this.characteristic = await service.getCharacteristic(this.uuids.activeSlot);
                const binaryData = await this.characteristic.readValue();

                const slots = [];
                for (let i = 0; i < maxSupportedTotalSlots; i++) {
                    slots.push({ label: `SLOT #${i + 1}`, value: i });
                }
                this.slots = slots;

                const data = { activeSlot: binaryData.getUint8(0) };
                this.$store.commit('updateData', data);

                this.loading = false;
                this.loaded = true;
            },
            onActiveSlotChanged(activeSlot) {
                const data = { activeSlot };
                this.$store.commit('updateData', data);
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
