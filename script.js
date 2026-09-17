document.getElementById("buyButton").addEventListener("click", () => {
  createRequest("buy");
});

document.getElementById("freeButton").addEventListener("click", () => {
  createRequest("free");
});

document.getElementById("exchangeButton").addEventListener("click", () => {
  createRequest("exchange");
});
