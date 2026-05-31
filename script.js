document.querySelectorAll(".card button").forEach(button => {
  button.addEventListener("click", () => {

    button.innerHTML = "✔ ДОДАНО";
    button.style.background = "#2ecc71";

    setTimeout(() => {
      button.innerHTML = "В КОШИК";
      button.style.background = "#ff8c1a";
    }, 1500);

  });
});

/* Кнопки категорій */

document.querySelectorAll(".categories button").forEach(btn => {

  btn.addEventListener("click", () => {

    document.querySelectorAll(".categories button")
      .forEach(b => b.classList.remove("active-category"));

    btn.classList.add("active-category");

  });

});