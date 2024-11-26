// candleManager.js
export function handleCandleBlow() {
  const candleBlown = sessionStorage.getItem("candleBlown");
  const flameElements = document.querySelectorAll(".cake-holder.done .flame"); 

  if (candleBlown === "true") {
    alert("Candle is already blown!");
    flameElements.forEach((flame) => {
      if (flame) {
        flame.style.opacity = 0; 
      }
    });
  } else {
    sessionStorage.setItem("candleBlown", "true");
    alert("Candle blown!");
    flameElements.forEach((flame) => {
      if (flame) {
        flame.style.opacity = 0; 
      }
    });
  }
}
