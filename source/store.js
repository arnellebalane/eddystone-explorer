import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        beacon: null,
        service: null,
        uuids: {
            eddystone: 'a3c87500-8ed3-4bdf-8a39-a01bebede295',
            capabilities: 'a3c87501-8ed3-4bdf-8a39-a01bebede295',
            activeSlot: 'a3c87502-8ed3-4bdf-8a39-a01bebede295',
            advertisingInterval: 'a3c87503-8ed3-4bdf-8a39-a01bebede295',
            radioTxPower: 'a3c87504-8ed3-4bdf-8a39-a01bebede295',
            advertisedTxPower: 'a3c87505-8ed3-4bdf-8a39-a01bebede295',
            lockState: 'a3c87506-8ed3-4bdf-8a39-a01bebede295',
            unlock: 'a3c87507-8ed3-4bdf-8a39-a01bebede295',
            publicEcdhKey: 'a3c87508-8ed3-4bdf-8a39-a01bebede295',
            eidIdentityKey: 'a3c87509-8ed3-4bdf-8a39-a01bebede295',
            advSlotData: 'a3c8750a-8ed3-4bdf-8a39-a01bebede295',
            factoryReset: 'a3c8750b-8ed3-4bdf-8a39-a01bebede295',
            remainConnectable: 'a3c8750c-8ed3-4bdf-8a39-a01bebede295'
        }
    },

    mutations: {
        setBeacon(state, beacon) {
            state.beacon = beacon;
        },
        setService(state, service) {
            state.service = service;
        }
    }
});
