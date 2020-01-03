import getConfig from "../util/getConfig";
import calcTime from "../util/calcTime";
import extractPrice from "../util/extractPrice";

const PERCENTAGE_SYMBOL = "%";
const DEAL_PRICE = '.dealPriceText'
const LIST_VIEW_PRICE = ".a-price-whole";
const GENERIC_PRICE = ":not(.a-color-price) > .a-color-price"; // avoids the insertion of duplicated nodes
const PRICE_SELECTORS = [GENERIC_PRICE, LIST_VIEW_PRICE, DEAL_PRICE];

const injectCost = ($node, selector, rate) => {
  const $cost = document.createElement("b");
  $cost.style.fontSize = ".8em";

  let target = $node.textContent;
  let $insertPoint = $node;

  if (selector === LIST_VIEW_PRICE) {
    $insertPoint = $node.parentNode;
  }

  if (target.includes(PERCENTAGE_SYMBOL)) return;

  const price = extractPrice(target);

  if (!price) return;

  const timeCost = calcTime(price, rate);

  $cost.innerHTML = ` (🛠 ${timeCost} h)`;

  $insertPoint.appendChild($cost);
};

getConfig().then(state => {
  try {
    if (state.isEnabled) {
      PRICE_SELECTORS.forEach(selector => {
        const $prices = document.querySelectorAll(selector);
        $prices.forEach($price => {
          injectCost($price, selector, state.rate);
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
});
