/* =========================================================
   VITA — HEALTH & WELLNESS ECOMMERCE
   WebStudio Concept Project
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     HELPERS
     ======================================================= */

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0
    }).format(price);
  };


  /* =======================================================
     PRODUCT DATA
     ======================================================= */

  const products = [
    {
      id: 1,
      name: "Daily Care",
      category: "Salud",
      price: 12990,
      oldPrice: 15990,
      image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=85"
    },
    {
      id: 2,
      name: "Skin Balance",
      category: "Belleza",
      price: 18490,
      oldPrice: 21990,
      image:
        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=85"
    },
    {
      id: 3,
      name: "Pure Care",
      category: "Cuidado",
      price: 9990,
      oldPrice: 12990,
      image:
        "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=85"
    },
    {
      id: 4,
      name: "Vita Plus",
      category: "Salud",
      price: 15990,
      oldPrice: 18990,
      image:
        "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&q=85"
    }
  ];


  /* =======================================================
     LOCAL STORAGE
     ======================================================= */

  let cart = JSON.parse(localStorage.getItem("vitaCart")) || [];

  let favorites =
    JSON.parse(localStorage.getItem("vitaFavorites")) || [];

  let selectedLocation =
    localStorage.getItem("vitaLocation") || "Santiago";


  /* =======================================================
     DOM ELEMENTS
     ======================================================= */

  const siteHeader = $("#siteHeader");

  const categoryButton = $("#categoryButton");
  const categoryMenu = $("#categoryMenu");
  const closeCategory = $("#closeCategory");

  const mobileMenuButton = $("#mobileMenuButton");
  const mobileMenu = $("#mobileMenu");
  const closeMobileMenu = $("#closeMobileMenu");

  const cartButton = $("#cartButton");
  const cartDrawer = $("#cartDrawer");
  const drawerOverlay = $("#drawerOverlay");
  const closeCart = $("#closeCart");

  const cartContent = $("#cartContent");
  const cartTotal = $("#cartTotal");
  const cartCount = $("#cartCount");
  const cartHeaderTotal = $("#cartHeaderTotal");
  const checkoutButton = $("#checkoutButton");

  const favoritesCount = $("#favoritesCount");

  const searchForm = $("#searchForm");
  const searchInput = $("#searchInput");
  const searchResults = $("#searchResults");

  const locationButton = $("#locationButton");
  const locationModal = $("#locationModal");
  const closeLocation = $("#closeLocation");

  const accountButton = $("#accountButton");
  const accountModal = $("#accountModal");
  const closeAccount = $("#closeAccount");
  const accountDemoButton = $("#accountDemoButton");

  const newsletterForm = $("#newsletterForm");

  const toast = $("#toast");
  const toastTitle = $("#toastTitle");
  const toastMessage = $("#toastMessage");


  /* =======================================================
     BODY LOCK
     ======================================================= */

  const lockBody = () => {
    document.body.classList.add("no-scroll");
  };

  const unlockBody = () => {
    document.body.classList.remove("no-scroll");
  };


  /* =======================================================
     TOAST
     ======================================================= */

  let toastTimer;

  const showToast = (title, message) => {

    if (!toast) return;

    if (toastTitle) {
      toastTitle.textContent = title;
    }

    if (toastMessage) {
      toastMessage.textContent = message;
    }

    toast.classList.add("active");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("active");
    }, 3000);
  };


  /* =======================================================
     CATEGORY MENU
     ======================================================= */

  const openCategoryMenu = () => {

    if (!categoryMenu) return;

    categoryMenu.classList.add("active");
  };

  const closeCategoryMenu = () => {

    if (!categoryMenu) return;

    categoryMenu.classList.remove("active");
  };

  categoryButton?.addEventListener("click", () => {

    categoryMenu?.classList.toggle("active");

  });

  closeCategory?.addEventListener("click", closeCategoryMenu);


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const openMobileMenu = () => {

    if (!mobileMenu) return;

    mobileMenu.classList.add("active");
    lockBody();
  };

  const closeMobileMenuFunction = () => {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("active");
    unlockBody();
  };

  mobileMenuButton?.addEventListener(
    "click",
    openMobileMenu
  );

  closeMobileMenu?.addEventListener(
    "click",
    closeMobileMenuFunction
  );

  $$("#mobileMenu a").forEach((link) => {

    link.addEventListener("click", () => {
      closeMobileMenuFunction();
    });

  });


  /* =======================================================
     CART
     ======================================================= */

  const saveCart = () => {

    localStorage.setItem(
      "vitaCart",
      JSON.stringify(cart)
    );

  };


  const openCart = () => {

    cartDrawer?.classList.add("active");
    drawerOverlay?.classList.add("active");

    lockBody();

  };


  const closeCartDrawer = () => {

    cartDrawer?.classList.remove("active");
    drawerOverlay?.classList.remove("active");

    unlockBody();

  };


  cartButton?.addEventListener(
    "click",
    openCart
  );

  closeCart?.addEventListener(
    "click",
    closeCartDrawer
  );

  drawerOverlay?.addEventListener(
    "click",
    closeCartDrawer
  );


  /* =======================================================
     CART — ADD
     ======================================================= */

  const addToCart = (productId) => {

    const product = products.find(
      (item) => item.id === productId
    );

    if (!product) return;

    const existingProduct = cart.find(
      (item) => item.id === productId
    );

    if (existingProduct) {

      existingProduct.quantity += 1;

    } else {

      cart.push({
        ...product,
        quantity: 1
      });

    }

    saveCart();
    updateCart();

    showToast(
      "Producto agregado",
      `${product.name} fue agregado a tu carrito.`
    );

  };


  /* =======================================================
     CART — REMOVE
     ======================================================= */

  const removeFromCart = (productId) => {

    const product = cart.find(
      (item) => item.id === productId
    );

    cart = cart.filter(
      (item) => item.id !== productId
    );

    saveCart();
    updateCart();

    if (product) {

      showToast(
        "Producto eliminado",
        `${product.name} fue eliminado del carrito.`
      );

    }

  };


  /* =======================================================
     CART — QUANTITY
     ======================================================= */

  const changeQuantity = (productId, amount) => {

    const product = cart.find(
      (item) => item.id === productId
    );

    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {

      removeFromCart(productId);

      return;
    }

    saveCart();
    updateCart();

  };


  /* =======================================================
     CART — RENDER
     ======================================================= */

  const updateCart = () => {

    if (!cartContent) return;

    if (cart.length === 0) {

      cartContent.innerHTML = `
        <div class="cart-empty">
          <div>
            <strong>Tu carrito está vacío</strong>
            <p>Agrega productos para comenzar.</p>
          </div>
        </div>
      `;

    } else {

      cartContent.innerHTML = cart
        .map((item) => {

          const subtotal =
            item.price * item.quantity;

          return `
            <article class="cart-item">

              <div class="cart-item-image">
                <img
                  src="${item.image}"
                  alt="${item.name}"
                >
              </div>

              <div class="cart-item-info">

                <strong>${item.name}</strong>

                <small>
                  ${item.category}
                </small>

                <div class="cart-item-controls">

                  <button
                    type="button"
                    data-action="decrease"
                    data-id="${item.id}"
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>

                  <span>
                    ${item.quantity}
                  </span>

                  <button
                    type="button"
                    data-action="increase"
                    data-id="${item.id}"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>

                </div>

              </div>

              <div class="cart-item-price">

                ${formatPrice(subtotal)}

                <button
                  type="button"
                  class="cart-item-remove"
                  data-action="remove"
                  data-id="${item.id}"
                >
                  Eliminar
                </button>

              </div>

            </article>
          `;

        })
        .join("");

    }


    const totalQuantity = cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

    const totalPrice = cart.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );


    if (cartCount) {
      cartCount.textContent =
        totalQuantity;
    }


    if (cartTotal) {
      cartTotal.textContent =
        formatPrice(totalPrice);
    }


    if (cartHeaderTotal) {
      cartHeaderTotal.textContent =
        formatPrice(totalPrice);
    }


    if (checkoutButton) {

      checkoutButton.disabled =
        cart.length === 0;

      checkoutButton.style.opacity =
        cart.length === 0 ? "0.45" : "1";

      checkoutButton.style.cursor =
        cart.length === 0
          ? "not-allowed"
          : "pointer";
    }

  };


  /* =======================================================
     CART — BUTTON EVENTS
     ======================================================= */

  cartContent?.addEventListener(
    "click",
    (event) => {

      const button =
        event.target.closest(
          "[data-action]"
        );

      if (!button) return;

      const productId =
        Number(button.dataset.id);

      const action =
        button.dataset.action;


      if (action === "increase") {

        changeQuantity(productId, 1);

      }

      if (action === "decrease") {

        changeQuantity(productId, -1);

      }

      if (action === "remove") {

        removeFromCart(productId);

      }

    }
  );


  /* =======================================================
     PRODUCT BUTTONS
     ======================================================= */

  const connectProductButtons = () => {

    $$(".add-product").forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(button.dataset.id);

          addToCart(id);

        }
      );

    });


    $$(".quick-add").forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(button.dataset.id);

          if (id) {

            addToCart(id);

          } else {

            addToCart(1);

          }

        }
      );

    });

  };


  connectProductButtons();


  /* =======================================================
     FAVORITES
     ======================================================= */

  const saveFavorites = () => {

    localStorage.setItem(
      "vitaFavorites",
      JSON.stringify(favorites)
    );

  };


  const updateFavoritesCount = () => {

    if (!favoritesCount) return;

    favoritesCount.textContent =
      favorites.length;

  };


  const updateFavoriteButtons = () => {

    $$(".favorite-button").forEach(
      (button) => {

        const id =
          Number(button.dataset.id);

        const active =
          favorites.includes(id);

        button.classList.toggle(
          "active",
          active
        );

        button.setAttribute(
          "aria-pressed",
          active ? "true" : "false"
        );

      }
    );

  };


  const toggleFavorite = (productId) => {

    const product = products.find(
      (item) => item.id === productId
    );

    if (!product) return;


    if (favorites.includes(productId)) {

      favorites =
        favorites.filter(
          (id) => id !== productId
        );

      showToast(
        "Favorito eliminado",
        `${product.name} salió de tus favoritos.`
      );

    } else {

      favorites.push(productId);

      showToast(
        "Agregado a favoritos",
        `${product.name} fue guardado.`
      );

    }


    saveFavorites();
    updateFavoritesCount();
    updateFavoriteButtons();

  };


  $$(".favorite-button").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(button.dataset.id);

          toggleFavorite(id);

        }
      );

    }
  );


  /* =======================================================
     PRODUCT FILTERS
     ======================================================= */

  const productCards =
    $$(".product-card");

  const filterButtons =
    $$(".product-filter");


  filterButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(
          (item) =>
            item.classList.remove(
              "active"
            )
        );

        button.classList.add("active");

        const filter =
          button.dataset.filter ||
          button.textContent
            .trim()
            .toLowerCase();


        productCards.forEach(
          (card) => {

            const category =
              card.dataset.category ||
              card
                .querySelector(
                  ".product-category"
                )
                ?.textContent
                .trim()
                .toLowerCase();


            if (
              filter === "todos" ||
              filter === "todo" ||
              filter === "all"
            ) {

              card.style.display = "";

              return;
            }


            if (
              category &&
              category.toLowerCase() ===
                filter.toLowerCase()
            ) {

              card.style.display = "";

            } else {

              card.style.display = "none";

            }

          }
        );

      }
    );

  });


  /* =======================================================
     SHOW ALL PRODUCTS
     ======================================================= */

  const showAllProducts =
    $("#showAllProducts");

  showAllProducts?.addEventListener(
    "click",
    () => {

      productCards.forEach(
        (card) => {
          card.style.display = "";
        }
      );

      filterButtons.forEach(
        (button) => {

          button.classList.remove(
            "active"
          );

        }
      );

      const allButton =
        [...filterButtons].find(
          (button) =>
            button.textContent
              .trim()
              .toLowerCase() ===
            "todos"
        );

      allButton?.classList.add("active");

      document
        .querySelector("#productos")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );


  /* =======================================================
     SEARCH
     ======================================================= */

  const getProductCardData = () => {

    return [...productCards].map(
      (card) => {

        const title =
          card.querySelector(
            "h3"
          )?.textContent
            .trim() || "";

        const category =
          card.querySelector(
            ".product-category"
          )?.textContent
            .trim() || "";

        const description =
          card.querySelector(
            "p"
          )?.textContent
            .trim() || "";

        const id =
          Number(
            card.dataset.id
          ) ||
          Number(
            card
              .querySelector(
                ".add-product"
              )
              ?.dataset.id
          );


        return {
          card,
          title,
          category,
          description,
          id
        };

      }
    );

  };


  const renderSearchResults = (query) => {

    if (!searchResults) return;


    if (!query) {

      searchResults.classList.remove(
        "active"
      );

      searchResults.innerHTML = "";

      return;
    }


    const normalizedQuery =
      query.toLowerCase();


    const matches =
      getProductCardData().filter(
        (item) => {

          return (
            item.title
              .toLowerCase()
              .includes(normalizedQuery) ||
            item.category
              .toLowerCase()
              .includes(normalizedQuery) ||
            item.description
              .toLowerCase()
              .includes(normalizedQuery)
          );

        }
      );


    if (matches.length === 0) {

      searchResults.innerHTML = `
        <div style="
          padding:18px;
          font-size:12px;
          color:#69736d;
        ">
          No encontramos productos para
          <strong>"${query}"</strong>.
        </div>
      `;

      searchResults.classList.add(
        "active"
      );

      return;
    }


    searchResults.innerHTML =
      matches
        .slice(0, 5)
        .map(
          (item) => `
            <button
              type="button"
              class="search-result-item"
              data-id="${item.id}"
              style="
                width:100%;
                padding:14px 16px;
                border:0;
                border-bottom:1px solid #dfe4df;
                background:#fff;
                text-align:left;
                cursor:pointer;
              "
            >
              <strong style="
                display:block;
                font-size:12px;
              ">
                ${item.title}
              </strong>

              <small style="
                color:#69736d;
                font-size:9px;
              ">
                ${item.category}
              </small>
            </button>
          `
        )
        .join("");


    searchResults.classList.add(
      "active"
    );

  };


  const filterProductsBySearch = (
    query
  ) => {

    const normalizedQuery =
      query.toLowerCase().trim();


    productCards.forEach(
      (card) => {

        if (!normalizedQuery) {

          card.style.display = "";

          return;
        }


        const text =
          card.textContent
            .toLowerCase();


        card.style.display =
          text.includes(normalizedQuery)
            ? ""
            : "none";

      }
    );

  };


  searchInput?.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value.trim();

      renderSearchResults(query);
      filterProductsBySearch(query);

    }
  );


  searchForm?.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const query =
        searchInput?.value.trim();

      if (!query) {

        showToast(
          "Buscar productos",
          "Escribe algo para comenzar."
        );

        return;
      }

      renderSearchResults(query);

      document
        .querySelector("#productos")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );


  searchResults?.addEventListener(
    "click",
    (event) => {

      const result =
        event.target.closest(
          ".search-result-item"
        );

      if (!result) return;


      const id =
        Number(result.dataset.id);


      const productCard =
        [...productCards].find(
          (card) => {

            const cardId =
              Number(
                card.dataset.id
              ) ||
              Number(
                card
                  .querySelector(
                    ".add-product"
                  )
                  ?.dataset.id
              );

            return cardId === id;

          }
        );


      if (productCard) {

        productCards.forEach(
          (card) => {
            card.style.display = "none";
          }
        );

        productCard.style.display = "";

        productCard.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }


      searchResults.classList.remove(
        "active"
      );

    }
  );


  /* =======================================================
     LOCATION
     ======================================================= */

  const updateLocationText = () => {

    if (!locationButton) return;

    const strong =
      locationButton.querySelector(
        "strong"
      );

    if (strong) {
      strong.textContent =
        selectedLocation;
    }

  };


  const openLocationModal = () => {

    locationModal?.classList.add(
      "active"
    );

    lockBody();

  };


  const closeLocationModal = () => {

    locationModal?.classList.remove(
      "active"
    );

    unlockBody();

  };


  locationButton?.addEventListener(
    "click",
    openLocationModal
  );

  closeLocation?.addEventListener(
    "click",
    closeLocationModal
  );


  $$(".location-option").forEach(
    (option) => {

      option.addEventListener(
        "click",
        () => {

          const location =
            option.dataset.location ||
            option
              .querySelector("strong")
              ?.textContent
              .trim();

          if (!location) return;

          selectedLocation =
            location;

          localStorage.setItem(
            "vitaLocation",
            selectedLocation
          );

          updateLocationText();
          closeLocationModal();

          showToast(
            "Ubicación actualizada",
            `Mostrando experiencia para ${selectedLocation}.`
          );

        }
      );

    }
  );


  /* =======================================================
     ACCOUNT
     ======================================================= */

  const openAccountModal = () => {

    accountModal?.classList.add(
      "active"
    );

    lockBody();

  };


  const closeAccountModal = () => {

    accountModal?.classList.remove(
      "active"
    );

    unlockBody();

  };


  accountButton?.addEventListener(
    "click",
    openAccountModal
  );

  closeAccount?.addEventListener(
    "click",
    closeAccountModal
  );


  accountDemoButton?.addEventListener(
    "click",
    () => {

      closeAccountModal();

      showToast(
        "Demo VITA",
        "La cuenta de usuario estará disponible en una siguiente versión."
      );

    }
  );


  /* =======================================================
     NEWSLETTER
     ======================================================= */

  newsletterForm?.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const input =
        newsletterForm.querySelector(
          "input[type='email']"
        );

      const email =
        input?.value.trim();


      if (!email) {

        showToast(
          "Ingresa tu correo",
          "Necesitamos un email para registrarte."
        );

        return;
      }


      if (!email.includes("@")) {

        showToast(
          "Correo no válido",
          "Revisa tu dirección de email."
        );

        return;
      }


      if (input) {
        input.value = "";
      }


      showToast(
        "Suscripción confirmada",
        "Ya estás dentro de VITA."
      );

    }
  );


  /* =======================================================
     CHECKOUT
     ======================================================= */

  checkoutButton?.addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        showToast(
          "Carrito vacío",
          "Agrega al menos un producto."
        );

        return;
      }


      showToast(
        "Checkout demo",
        "Esta experiencia es conceptual. El pago no está habilitado."
      );

    }
  );


  /* =======================================================
     CLOSE MODALS WITH ESC
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }


      closeCategoryMenu();
      closeCartDrawer();
      closeLocationModal();
      closeAccountModal();
      closeMobileMenuFunction();

      searchResults?.classList.remove(
        "active"
      );

    }
  );


  /* =======================================================
     CLOSE SEARCH WHEN CLICKING OUTSIDE
     ======================================================= */

  document.addEventListener(
    "click",
    (event) => {

      if (
        searchWrapperContains(event.target)
      ) {
        return;
      }

      searchResults?.classList.remove(
        "active"
      );

    }
  );


  function searchWrapperContains(target) {

    const wrapper =
      searchInput?.closest(
        ".search-wrapper"
      );

    return wrapper
      ? wrapper.contains(target)
      : false;

  }


  /* =======================================================
     SMOOTH ANCHOR LINKS
     ======================================================= */

  $$('a[href^="#"]').forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const href =
            link.getAttribute("href");

          if (
            !href ||
            href === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              href
            );

          if (!target) return;

          event.preventDefault();

          closeCategoryMenu();

          closeMobileMenuFunction();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );


  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {

      const currentScroll =
        window.scrollY;


      if (!siteHeader) return;


      if (currentScroll > 20) {

        siteHeader.style.boxShadow =
          "0 8px 30px rgba(16,42,28,0.06)";

      } else {

        siteHeader.style.boxShadow =
          "none";

      }


      lastScroll =
        currentScroll;

    },
    {
      passive: true
    }
  );


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  updateCart();

  updateFavoritesCount();

  updateFavoriteButtons();

  updateLocationText();

});