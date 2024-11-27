export const formatCurrency = (value) =>
  new Intl.NumberFormat("ru").format(value);

export const getDiscount = (price, oldPrice) =>
  Math.round(100 - (price / oldPrice) * 100);
