// document.addEventListener('DOMContentLoaded', function() {
//   // Product Data
//   const products = [
//     {
//       id: "lavender-bliss",
//       name: "Lavender Bliss Candle",
//       price: 1200,
//       category: "lavender",
//       image: "https://i.pinimg.com/736x/4e/f1/2e/4ef12eafa4305a9596d75feaf821af5a.jpg",
//       description: "Soothe your senses with the calming aroma of fresh lavender fields that brings peace to any room."
//     },
//     {
//       id: "rose-serenity",
//       name: "Rose Serenity Candle",
//       price: 1500,
//       category: "rose",
//       image: "https://i.pinimg.com/736x/92/0f/07/920f076fd7a5d916964c593041617575.jpg",
//       description: "Envelop yourself in the romantic scent of garden roses for a touch of elegance and warmth."
//     },
//     {
//       id: "eucalyptus-calm",
//       name: "Eucalyptus Calm Candle",
//       price: 1000,
//       category: "eucalyptus",
//       image: "https://i.pinimg.com/736x/21/aa/d4/21aad4fdd59d76e4fa3db1dae588db8e.jpg",
//       description: "Refresh your space with the crisp, clean aroma of eucalyptus that clears the mind and invigorates the senses."
//     }
//   ];
  
//   // Initialize cart from localStorage or create empty cart
//   let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
//   // DOM Elements
//   const productGrid = document.querySelector('.product-grid');
//   const filterButtons = document.querySelectorAll('.filter-btn');
//   const cartIcon = document.querySelector('.cart-icon');
//   const cartSidebar = document.querySelector('.cart-sidebar');
//   const closeCartBtn = document.querySelector('.close-cart');
//   const overlay = document.querySelector('.overlay');
//   const cartItemsContainer = document.querySelector('.cart-items');
//   const cartTotal = document.getElementById('cart-total');
//   const cartCountElement = document.querySelector('.cart-count');
//   const checkoutBtn = document.querySelector('.checkout-btn');
//   const clearCartBtn = document.querySelector('.clear-cart-btn');
//   const lightbox = document.querySelector('.lightbox');
//   const closeLightboxBtn = document.querySelector('.close-lightbox');
//   const lightboxImage = document.getElementById('lightbox-image');
//   const lightboxTitle = document.getElementById('lightbox-title');
//   const lightboxDescription = document.getElementById('lightbox-description');
//   const lightboxPrice = document.querySelector('.lightbox-price');
//   const addToCartLightbox = document.querySelector('.add-to-cart-lightbox');
//   const toast = document.getElementById('toast');
//   const toastContent = document.querySelector('.toast-content');
//   const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
//   const navList = document.querySelector('.nav-list');
//   const contactForm = document.getElementById('contact-form');
//   const newsletterForm = document.getElementById('newsletter-form');
  
//   // Initial setup
//   displayProducts(products);
//   updateCartCount();
  
//   // Add event listeners for best seller buttons
//   document.querySelectorAll('.best-seller-card .add-to-cart').forEach(button => {
//     button.addEventListener('click', function() {
//       const productId = this.getAttribute('data-id');
//       addToCart(productId);
//     });
//   });
  
//   document.querySelectorAll('.best-seller-card .view-product').forEach(button => {
//     button.addEventListener('click', function() {
//       const productId = this.getAttribute('data-id');
//       openLightbox(productId);
//     });
//   });
  
//   // Header scroll effect
//   window.addEventListener('scroll', function() {
//     const header = document.querySelector('.header');
//     if (window.scrollY > 50) {
//       header.classList.add('scrolled');
//     } else {
//       header.classList.remove('scrolled');
//     }
//   });
  
//   // Mobile menu toggle
//   if (mobileMenuBtn) {
//     mobileMenuBtn.addEventListener('click', function() {
//       navList.classList.toggle('open');
//       const spans = this.querySelectorAll('span');
//       if (navList.classList.contains('open')) {
//         spans[0].style.transform = 'translateY(8px) rotate(45deg)';
//         spans[1].style.opacity = '0';
//         spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
//       } else {
//         spans[0].style.transform = 'none';
//         spans[1].style.opacity = '1';
//         spans[2].style.transform = 'none';
//       }
//     });
//   }
  
//   // Close mobile menu when clicking elsewhere
//   document.addEventListener('click', function(e) {
//     if (navList.classList.contains('open') && !e.target.closest('.nav') && !e.target.classList.contains('mobile-menu-btn')) {
//       navList.classList.remove('open');
//       const spans = mobileMenuBtn.querySelectorAll('span');
//       spans[0].style.transform = 'none';
//       spans[1].style.opacity = '1';
//       spans[2].style.transform = 'none';
//     }
//   });
  
//   // Close mobile menu when clicking on a nav link
//   document.querySelectorAll('.nav-link').forEach(link => {
//     link.addEventListener('click', function() {
//       if (window.innerWidth <= 768 && navList.classList.contains('open')) {
//         navList.classList.remove('open');
//         const spans = mobileMenuBtn.querySelectorAll('span');
//         spans[0].style.transform = 'none';
//         spans[1].style.opacity = '1';
//         spans[2].style.transform = 'none';
//       }
//     });
//   });
  
//   // Filter products
//   filterButtons.forEach(button => {
//     button.addEventListener('click', function() {
//       const filter = this.getAttribute('data-filter');
      
//       // Update active button
//       filterButtons.forEach(btn => btn.classList.remove('active'));
//       this.classList.add('active');
      
//       // Filter products
//       if (filter === 'all') {
//         displayProducts(products);
//       } else {
//         const filteredProducts = products.filter(product => product.category === filter);
//         displayProducts(filteredProducts);
//       }
//     });
//   });
  
//   // Toggle cart sidebar
//   cartIcon.addEventListener('click', function() {
//     cartSidebar.classList.add('open');
//     overlay.classList.add('visible');
//     document.body.style.overflow = 'hidden';
//   });
  
//   // Close cart sidebar
//   closeCartBtn.addEventListener('click', closeCart);
//   overlay.addEventListener('click', closeCart);
  
//   // Clear cart
//   clearCartBtn.addEventListener('click', function() {
//     cart = [];
//     updateCart();
//     showToast('Cart cleared successfully');
//   });
  
//   // Checkout
//   checkoutBtn.addEventListener('click', function() {
//     if (cart.length === 0) {
//       showToast('Your cart is empty');
//       return;
//     }
//     alert('Thank you for your purchase! This is a demo website, so no payment will be processed.');
//     cart = [];
//     updateCart();
//     closeCart();
//     showToast('Order placed successfully!');
//   });
  
//   // Contact form submission
//   if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//       e.preventDefault();
//       // In a real app, this data will be sent to a server
//       const name = document.getElementById('name').value;
//       contactForm.reset();
//       showToast(`Thank you ${name}! We will get back to you soon.`);
//     });
//   }
  
//   // Newsletter form submission
//   if (newsletterForm) {
//     newsletterForm.addEventListener('submit', function(e) {
//       e.preventDefault();
//       // In a real app, this data will be sent to a server
//       newsletterForm.reset();
//       showToast('Thank you for subscribing to our newsletter!');
//     });
//   }
  
//   // Functions
//   function formatPrice(price) {
//     return `KSh ${price.toLocaleString()}`;
//   }
  
//   function displayProducts(productsToShow) {
//     productGrid.innerHTML = '';
    
//     if (productsToShow.length === 0) {
//       productGrid.innerHTML = '<div class="empty-results">No products found.</div>';
//       return;
//     }
    
//     productsToShow.forEach(product => {
//       const productCard = document.createElement('div');
//       productCard.className = 'product-card';
//       productCard.innerHTML = `
//         <div class="product-image">
//           <img src="${product.image}" alt="${product.name}" loading="lazy">
//         </div>
//         <div class="product-info">
//           <span class="product-category category-${product.category}">${product.category}</span>
//           <h3>${product.name}</h3>
//           <p class="product-price">${formatPrice(product.price)}</p>
//           <div class="product-actions">
//             <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
//             <button class="btn btn-secondary view-product" data-id="${product.id}">View Details</button>
//           </div>
//         </div>
//       `;
      
//       productGrid.appendChild(productCard);
      
//       // Add event listeners for the buttons
//       productCard.querySelector('.add-to-cart').addEventListener('click', function() {
//         const productId = this.getAttribute('data-id');
//         addToCart(productId);
//       });
      
//       productCard.querySelector('.view-product').addEventListener('click', function() {
//         const productId = this.getAttribute('data-id');
//         openLightbox(productId);
//       });
      
//       productCard.querySelector('.product-image').addEventListener('click', function() {
//         const productId = productCard.querySelector('.add-to-cart').getAttribute('data-id');
//         openLightbox(productId);
//       });
//     });
//   }
  
//   function addToCart(productId) {
//     const product = products.find(p => p.id === productId);
//     if (!product) return;
    
//     const existingItem = cart.find(item => item.id === productId);
    
//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       cart.push({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: 1
//       });
//     }
    
//     updateCart();
//     showToast(`${product.name} added to cart!`);
//   }
  
//   function updateCart() {
//     // Update local storage
//     localStorage.setItem('cart', JSON.stringify(cart));
    
//     // Update cart count
//     updateCartCount();
    
//     // Update cart items display
//     renderCartItems();
    
//     // Update cart total
//     calculateCartTotal();
//   }
  
//   function updateCartCount() {
//     const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
//     cartCountElement.textContent = totalItems;
    
//     if (totalItems > 0) {
//       cartCountElement.style.display = 'flex';
//     } else {
//       cartCountElement.style.display = 'none';
//     }
//   }
  
//   function renderCartItems() {
//     cartItemsContainer.innerHTML = '';
    
//     if (cart.length === 0) {
//       cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
//       return;
//     }
    
//     cart.forEach(item => {
//       const cartItem = document.createElement('div');
//       cartItem.className = 'cart-item';
//       cartItem.innerHTML = `
//         <div class="cart-item-image">
//           <img src="${item.image}" alt="${item.name}">
//         </div>
//         <div class="cart-item-info">
//           <h4>${item.name}</h4>
//           <p class="cart-item-price">${formatPrice(item.price)}</p>
//           <div class="cart-item-quantity">
//             <button class="quantity-btn decrease" data-id="${item.id}">-</button>
//             <span>${item.quantity}</span>
//             <button class="quantity-btn increase" data-id="${item.id}">+</button>
//           </div>
//         </div>
//         <button class="remove-item" data-id="${item.id}">&times;</button>
//       `;
      
//       cartItemsContainer.appendChild(cartItem);
      
//       // Add event listeners
//       cartItem.querySelector('.decrease').addEventListener('click', function() {
//         updateItemQuantity(item.id, -1);
//       });
      
//       cartItem.querySelector('.increase').addEventListener('click', function() {
//         updateItemQuantity(item.id, 1);
//       });
      
//       cartItem.querySelector('.remove-item').addEventListener('click', function() {
//         removeFromCart(item.id);
//       });
//     });
//   }
  
//   function calculateCartTotal() {
//     const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     cartTotal.textContent = formatPrice(total);
//   }
  
//   function updateItemQuantity(productId, change) {
//     const cartItem = cart.find(item => item.id === productId);
    
//     if (!cartItem) return;
    
//     cartItem.quantity += change;
    
//     if (cartItem.quantity < 1) {
//       removeFromCart(productId);
//     } else {
//       updateCart();
//     }
//   }
  
//   function removeFromCart(productId) {
//     cart = cart.filter(item => item.id !== productId);
//     updateCart();
//   }
  
//   function closeCart() {
//     cartSidebar.classList.remove('open');
//     overlay.classList.remove('visible');
//     document.body.style.overflow = '';
//   }
  
//   function openLightbox(productId) {
//     const product = products.find(p => p.id === productId);
//     if (!product) return;
    
//     lightboxImage.src = product.image;
//     lightboxImage.alt = product.name;
//     lightboxTitle.textContent = product.name;
//     lightboxDescription.textContent = product.description;
//     lightboxPrice.textContent = formatPrice(product.price);
//     addToCartLightbox.setAttribute('data-id', product.id);
    
//     lightbox.classList.add('visible');
//     overlay.classList.add('visible');
//     document.body.style.overflow = 'hidden';
    
//     // Add event listener to add-to-cart button in lightbox
//     addToCartLightbox.onclick = function() {
//       const id = this.getAttribute('data-id');
//       addToCart(id);
//     };
//   }
  
//   closeLightboxBtn.addEventListener('click', closeLightbox);
//   overlay.addEventListener('click', closeLightbox);
  
//   function closeLightbox() {
//     lightbox.classList.remove('visible');
//     if (!cartSidebar.classList.contains('open')) {
//       overlay.classList.remove('visible');
//       document.body.style.overflow = '';
//     }
//   }
  
//   function showToast(message) {
//     toastContent.textContent = message;
//     toast.classList.add('show');
    
//     setTimeout(function() {
//       toast.classList.remove('show');
//     }, 3000);
//   }
// });





// Product Data
const products = [
  {
    id: 'lavender-bliss',
    name: 'Lavender Bliss Candle',
    category: 'lavender',
    price: 1200,
    description: 'Soothe your senses with the calming aroma of fresh lavender fields that brings peace to any room.',
    image: 'https://i.pinimg.com/736x/65/31/31/6531318bee9242efe0a05417a393b41c.jpg'
  },
  {
    id: 'rose-serenity',
    name: 'Rose Serenity Candle',
    category: 'rose',
    price: 1500,
    description: 'Envelop yourself in the romantic scent of garden roses for a touch of elegance and warmth.',
    image: 'https://i.pinimg.com/736x/1c/d2/8c/1cd28cda6009fd069700b8280bfd60e3.jpg'
  },
  {
    id: 'eucalyptus-calm',
    name: 'Eucalyptus Calm Candle',
    category: 'eucalyptus',
    price: 1000,
    description: 'Refresh your space with the crisp, clean aroma of eucalyptus that clears the mind and invigorates the senses.',
    image: 'https://i.pinimg.com/736x/7b/05/7f/7b057f77ac45c45bda959d1a349927f0.jpg'
  },
  {
    id: 'lavender-mint',
    name: 'Lavender & Mint Fusion',
    category: 'lavender',
    price: 1300,
    description: 'A refreshing blend of calming lavender with cool mint notes for a balanced atmosphere.',
    image: 'https://i.pinimg.com/736x/33/ee/96/33ee963fd483972134f0dde10f0c3b52.jpg'
  },
  {
    id: 'wild-rose',
    name: 'Wild Rose Garden',
    category: 'rose',
    price: 1400,
    description: 'Transport yourself to a blooming garden filled with wild roses and subtle earthy undertones.',
    image: 'https://i.pinimg.com/736x/56/6f/19/566f195f5737f82636fb3d745e3df2e9.jpg'
  },
  {
    id: 'eucalyptus-tea',
    name: 'Eucalyptus & Tea Tree',
    category: 'eucalyptus',
    price: 1200,
    description: 'A purifying blend of eucalyptus and tea tree essential oils to cleanse your space and invigorate your senses.',
    image: 'https://i.pinimg.com/736x/dd/ee/95/ddee956d2a0e5f361bc85f4f59e90391.jpg'
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    category: 'lavender',
    price: 1100,
    description: 'Drift off to peaceful sleep with this gentle lavender infusion designed for bedtime tranquility.',
    image: 'https://i.pinimg.com/736x/8a/be/ec/8abeec0fdbe3cfc64e4d29e161d61c58.jpg'
  },
  {
    id: 'rose-vanilla',
    name: 'Rose & Vanilla Embrace',
    category: 'rose',
    price: 1600,
    description: 'Indulge in the luxurious combination of delicate roses and warm vanilla for a comforting atmosphere.',
    image: 'https://i.pinimg.com/736x/de/53/e1/de53e14f30662b4be913bb8de9d77799.jpg'
  }
];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const overlay = document.querySelector('.overlay');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.querySelector('.checkout-btn');
const clearCartBtn = document.querySelector('.clear-cart-btn');
const toast = document.getElementById('toast');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');
const lightbox = document.querySelector('.lightbox');
const closeLightbox = document.querySelector('.close-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxPrice = document.querySelector('.lightbox-price');
const addToCartLightbox = document.querySelector('.add-to-cart-lightbox');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');

// Cart array to store items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the page
function init() {
  // Add scroll event for header
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Check if we're on the products page
  if (productGrid) {
    displayProducts('all');
    setupFilters();
  }

  // Setup event listeners
  setupCartListeners();
  setupMobileMenu();
  setupLightbox();
  setupForms();

  // Update cart display
  updateCartDisplay();
}

// Display products by category
function displayProducts(category) {
  if (!productGrid) return;
  
  productGrid.innerHTML = '';
  
  const filteredProducts = category === 'all' ? 
    products : 
    products.filter(product => product.category === category);

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <div class="product-image" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <span class="product-category category-${product.category}">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-price">KSh ${product.price}</p>
        <div class="product-actions">
          <button class="btn btn-primary add-to-cart" 
            data-id="${product.id}" 
            data-name="${product.name}" 
            data-price="${product.price}" 
            data-image="${product.image}">
            Add to Cart
          </button>
          <button class="btn btn-secondary view-product" data-id="${product.id}">View Details</button>
        </div>
      </div>
    `;
    productGrid.appendChild(productCard);
  });

  // Add event listeners to the new product cards
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  const viewProductButtons = document.querySelectorAll('.view-product');
  viewProductButtons.forEach(button => {
    button.addEventListener('click', openProductLightbox);
  });

  const productImages = document.querySelectorAll('.product-image');
  productImages.forEach(image => {
    image.addEventListener('click', openProductLightbox);
  });
}

// Setup filter buttons
function setupFilters() {
  if (!filterButtons.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter products
      displayProducts(filter);
    });
  });
}

// Setup cart functionality
function setupCartListeners() {
  // Open cart
  cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  });

  // Close cart
  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  });

  // Close cart when clicking overlay
  overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    lightbox.classList.remove('visible');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  });

  // Checkout button
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }
    
    showToast('Thank you for your order!');
    cart = [];
    saveCart();
    updateCartDisplay();
    
    setTimeout(() => {
      cartSidebar.classList.remove('open');
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    }, 1500);
  });

  // Clear cart button
  clearCartBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    cart = [];
    saveCart();
    updateCartDisplay();
    showToast('Cart cleared');
  });

  // Add to cart buttons (for ones already in the DOM)
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

// Add to cart function
function addToCart(e) {
  const button = e.target;
  const id = button.getAttribute('data-id');
  const name = button.getAttribute('data-name');
  const price = parseInt(button.getAttribute('data-price'));
  const image = button.getAttribute('data-image');
  
  // Check if item already in cart
  const existingItemIndex = cart.findIndex(item => item.id === id);
  
  if (existingItemIndex !== -1) {
    // Increment quantity
    cart[existingItemIndex].quantity++;
  } else {
    // Add new item
    cart.push({
      id,
      name,
      price,
      image,
      quantity: 1
    });
  }
  
  // Save cart to localStorage
  saveCart();
  
  // Update cart display
  updateCartDisplay();
  
  // Show toast
  showToast(`${name} added to cart!`);
  
  // Animate cart icon
  cartIcon.classList.add('pulse');
  setTimeout(() => {
    cartIcon.classList.remove('pulse');
  }, 300);
}

// Update cart display
function updateCartDisplay() {
  // Update cart count
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Update cart items
  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<div class="empty-cart">Your cart is empty</div>`;
      cartTotal.textContent = `KSh 0`;
      return;
    }
    
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
      
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-price">KSh ${item.price}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="remove-item" data-id="${item.id}">&times;</button>
      `;
      
      cartItemsContainer.appendChild(cartItem);
    });
    
    // Update cart total
    cartTotal.textContent = `KSh ${totalPrice}`;
    
    // Add event listeners to quantity buttons
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const removeButtons = document.querySelectorAll('.remove-item');
    
    decreaseButtons.forEach(button => {
      button.addEventListener('click', decreaseQuantity);
    });
    
    increaseButtons.forEach(button => {
      button.addEventListener('click', increaseQuantity);
    });
    
    removeButtons.forEach(button => {
      button.addEventListener('click', removeFromCart);
    });
  }
}

// Decrease item quantity
function decreaseQuantity(e) {
  const id = e.target.getAttribute('data-id');
  const itemIndex = cart.findIndex(item => item.id === id);
  
  if (cart[itemIndex].quantity > 1) {
    cart[itemIndex].quantity--;
  } else {
    cart.splice(itemIndex, 1);
  }
  
  saveCart();
  updateCartDisplay();
}

// Increase item quantity
function increaseQuantity(e) {
  const id = e.target.getAttribute('data-id');
  const itemIndex = cart.findIndex(item => item.id === id);
  
  cart[itemIndex].quantity++;
  
  saveCart();
  updateCartDisplay();
}

// Remove item from cart
function removeFromCart(e) {
  const id = e.target.getAttribute('data-id');
  const itemIndex = cart.findIndex(item => item.id === id);
  
  cart.splice(itemIndex, 1);
  
  saveCart();
  updateCartDisplay();
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Show toast message
function showToast(message) {
  const toastContent = document.querySelector('.toast-content');
  toastContent.textContent = message;
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Setup mobile menu
function setupMobileMenu() {
  mobileMenuBtn.addEventListener('click', () => {
    navList.classList.toggle('open');
    
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (navList.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Setup lightbox
function setupLightbox() {
  // Event delegation for view product buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('view-product') || e.target.closest('.view-product')) {
      openProductLightbox(e);
    } else if (e.target.closest('.product-image')) {
      const id = e.target.closest('.product-image').getAttribute('data-id');
      if (id) {
        const event = { target: { getAttribute: () => id } };
        openProductLightbox(event);
      }
    }
  });
  
  // Close lightbox
  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('visible');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  });
  
  // Add to cart from lightbox
  addToCartLightbox.addEventListener('click', () => {
    const id = addToCartLightbox.getAttribute('data-id');
    const product = products.find(product => product.id === id);
    
    if (product) {
      const event = { 
        target: {
          getAttribute: (attr) => {
            if (attr === 'data-id') return product.id;
            if (attr === 'data-name') return product.name;
            if (attr === 'data-price') return product.price;
            if (attr === 'data-image') return product.image;
            return null;
          }
        }
      };
      
      addToCart(event);
      
      // Close lightbox after adding to cart
      setTimeout(() => {
        lightbox.classList.remove('visible');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
      }, 500);
    }
  });
}

// Open product lightbox
function openProductLightbox(e) {
  const id = e.target.getAttribute('data-id');
  const product = products.find(product => product.id === id);
  
  if (product) {
    lightboxImage.src = product.image;
    lightboxTitle.textContent = product.name;
    lightboxDescription.textContent = product.description;
    lightboxPrice.textContent = `KSh ${product.price}`;
    addToCartLightbox.setAttribute('data-id', product.id);
    
    lightbox.classList.add('visible');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
}

// Setup forms
function setupForms() {
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // In a real application, you would send this data to a server
      console.log('Form submitted:', { name, email, message });
      
      // Reset form
      contactForm.reset();
      
      // Show success message
      showToast('Message sent successfully!');
    });
  }
  
  // Newsletter form submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get email value
      const email = newsletterForm.querySelector('input').value;
      
      // In a real application, you would add this email to a mailing list
      console.log('Newsletter subscription:', email);
      
      // Reset form
      newsletterForm.reset();
      
      // Show success message
      showToast('Thank you for subscribing!');
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);