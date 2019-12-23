const PRICE_SELECTORS = [".a-color-price", ".a-price-whole"];
const HOURLY_RATE = 30;
const CURRENCY = "&nbsp;€";

const CURRENCY_BLACKLIST = ["&nbsp;€", "EUR "];

console.log('it works!')

const cleanCurrencies = price => {
  let cleanPrice = price.trim();
  CURRENCY_BLACKLIST.forEach(currency => {
    cleanPrice = cleanPrice.replace(currency, "");
  });
  return parseFloat(cleanPrice);
};

const calcCost = price => Math.round((price / HOURLY_RATE) * 100) / 100;

const addTimeCost = $node => {
  const $cost = document.createElement("b");

  let target = $node.textContent;

  const price = cleanCurrencies(target);
  const timeCost = calcCost(price);

  $cost.innerHTML = ` (🛠 ${timeCost} h)`;

  $node.appendChild($cost);
};

(() => {
  console.log('Looking for prices')
  PRICE_SELECTORS.forEach(selector => {
    const $prices = document.querySelectorAll(selector);

    $prices.forEach($price => {
      addTimeCost($price);
    });
  });
})();
