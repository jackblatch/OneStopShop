export const currencyFormatter = (value: number) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  const [dollars, cents] = formattedPrice.split(".");
  if (cents === "00") {
    return dollars;
  }
  return formattedPrice;
};
