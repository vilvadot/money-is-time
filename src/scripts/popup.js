console.log("Remember money is time!");
const $rateInput = document.querySelector("#rate");
const $save = document.querySelector(".save--button");

const updateRate = value => {
  const updatedRate = $rateInput.value;
  browser.storage.local.set({
    rate: updatedRate
  });
  console.log("Rate updated:", updatedRate);
};

// Set initial Value
browser.storage.local.get().then(state => {
  $rateInput.value = state.rate
})

$save.addEventListener("click", updateRate);
