// ================================
// Side Panel (Hamburger Menu)
// ================================
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidePanel = document.getElementById("sidePanel");
const overlay = document.getElementById("overlay");
const closeSidePanel = document.getElementById("closeSidePanel");

hamburgerBtn?.addEventListener("click", () => {
    sidePanel.classList.add("open");
    overlay.classList.add("show");
});

closeSidePanel?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

function closeMenu() {
    sidePanel.classList.remove("open");
    overlay.classList.remove("show");
}

// ================================
// Account Dropdown
// ================================
const accountBtn = document.getElementById("accountBtn");
const accountDropdown = document.getElementById("accountDropdown");

accountBtn?.addEventListener("mouseenter", () => {
    accountDropdown.style.display = "block";
});

accountBtn?.addEventListener("mouseleave", () => {
    accountDropdown.style.display = "none";
});

// ================================
// Search Suggestions
// ================================
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("searchSuggestions");

const suggestions = [
    "iPhone 15",
    "Samsung Galaxy",
    "Laptop",
    "Headphones",
    "Smart Watch",
    "Air Fryer",
    "Kindle",
    "Nike Shoes",
    "Bluetooth Speaker",
    "Gaming Console"
];

searchInput?.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    suggestionsBox.innerHTML = "";

    if (!value) {
        suggestionsBox.style.display = "none";
        return;
    }

    const filtered = suggestions.filter(item =>
        item.toLowerCase().includes(value)
    );

    filtered.forEach(item => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.textContent = item;

        div.addEventListener("click", () => {
            searchInput.value = item;
            suggestionsBox.style.display = "none";
        });

        suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display =
        filtered.length > 0 ? "block" : "none";
});

// ================================
// Hero Carousel
// ================================
const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const nextBtn = document.getElementById("carouselNext");
const prevBtn = document.getElementById("carouselPrev");
const dotsContainer = document.getElementById("carouselDots");

let currentSlide = 0;

slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
        currentSlide = index;
        updateCarousel();
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateCarousel() {
    track.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
}

nextBtn?.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
});

prevBtn?.addEventListener("click", () => {
    currentSlide =
        (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}, 5000);

// ================================
// Product Row Horizontal Scroll
// ================================
document.querySelectorAll(".product-row-wrapper").forEach(wrapper => {
    const row = wrapper.querySelector(".product-row");
    const leftBtn = wrapper.querySelector(".left");
    const rightBtn = wrapper.querySelector(".right");

    leftBtn?.addEventListener("click", () => {
        row.scrollBy({
            left: -400,
            behavior: "smooth"
        });
    });

    rightBtn?.addEventListener("click", () => {
        row.scrollBy({
            left: 400,
            behavior: "smooth"
        });
    });
});

// ================================
// Shopping Cart
// ================================
let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartFooter = document.getElementById("cartFooter");
const toast = document.getElementById("toast");

cartBtn?.addEventListener("click", () => {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("show");
});

cartCloseBtn?.addEventListener("click", closeCart);
cartOverlay?.addEventListener("click", closeCart);

function closeCart() {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("show");
}

document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        const existing = cart.find(item => item.id === id);

        if (existing) {
            existing.qty++;
        } else {
            cart.push({
                id,
                name,
                price,
                qty: 1
            });
        }

        showToast(`${name} added to cart`);
        updateCart();
    });
});

function updateCart() {
    cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    if (cart.length === 0) {
        cartItems.innerHTML =
            "<p class='empty-cart'>Your cart is empty.</p>";
        cartFooter.style.display = "none";
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <p>Qty: ${item.qty}</p>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = `₹${total.toLocaleString()}`;
    cartFooter.style.display = "block";
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// ================================
// Back To Top
// ================================
const backToTop = document.getElementById("backToTop");

backToTop?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ================================
// Sticky Navbar Shadow
// ================================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow =
            "0 2px 10px rgba(0,0,0,0.2)";
    } else {
        navbar.style.boxShadow = "none";
    }
});