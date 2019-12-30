const LIST_VIEW_PRICE = ".a-price-whole";
const GENERIC_PRICE = ".a-color-price";
const PRICE_SELECTORS = [GENERIC_PRICE, LIST_VIEW_PRICE];
const CURRENCY_STRINGS = ["&nbsp;€", "EUR "];

// TODO: Pillarlo del localStorage
const HOURLY_RATE = 30;

const cleanCurrencies = price => {
  let cleanPrice = price.trim();
  CURRENCY_STRINGS.forEach(currency => {
    cleanPrice = cleanPrice.replace(currency, "");
  });
  return parseFloat(cleanPrice);
};

const calcCost = (price, rate) => Math.ceil((price / rate) * 10) / 10;

const addTimeCost = ($node, selector, rate) => {
  const $cost = document.createElement("b");

  let target = $node.textContent;
  let $insertPoint = $node;
  const price = cleanCurrencies(target);
  const timeCost = calcCost(price, rate);

  $cost.innerHTML = ` (🛠 ${timeCost} h)`;

  if (selector === LIST_VIEW_PRICE) {
    $insertPoint = $node.parentNode;
  }

  $insertPoint.appendChild($cost);
};

const DEFAULT_RATE = 6
const parseRate = value => parseFloat(value) || DEFAULT_RATE

const readHourlyRate = () => {
  return new Promise(resolve => {
    browser.storage.local.get().then(state => {
      const rate = parseRate(state.rate) || DEFAULT_RATE
      resolve(rate);
    });
  });
}

(() => {
  readHourlyRate().then(rate => {
    PRICE_SELECTORS.forEach(selector => {
      const $prices = document.querySelectorAll(selector);
      $prices.forEach($price => {
        addTimeCost($price, selector, rate);
      });
    });
  })
})();
