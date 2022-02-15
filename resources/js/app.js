require('./bootstrap');
window.LaravelRoute = require('./plugins/laravel-routes');

import Vue from 'vue';
import helpers from './plugins/helpers';
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

Vue.prototype.$helpers = helpers;
window.Vue = Vue

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

window.EventBus = new Vue();

// *************************************************************************
// Project Components
// *************************************************************************

Vue.component('todo-index', require('./components/TodoIndex').default);

const app = new Vue({
    el: '#app',
    BootstrapVue,
    BootstrapVueIcons
});
