import getConfig from './util/getConfig'
import parseRate from './util/parseRate'
import extension from './util/extension'

const $rateInput = document.querySelector("#rate");
const $enableCheckbox = document.querySelector("#enable");
const $save = document.querySelector(".save--button");

const updateRate = () => {
  const updatedRate = parseRate($rateInput.value)
  extension.storage.local.set({
    rate: updatedRate
  });
};

const togglePrices = event => {
  const isEnabled = event.target.checked
  extension.storage.local.set({
    isEnabled,
  });

  $enableCheckbox.checked = isEnabled
}

// Sync UI with storage
getConfig().then(state => {
  $rateInput.value = parseRate(state.rate)
  $enableCheckbox.checked = state.isEnabled
})

$save.addEventListener("click", updateRate);
$enableCheckbox.addEventListener("change", togglePrices);