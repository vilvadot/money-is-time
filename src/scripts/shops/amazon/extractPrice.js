const getLocale = () => {
  if(document.location.hostname.includes('.es')) return 'es'
  return 'en'
}

const parsePrice = (number, locale = 'en') => {
  if(!number) return null
  const transformers = {
    'en': number.replace(",", "").replace(".", ","),
    'es': number.replace(".", "").replace(",", ".")
  }

  return parseFloat(transformers[locale])
}

const extractQuantity = (string) => {
  const numberRegex = /(\d+(,|.)?\d+|\d)/g;
  const number = string.trim().match(numberRegex);
  return number ? number[0] : null
}

const extractPrice = (priceString = "") => {
  const value = extractQuantity(priceString)
  const locale = getLocale()
  const price = parsePrice(value, locale)

  return price;
};

export default extractPrice;
