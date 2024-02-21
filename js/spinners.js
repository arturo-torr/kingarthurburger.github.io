document.addEventListener("DOMContentLoaded", function () {
  let imageContainers = document.querySelectorAll(".img-container");
  let cont = 5;

  imageContainers.forEach(function (container) {
    let spinner = container.querySelector(".spinner-border");
    let img = container.querySelector("img");

    img.onload = function () {
      spinner.classList.add("d-none");
      img.classList.remove("d-none");
      img.classList.add("d-block");
    };

    setTimeout(function () {
      img.src = `img/burger${cont++}.jpg`;
    }, 2000);
  });
});
