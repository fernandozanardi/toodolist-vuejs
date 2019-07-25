import Vue from 'vue';
import Vuex from 'vuex';
import tarefas from './stores/tarefas';
import alertas from './stores/alertas';

Vue.use(Vuex); //$store

export default new Vuex.Store ({
    modules: {
        tarefas, // $store.state.tarefas.tarefas
        alertas // $store.state.alertas.snackbar
    }
})
