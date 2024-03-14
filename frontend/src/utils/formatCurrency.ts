const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
});

export const formatCurrency = (num: number) => {
  return CURRENCY_FORMATER.format(num);
};
