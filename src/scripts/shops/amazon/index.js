import getConfig from "../../util/getConfig";
import injectTime from "./injectTime";

const DEAL_PRICE = ".dealPriceText";
export const LIST_VIEW_PRICE = ".a-price-whole";
const GENERIC_PRICE = ":not(.a-color-price) > .a-color-price"; // avoids the insertion of duplicated nodes
const PRICE_SELECTORS = [GENERIC_PRICE, LIST_VIEW_PRICE, DEAL_PRICE];

  getConfig().then(state => {
    if (state.isEnabled) {
      PRICE_SELECTORS.forEach(selector => {
        const $prices = document.querySelectorAll(selector);
        $prices.forEach($price => {
          injectTime($price, selector, state.rate);
        });
      });
    }
  });
