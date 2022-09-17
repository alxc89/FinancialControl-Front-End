<template>
  <header>
    <h1 class="logo">Controle Financeiro</h1>
  </header>
  <main class="container">
    <section class="balance">
      <Balance :totals="totals" />
    </section>

    <section id="transaction">
      <div class="create-transactions" @click.prevent="openModal">
        <a class="button new-transaction" id="new-transaction" @click.prevent="openModal">+ Nova Transação</a>
      </div>
      <Transaction :transactions="transactions" :deleteTransaction="deleteTransaction" />
    </section>
  </main>
  <div class="modal-overlay" :class="{ active: isOpen }">
    <div class="modal" :class="{ active: isOpen }">
      <div id="form">
        <h2>Nova Transação</h2>
        <form>
          <div class="input-group">
            <label class="sr-only" for="description">Descrição</label>
            <input type="text" name="description" id="description" placeholder="Descrição"
              v-model="transaction.description" />
          </div>

          <div class="input-group">
            <label class="sr-only" for="categoria">Categoria</label>
            <input type="text" name="categoria" id="categoria" placeholder="Categoria" v-model="transaction.category" />
          </div>

          <div class="input-group">
            <label class="sr-only" for="amount">Valor</label><input type="number" step="0.01" name="amount" id="amount"
              placeholder="Valor" v-model="transaction.amount" />
          </div>
          <div class="input-group">
            <label for="date" class="sr-only">Data</label><input type="date" name="date" id="date"
              v-model="transaction.date" />
          </div>

          <div class="type">
            <label for="type">Escolha o tipo: </label>
            <select name="type" id="" v-model="transaction.movementType">
              <option value="Escolha o Tipo"></option>
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saida</option>
            </select>
          </div>

          <div class="input-group actions">
            <a @click.prevent="closeModal" class="button cancel">Cancelar</a><button
              @click.prevent="createTransaction">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>

import Balance from "../components/Balance.vue";
import api from "./../services/api";
import Transaction from "../components/Transaction.vue";
import Utils from "../utils/Utils";
import axios from "axios";

export default {
  components: { Balance, Transaction },
  data() {
    return {
      isOpen: false,

      transactions: [],
      totals: [],
      transaction: {
        description: "",
        category: "",
        amount: "",
        date: "",
        movementType: "",
      },
    };
  },

  mounted() {
    this.getTransactions();
  },

  methods: {
    async getTransactions() {
      const response = await api.get("/transaction");

      if (response.status != 200) {
        console.error("Ocorreu um erro com a API");
        return;
      }

      const data = await response.data;

      this.transactions = [...data].map((element) => {
        const obj = {
          id: element.id,
          description: element.description,
          category: element.category,
          movementType: element.movementType,
          amount: Utils.formatCurrency(element.amount),
          date: Utils.formatDate(element.date),
        };

        return obj;
      });

      const totalIncome = [...data].reduce((accumulator, currentValue) => {
        if (currentValue.movementType === "Entrada") {
          accumulator += currentValue.amount;
        }
        return accumulator;
      }, 0);

      const totalOutcome = [...data].reduce((accumulator, currentValue) => {
        if (currentValue.movementType === "Saída") {
          accumulator += currentValue.amount;
        }
        return accumulator;
      }, 0);

      const totalBalance = totalIncome - totalOutcome;

      this.totals = {
        totalIncome: Utils.formatCurrency(totalIncome),
        totalOutcome: Utils.formatCurrency(totalOutcome),
        totalBalance: Utils.formatCurrency(totalBalance),
      };
    },

    async deleteTransaction(id) {
      await api
        .delete(`/transaction/${id}`)
        .then(() => this.getTransactions());
    },

    async createTransaction() {
      this.transaction.date = Utils.formatDate(this.transaction.date);

      const create = await api
        .post("/transaction", this.transaction)
        .then((response) => {
          this.getTransactions();
          this.closeModal();
          Utils.clearFields(this.transaction);
          return response.status;
        }).catch((error) => {
          console.error(error.message)
        });
      return create;
    },

    openModal: function () {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
  },
};
</script>
