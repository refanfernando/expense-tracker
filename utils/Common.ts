export const convertToNumber = (text: number | string) => {
  let num = +text;
  if (text.toLocaleString().match(/\./))
    num = +text.toLocaleString().replace(/\./g, "");
  return num;
};

export const formatMoney = (number: number | string) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(convertToNumber(number));
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
