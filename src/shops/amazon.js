const LIST_VIEW_PRICE = ".a-price-whole";
const GENERIC_PRICE = ":not(.a-color-price) > .a-color-price"; // avoids the insertion of duplicated nodes
const PRICE_SELECTORS = [GENERIC_PRICE, LIST_VIEW_PRICE];

const cleanCurrencies = priceString => {
  const numberRegex = /\d+(,|.)?\d+/g;
  const number = priceString
    .trim()
    .match(numberRegex)[0]
    .replace(",", ".");
  const price = parseFloat(number);
  console.log({ price, priceString });
  return price;
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

const parseRate = value => parseFloat(value)

const getConfig = () => {
  return new Promise(resolve => {
    browser.storage.local.get().then(state => {
      const rate = parseRate(state.rate)
      const isEnabled = state.isEnabled;
      resolve({ rate, isEnabled });
    });
  });
};

(() => {
  getConfig().then(state => {
    if (state.isEnabled) {
      PRICE_SELECTORS.forEach(selector => {
        const $prices = document.querySelectorAll(selector);
        $prices.forEach($price => {
          addTimeCost($price, selector, state.rate);
        });
      });
    }
  });
})();
