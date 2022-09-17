<template>
  <div id="balance">
    <h2 class="sr-only">Balanço</h2>

    <div class="card">
      <h3>
        <span>Entradas</span>
        <img src="../assets/income.svg" alt="Imagem de Entradas" />
      </h3>
      <p id="incomeDisplay">{{totals.totalIncome}}</p>
    </div>

    <div class="card">
      <h3>
        <span>Saídas</span>
        <img src="../assets/expense.svg" alt="Imagem de saídas" />
      </h3>
      <p id="expenseDisplay">{{totals.totalOutcome}}</p>
    </div>

    <div class="card total">
      <h3>
        <span>Total</span>
        <img src="../assets/total.svg" alt="Imagem de total" />
      </h3>
      <p id="totalDisplay">{{totals.totalBalance}}</p>
    </div>
  </div>
</template>
<script>
  export default{
    props: {totals: Object}
  }
</script>
