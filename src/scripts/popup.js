const $rateInput = document.querySelector("#rate");
const $enableCheckbox = document.querySelector("#enable");
const $save = document.querySelector(".save--button");

const parseRate = value => parseFloat(value) || DEFAULT_RATE

const updateRate = () => {
  const updatedRate = parseRate($rateInput.value)
  browser.storage.local.set({
    rate: updatedRate
  });
};

const togglePrices = event => {
  const isEnabled = event.target.checked
  browser.storage.local.set({
    isEnabled,
  });

  $enableCheckbox.checked = isEnabled
}

// Sync UI with storage
browser.storage.local.get().then(state => {
  $rateInput.value = parseRate(state.rate)
  $enableCheckbox.checked = state.isEnabled
})

$save.addEventListener("click", updateRate);
$enableCheckbox.addEventListener("change", togglePrices);