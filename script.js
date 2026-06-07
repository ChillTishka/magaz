document.querySelectorAll(".card button").forEach(button => {

  button.addEventListener("click", () => {

    const card = button.closest(".card");

    const name =
      card.querySelector("h3").textContent;

    const image =
      card.querySelector("img").src;

    const price =
      Number(card.dataset.price);

    cart.push({
      name,
      image,
      price
    });

    updateCart();

    button.innerHTML = "✔ ДОДАНО";
    button.style.background = "#2ecc71";

    setTimeout(() => {
      button.innerHTML = "В КОШИК";
      button.style.background = "#ff8c1a";
    }, 1200);

  });

});


document.querySelectorAll(".filter-title").forEach(title => {

  title.addEventListener("click", () => {

    title.parentElement.classList.toggle("collapsed");

  });

});


const topCategoryButtons = document.querySelectorAll(".categories button");

topCategoryButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    btn.classList.toggle("active-category");

    filterProducts();

  });

});


const cards = document.querySelectorAll(".card");

const filters = document.querySelectorAll(
  ".category-filter, .brand-filter, .power-filter"
);

const priceFrom = document.getElementById("priceFrom");
const priceTo = document.getElementById("priceTo");

function filterProducts() {

  const selectedCategories = [...document.querySelectorAll(".category-filter:checked")]
    .map(cb => cb.value);

  const selectedBrands = [...document.querySelectorAll(".brand-filter:checked")]
    .map(cb => cb.value);

  const selectedPower = [...document.querySelectorAll(".power-filter:checked")]
    .map(cb => cb.value);

  const topCategories = [...document.querySelectorAll(".categories .active-category")]
    .map(btn => btn.dataset.category);

  const minPrice = Number(priceFrom.value) || 0;
  const maxPrice = Number(priceTo.value) || Infinity;

  const searchText = searchInput.value.toLowerCase().trim();
  const sortType = sortSelect.value;

  cards.forEach(card => {

    const category = card.dataset.category;
    const brand = card.dataset.brand;
    const power = card.dataset.power;
    const price = Number(card.dataset.price);

    const title = card.querySelector("h3")
      .textContent
      .toLowerCase();

    const badge =
      card.querySelector(".badge")?.textContent.trim() || "";

    const sidebarCategoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(category);

    const topCategoryMatch =
      topCategories.length === 0 ||
      topCategories.includes(category);

    const categoryMatch =
      sidebarCategoryMatch &&
      topCategoryMatch;

    const brandMatch =
      selectedBrands.length === 0 ||
      selectedBrands.includes(brand);

    const powerMatch =
      selectedPower.length === 0 ||
      selectedPower.includes(power);

    const priceMatch =
      price >= minPrice &&
      price <= maxPrice;

    const searchMatch =
      title.includes(searchText);

    let sortMatch = true;

    if (sortType === "hot") {
      sortMatch = badge === "HOT";
    }

    if (sortType === "new") {
      sortMatch = badge === "NEW";
    }

    if (
      categoryMatch &&
      brandMatch &&
      powerMatch &&
      priceMatch &&
      searchMatch &&
      sortMatch
    ) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }

  });
  if (sortType === "price") {

    const grid =
      document.querySelector(".products-grid");

    const visibleCards =
      [...cards].filter(card =>
        card.style.display !== "none"
      );

    visibleCards.sort((a, b) =>
      Number(a.dataset.price) -
      Number(b.dataset.price)
    );

    visibleCards.forEach(card => {
      grid.appendChild(card);
    });

  }
}

filters.forEach(filter => {
  filter.addEventListener("change", filterProducts);
});

priceFrom.addEventListener("input", filterProducts);
priceTo.addEventListener("input", filterProducts);



const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

searchInput.addEventListener("input", filterProducts);

sortSelect.addEventListener("change", filterProducts);

const cartBtn = document.querySelector(".cart-btn");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const buyBtn = document.querySelector(".buy-btn");
const cartCount = document.getElementById("cartCount");
const clearCart = document.getElementById("clearCart");
const successMessage = document.getElementById("successMessage");

let cart = [];

cartBtn.addEventListener("click", () => {
  cartPanel.classList.add("active");
  cartOverlay.classList.add("active");
});

closeCart.addEventListener("click", closeCartWindow);
cartOverlay.addEventListener("click", closeCartWindow);

function closeCartWindow() {
  cartPanel.classList.remove("active");
  cartOverlay.classList.remove("active");
}

function updateCart() {

  if (cart.length === 0) {

    cartItems.innerHTML =
      '<div class="empty-cart">Кошик порожній</div>';

    cartTotal.textContent = "0₴";
    cartCount.textContent = "0";
    return;
  }

  let total = 0;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {

    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">

        <img src="${item.image}">

        <div class="cart-info">
          <h4>${item.name}</h4>
          <div class="cart-price">${item.price}₴</div>
        </div>

        <button class="remove-item" data-index="${index}">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>
    `;
  });

  cartTotal.textContent =
    total.toLocaleString("uk-UA") + "₴";

  cartCount.textContent = cart.length;

  document.querySelectorAll(".remove-item").forEach(btn => {

    btn.addEventListener("click", () => {

      cart.splice(btn.dataset.index, 1);

      updateCart();

    });

  });

}

clearCart.addEventListener("click", () => {

  cart = [];

  updateCart();

});

buyBtn.addEventListener("click", () => {

  if (cart.length === 0) {
    alert("Кошик порожній!");
    return;
  }

  alert("Замовлення успішно оформлено!");

  cart = [];

  updateCart();

  closeCartWindow();

});