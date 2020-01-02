const LIST_VIEW_PRICE = ".a-price-whole";
const GENERIC_PRICE = ":not(.a-color-price) > .a-color-price"; // avoids the insertion of duplicated nodes
const PRICE_SELECTORS = [GENERIC_PRICE, LIST_VIEW_PRICE];
const PERCENTAGE_SYMBOL = "%";

const cleanCurrencies = (fullPrice = "") => {
  const numberRegex = /\d+(,|.)?\d+/g;
  const number = fullPrice
  .trim()
  .match(numberRegex)[0]
  .replace('.', '')
  .replace(",", ".");
  const price = parseFloat(number);
  console.log({fullPrice, price})

  return price;
};

const calcCost = (price, rate) => Math.ceil((price / rate) * 10) / 10;

const addTimeCost = ($node, selector, rate) => {
  const $cost = document.createElement("b");
  $cost.style.fontSize = ".8em";

  let target = $node.textContent;
  let $insertPoint = $node;

  if (selector === LIST_VIEW_PRICE) {
    $insertPoint = $node.parentNode;
  }

  if (target.includes(PERCENTAGE_SYMBOL)) return;

  const price = cleanCurrencies(target);

  if (!price) return;

  const timeCost = calcCost(price, rate);

  $cost.innerHTML = ` (🛠 ${timeCost} h)`;

  $insertPoint.appendChild($cost);
};

const parseRate = value => parseFloat(value);

const getConfig = () => {
  return new Promise(resolve => {
    browser.storage.local.get().then(state => {
      const rate = parseRate(state.rate);
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
          try{
            console.log({rate: state.rate})
            addTimeCost($price, selector, state.rate);
          }catch(error){ // Handle errors
          }
        });
      });
    }
  });
})();
