<template>
    <table id="data-table">
        <thead>
            <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Data</th>
                <th></th>
            </tr>
        </thead>
        <tbody v-for="transaction in transactions">
            <tr>
                <td class="description">{{transaction.description}}</td>
                <td class="category">{{ transaction.category }}</td>
                <td class="type">{{transaction.movementType}}</td>
                <td :class="[transaction.movementType]">{{transaction.amount}}</td>
                <td class="date">{{transaction.date}}</td>
                <td>
                    <a @click.prevent="deleteTransaction(transaction.id)">
                        <img id="" data-id="" src="../assets/minus.svg" alt="Remover transação" />
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import api from '../services/api'
export default {
    props: {
        deleteTransaction:{type: Function},
        transactions: Array
    },

    methods: {
        deleteTransaction(id){
            this.deleteTransaction(id);
        }
    }
};


</script>
