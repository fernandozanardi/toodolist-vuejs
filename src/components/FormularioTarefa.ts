import Vue from 'vue';
import TarefaService from '../service/TarefaService';

export default Vue.component('form-tarefa', {
    template: 
    /* html */
    `
    <form>
        <v-container grid-list-md>
            <h2>{{indiceEdicao != null ? 'Editar Tarefa' : 'Nova Tarefa'}}</h2>
            <v-layout row wrap>
                <v-flex xs12 sm4>
                    <v-text-field 
                        :loading="carregando"
                        filled
                        name="titulo"
                        v-validate="'required'"
                        type="text" 
                        label="Título da Tarefa" 
                        hint="Teste Teste"
                        v-model="task.titulo"
                        :error-messages="errors.collect('titulo')"
                        >              
                    </v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                    <v-text-field 
                        :loading="carregando"
                        filled
                        name="descricao"
                        type="text" 
                        label="Descrição da Tarefa" 
                        hint="Teste Teste"
                        v-model="task.descricao"
                        :error-messages="errors.collect('titulo')"
                        >
                    </v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                    <v-menu
                        v-model="datepicker"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <template
                            v-slot:activator="{on}">    
                            <v-text-field 
                                :loading="carregando"
                                filled
                                name="data"
                                validade
                                type="date" 
                                label="Prazo Conclusão"
                                hint="Ex: 25/12/2019"
                                v-model="task.prazo"
                                :error-messages="errors.collect('data')"
                                v-on="on"
                                readonly>
                            </v-text-field>
                        </template>
                        <v-date-picker 
                            v-model="task.prazo"
                            @input="datepicker = false"
                        >
                        </v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
            <v-layout justify-end>
                <v-btn :loading="carregando" color="success" type="button" @click="salvar">Salvar</v-btn>            
                <v-btn :loading="carregando" text color="error" type="button" @click="cancelar">Cancelar</v-btn>            
            </v-layout>   
        </v-container>
    </form>
    `,
    data() {
        return {
            datepicker: false,
            carregando: false
        }
    },
    methods: {
        async salvar() {
            this.carregando = true;

            if(await this.$validator.validate()) {
                this.carregando = false;
                this.$store.dispatch('tarefas/salvarTarefa', this.task);
                this.$store.dispatch('alertas/showSuccessSnackbar', 'Tarefa salva com sucesso');
                this.cancelar();
            } else {
                this.carregando = false;
                this.$store.dispatch('alertas/showErrorSnackbar', 'Preenncha todos os campo obrigatórios');
            }

        },
        cancelar() {
            this.task = {};
            this.$store.dispatch('tarefas/limparEdicao');
            this.$emit('voltar');
        }
    },
    computed: {
        indiceEdicao() {
            return this.$store.state.tarefas.indiceEdicao;
        },
        task: {
            get() {
                return this.$store.getters['tarefas/getTarefaEdicao'];
            },
            set(taskAlterada) {

            }
        }
    }

})