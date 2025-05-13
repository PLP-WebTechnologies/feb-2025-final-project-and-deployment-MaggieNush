document.addEventListener('DOMContentLoaded', function() {
  // Product Data
  const products = [
    {
      id: "lavender-bliss",
      name: "Lavender Bliss Candle",
      price: 1200,
      category: "lavender",
      image: "https://i.pinimg.com/736x/4e/f1/2e/4ef12eafa4305a9596d75feaf821af5a.jpg",
      description: "Soothe your senses with the calming aroma of fresh lavender fields that brings peace to any room."
    },
    {
      id: "rose-serenity",
      name: "Rose Serenity Candle",
      price: 1500,
      category: "rose",
      image: "https://i.pinimg.com/736x/92/0f/07/920f076fd7a5d916964c593041617575.jpg",
      description: "Envelop yourself in the romantic scent of garden roses for a touch of elegance and warmth."
    },
    {
      id: "eucalyptus-calm",
      name: "Eucalyptus Calm Candle",
      price: 1000,
      category: "eucalyptus",
      image: "https://i.pinimg.com/736x/21/aa/d4/21aad4fdd59d76e4fa3db1dae588db8e.jpg",
      description: "Refresh your space with the crisp, clean aroma of eucalyptus that clears the mind and invigorates the senses."
    }
  ];
  
  // Initialize cart from localStorage or create empty cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // DOM Elements
  const productGrid = document.querySelector('.product-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cartIcon = document.querySelector('.cart-icon');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const closeCartBtn = document.querySelector('.close-cart');
  const overlay = document.querySelector('.overlay');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCountElement = document.querySelector('.cart-count');
  const checkoutBtn = document.querySelector('.checkout-btn');
  const clearCartBtn = document.querySelector('.clear-cart-btn');
  const lightbox = document.querySelector('.lightbox');
  const closeLightboxBtn = document.querySelector('.close-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxPrice = document.querySelector('.lightbox-price');
  const addToCartLightbox = document.querySelector('.add-to-cart-lightbox');
  const toast = document.getElementById('toast');
  const toastContent = document.querySelector('.toast-content');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');
  
  // Initial setup
  displayProducts(products);
  updateCartCount();
  
  // Add event listeners for best seller buttons
  document.querySelectorAll('.best-seller-card .add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      addToCart(productId);
    });
  });
  
  document.querySelectorAll('.best-seller-card .view-product').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      openLightbox(productId);
    });
  });
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navList.classList.toggle('open');
      const spans = this.querySelectorAll('span');
      if (navList.classList.contains('open')) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
  
  // Close mobile menu when clicking elsewhere
  document.addEventListener('click', function(e) {
    if (navList.classList.contains('open') && !e.target.closest('.nav') && !e.target.classList.contains('mobile-menu-btn')) {
      navList.classList.remove('open');
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close mobile menu when clicking on a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768 && navList.classList.contains('open')) {
        navList.classList.remove('open');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });
  
  // Filter products
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter products
      if (filter === 'all') {
        displayProducts(products);
      } else {
        const filteredProducts = products.filter(product => product.category === filter);
        displayProducts(filteredProducts);
      }
    });
  });
  
  // Toggle cart sidebar
  cartIcon.addEventListener('click', function() {
    cartSidebar.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  });
  
  // Close cart sidebar
  closeCartBtn.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);
  
  // Clear cart
  clearCartBtn.addEventListener('click', function() {
    cart = [];
    updateCart();
    showToast('Cart cleared successfully');
  });
  
  // Checkout
  checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }
    alert('Thank you for your purchase! This is a demo website, so no payment will be processed.');
    cart = [];
    updateCart();
    closeCart();
    showToast('Order placed successfully!');
  });
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // In a real app, this data will be sent to a server
      const name = document.getElementById('name').value;
      contactForm.reset();
      showToast(`Thank you ${name}! We will get back to you soon.`);
    });
  }
  
  // Newsletter form submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // In a real app, this data will be sent to a server
      newsletterForm.reset();
      showToast('Thank you for subscribing to our newsletter!');
    });
  }
  
  // Functions
  function formatPrice(price) {
    return `KSh ${price.toLocaleString()}`;
  }
  
  function displayProducts(productsToShow) {
    productGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
      productGrid.innerHTML = '<div class="empty-results">No products found.</div>';
      return;
    }
    
    productsToShow.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-category category-${product.category}">${product.category}</span>
          <h3>${product.name}</h3>
          <p class="product-price">${formatPrice(product.price)}</p>
          <div class="product-actions">
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
            <button class="btn btn-secondary view-product" data-id="${product.id}">View Details</button>
          </div>
        </div>
      `;
      
      productGrid.appendChild(productCard);
      
      // Add event listeners for the buttons
      productCard.querySelector('.add-to-cart').addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        addToCart(productId);
      });
      
      productCard.querySelector('.view-product').addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        openLightbox(productId);
      });
      
      productCard.querySelector('.product-image').addEventListener('click', function() {
        const productId = productCard.querySelector('.add-to-cart').getAttribute('data-id');
        openLightbox(productId);
      });
    });
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    updateCart();
    showToast(`${product.name} added to cart!`);
  }
  
  function updateCart() {
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Update cart items display
    renderCartItems();
    
    // Update cart total
    calculateCartTotal();
  }
  
  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    if (totalItems > 0) {
      cartCountElement.style.display = 'flex';
    } else {
      cartCountElement.style.display = 'none';
    }
  }
  
  function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
      return;
    }
    
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-price">${formatPrice(item.price)}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="remove-item" data-id="${item.id}">&times;</button>
      `;
      
      cartItemsContainer.appendChild(cartItem);
      
      // Add event listeners
      cartItem.querySelector('.decrease').addEventListener('click', function() {
        updateItemQuantity(item.id, -1);
      });
      
      cartItem.querySelector('.increase').addEventListener('click', function() {
        updateItemQuantity(item.id, 1);
      });
      
      cartItem.querySelector('.remove-item').addEventListener('click', function() {
        removeFromCart(item.id);
      });
    });
  }
  
  function calculateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
  }
  
  function updateItemQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    
    if (!cartItem) return;
    
    cartItem.quantity += change;
    
    if (cartItem.quantity < 1) {
      removeFromCart(productId);
    } else {
      updateCart();
    }
  }
  
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  
  function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }
  
  function openLightbox(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    lightboxImage.src = product.image;
    lightboxImage.alt = product.name;
    lightboxTitle.textContent = product.name;
    lightboxDescription.textContent = product.description;
    lightboxPrice.textContent = formatPrice(product.price);
    addToCartLightbox.setAttribute('data-id', product.id);
    
    lightbox.classList.add('visible');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    
    // Add event listener to add-to-cart button in lightbox
    addToCartLightbox.onclick = function() {
      const id = this.getAttribute('data-id');
      addToCart(id);
    };
  }
  
  closeLightboxBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  
  function closeLightbox() {
    lightbox.classList.remove('visible');
    if (!cartSidebar.classList.contains('open')) {
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    }
  }
  
  function showToast(message) {
    toastContent.textContent = message;
    toast.classList.add('show');
    
    setTimeout(function() {
      toast.classList.remove('show');
    }, 3000);
  }
});