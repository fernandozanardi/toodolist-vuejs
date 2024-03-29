import {Module} from 'vuex';
import TarefaService from '../service/TarefaService';

const module: Module<any, any> = {
    namespaced: true,
    state: {
        tarefas: [],
        indiceEdicao: null
    },
    mutations: {
        mutationTarefas(state, lista) {
            state.tarefas = lista;
        },
        mutationIndiceEdicao(state, index) {
            state.indiceEdicao = index;
        },
        mutationSalvaTarefa(state, task) {
            state.tarefas[state.indiceEdicao] = task;
        },
        mutationCadastrarTarefa(state, task) {
            state.tarefas.push(task);
        },
        mutationRemover(state, index) {
            state.tarefas.splice(index, 1);
        }
    },
    actions: {
        async carregarTarefas(context) {
            let tarefas = await TarefaService.buscarTodos();
            context.commit('mutationTarefas', tarefas)
        },
        editar(context, index) {
            context.commit('mutationIndiceEdicao', index);
        },
        limparEdicao(context) {
            context.commit('mutationIndiceEdicao', null);
        },
        salvarTarefa(context, task) {
            if (context.state.indiceEdicao = null) {
                context.commit('mutationCadastrarTarefa', task);

            } else {
                context.commit('mutationSalvaTarefa', task);
            }
            TarefaService.atualizarLista(context.state.tarefas);
        },
        remover(context, index){
            context.commit('mutationRemover', index);    
            TarefaService.atualizarLista(context.state.tarefas);
        },    },
    getters: {
        getTarefaEdicao(state) {
            if (state.indiceEdicao != null) {
                return state.tarefas[state.indiceEdicao];
            }
            return {}
        }
    }
}

export default module;