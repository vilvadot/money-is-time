import calcTime from "../../util/calcTime";
import extractPrice from "./extractPrice";
import {LIST_VIEW_PRICE} from './index'

const PERCENTAGE_SYMBOL = "%";

const injectTime = ($node, selector, rate) => {
    const $cost = document.createElement("b");
    $cost.style.fontSize = ".8em";
    
    let target = $node.textContent;
    let $insertPoint = $node
    
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

export default injectTime