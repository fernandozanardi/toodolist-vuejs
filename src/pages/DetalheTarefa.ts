import Vue from 'vue';
import FormatterUtil from '../util/FormatterUtil';

export default Vue.component('detalhe-tarefa', {
    template: 
    /* html */
    `
    <div>
        <h1>Detalhe tarefa</h1>
        <h2>Título da Tarefa: {{tarefaSelecionada.titulo}}</h2>
        <p>Data Prazo: {{FormatterUtil.formatarData(tarefaSelecionada.prazo)}}</p>
        <p>Descrição: {{tarefaSelecionada.descricao}}</p>
        <p>Situação da Tarefa: {{tarefaSelecionada.finalizado == "true" 'Finalizada' : 'Pendente'}}</p>
    </div>
    `,
    props: {
        tarefaSelecionada: {}
    },
    data() {
        return {
            FormatterUtil: FormatterUtil
        }
    }

})