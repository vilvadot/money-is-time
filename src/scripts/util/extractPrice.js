const extractPrice = (fullPrice = "") => {
  const numberRegex = /\d+(,|.)?\d+/g;
  const number = fullPrice
  .trim()
  .match(numberRegex)[0]
  .replace('.', '')
  .replace(",", ".");
  const price = parseFloat(number);

  return price;
};

export default extractPrice