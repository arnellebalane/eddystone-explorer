import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/eddystone-explorer.vue';
import './stylesheets/index.css';

Vue.use(Vuex);

new Vue({
    el: '#app',
    store: require('./store').default,
    render: h => h(App)
});
