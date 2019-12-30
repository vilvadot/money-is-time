const DEFAULT_RATE = 6

const $rateInput = document.querySelector("#rate");
const $save = document.querySelector(".save--button");

const parseRate = value => parseFloat(value) || DEFAULT_RATE

const updateRate = value => {
  const updatedRate = parseRate($rateInput.value)
  browser.storage.local.set({
    rate: updatedRate
  });
  console.log("Rate updated:", updatedRate);
};

// Set initial Value
browser.storage.local.get().then(state => {
  $rateInput.value = parseRate(state.rate)
})

$save.addEventListener("click", updateRate);
