<template>
    <characteristic-template class="lock-state-characteristic" number="6" name="Lock State" :loading="loading" :loaded="loaded">
        <section class="padded">
            <tab-selection :selected="lockState" selected-class="success" :loading="loading" @selected-changed="onLockStateChanged">
                <button :value="0x00">Locked</button>
                <button :value="0x01">Unlocked</button>
                <button :value="0x02">Unlocked and Automatic Relock Disabled</button>
            </tab-selection>
        </section>

        <template v-if="attemptLock">
            <section>
                <characteristic-value label="New lock code">
                    <flexible-input placeholder="00112233445566778899AABBCCDDEEFF" length="32"></flexible-input>
                </characteristic-value>
                <characteristic-value label="Current lock code">
                    <flexible-input placeholder="00112233445566778899AABBCCDDEEFF" length="32"></flexible-input>
                </characteristic-value>
            </section>
            <section class="flex padded">
                <button class="info">Continue</button>
            </section>
        </template>

        <section v-if="attemptUnlock" class="padded messages">
            <p class="danger">Beacon can only be unlocked using <strong>#7 Unlock</strong> characteristic.</p>
        </section>
    </characteristic-template>
</template>

<script>
    import { mapState } from 'vuex';
    import DependenciesMixin from '../mixins/dependencies-mixin';
    import CharacteristicTemplate from './characteristic-template.vue';
    import CharacteristicValue from './characteristic-value.vue';
    import FlexibleInput from './flexible-input.vue';
    import TabSelection from './tab-selection.vue';

    const LOCKED = 0x00;
    const UNLOCKED = 0x01;
    const UNLOCKED_ARD = 0x02;

    export default {
        mixins: [DependenciesMixin],

        data() {
            return {
                dependencies: ['service'],
                characterisitc: null,
                loading: true,
                loaded: false,
                lockState: null,
                attemptLock: false,
                attemptUnlock: false
            };
        },

        computed: mapState(['service', 'uuids', 'data']),

        methods: {
            async initialize(service) {
                this.characteristic = await service.getCharacteristic(this.uuids.lockState);
                const binaryData = await this.characteristic.readValue();

                const lockState = binaryData.getUint8(0);
                this.lockState = lockState;
                this.$store.commit('updateData', { lockState });

                this.loading = false;
                this.loaded = true;
            },
            onLockStateChanged(lockState) {
                this.lockState = lockState;
                this.attemptLock = false;
                this.attemptUnlock = false;

                if (lockState === LOCKED && this.data.lockState !== LOCKED) {
                    this.attemptLock = true;
                } else if (lockState === UNLOCKED && this.data.lockState !== UNLOCKED) {
                    this.attemptUnlock = true;
                }
            }
        },

        components: {
            'characteristic-template': CharacteristicTemplate,
            'characteristic-value': CharacteristicValue,
            'flexible-input': FlexibleInput,
            'tab-selection': TabSelection
        }
    };
</script>

<style scoped src="../stylesheets/buttons.css"></style>
<style scoped src="../stylesheets/characteristics.css"></style>
<style scoped>
    .flex button {
        margin-left: auto;
    }
</style>
