const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
});

const DATE_FORMATER = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatCurrency(num: number) {
  return CURRENCY_FORMATER.format(num);
}

export function formatDate(date: Date) {
  return DATE_FORMATER.format(new Date(date));
}
