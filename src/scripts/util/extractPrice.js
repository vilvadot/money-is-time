const extractPrice = (fullPrice = "") => {
  let price;
  const numberRegex = /(\d+(,|.)?\d+|\d)/g;
  const number = fullPrice.trim().match(numberRegex);

  if (number) {
    number[0].replace(".", "").replace(",", ".");
    price = parseFloat(number);
  }

  return price;
};

export default extractPrice;
