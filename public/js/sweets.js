// function to increase/decrease the count in sweet card 
const sweetCards = document.querySelectorAll(".sweet-card");

sweetCards.forEach((card) => {
  const decreaseBtn = document.querySelector(".decrease");
  const increaseBtn = document.querySelector(".increase");
  const displayCount = document.querySelector(".count");

  let count = 1;

  function updateCount() {
    displayCount.textContent = count;
  };

  increaseBtn.addEventListener("click", () => {
    count++;
    updateCount();
  });

  decreaseBtn.addEventListener("click", () => {
    if (count > 1) {
      count--;
      updateCount();
    }
  });

});


