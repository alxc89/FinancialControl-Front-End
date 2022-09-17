const Utils = {
  formatCurrency(value) {
    value = Number(value);
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return value;
  },

  formatDate(date) {
    if (date.length == 10) {
      const dateFormated = `${date}T00:00:00.000000`;
      return dateFormated;
    }

    const newDate = date.substring(0, 10);
    const splittedDate = newDate.split("-");
    const dateFormated = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    return dateFormated;
  },

  clearFields(obj) {
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        obj[i] = "";
      }
    }
  },
};

export default Utils;
