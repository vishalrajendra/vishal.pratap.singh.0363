const products = [
  {
    id: 1,
    name: "Premium Wireless Buds",
    category: "Audio",
    price: 199.99,
    image: "BUDS.jpg",
    description: "Immersive sound with active noise cancellation.",
  },
  {
    id: 2,
    name: "Ultra Slim Laptop",
    category: "Computing",
    price: 1299.99,
    image: "LAPTOP.jpg",
    description: "Power meets portability in this sleek machine.",
  },
  {
    id: 3,
    name: "Smart Microwave",
    category: "Home",
    price: 249.99,
    image: "MICROWAVE.jpg",
    description: "Intelligent cooking with voice control integration.",
  },
];

let cartCount = 0;

const productsGrid = document.getElementById("products-grid");
const cartCountElement = document.querySelector(".cart-count");

function renderProducts() {
  productsGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <span class="product-price">$${product.price}</span>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="ph ph-shopping-cart-simple"></i>
                    Add to Cart
                </button>
            </div>
        </article>
    `
    )
    .join("");
}


window.addToCart = function (productId) {
  cartCount++;
  updateCartUI();

  
  const btn = event.currentTarget;
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="ph ph-check"></i> Added';
  btn.style.background = "#10b981"; // Success green

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = "";
  }, 2000);
};

function updateCartUI() {
  cartCountElement.textContent = cartCount;

  
  cartCountElement.style.transform = "scale(1.2)";
  setTimeout(() => {
    cartCountElement.style.transform = "scale(1)";
  }, 200);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

