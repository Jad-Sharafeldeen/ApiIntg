const productList = document.getElementById("product-list");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");

let products = [];

// fetching apis
async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  products = await response.json();
  displayProducts();
}

function displayProducts() {
  productList.innerHTML = "";
  products.slice(0, 24).forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.setAttribute("data-id", product.id);
    productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
    productDiv.addEventListener("click", () => showPopup(product));
    productList.appendChild(productDiv);
  });
}

function showPopup(product) {
  document.getElementById("popup-image").src = product.image;
  document.getElementById("popup-name").innerText = product.title;
  document.getElementById("popup-price").innerText = `Price: $${product.price}`;
  document.getElementById(
    "popup-category"
  ).innerText = `Category: ${product.category}`;
  document.getElementById(
    "popup-rating"
  ).innerText = `Rating: ${product.rating.rate} (${product.rating.count})`;
  popup.classList.remove("hidden");
}

closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

fetchProducts();
