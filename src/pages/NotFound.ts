import Vue from 'vue';

export default Vue.component('not-found', {
   
    template: 
    /* html */`
    <div>
        <h1> Ops, página não encontrada </h1>
        <p>
            A página que voc^e está procurando não existe,
            volte para página inicial <router-link to="/"> aqui </router-link>
        </p>
    </div>    
    `
})
