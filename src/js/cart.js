/* OBTENEMOS LOS DATOS DEL STORAGE Y LO PARSEAMOS A UN JSON */
const itemsCart = JSON.parse(localStorage.getItem('itemsCart'));

function createItems(container, arrayItems) {
  const containerItems = document.querySelector(container);

  arrayItems.forEach((item) => {
    const itemCart = `
      <article class="item rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div class="space-y-4 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:space-y-0">
          <div class="flex gap-4 items-center">
            <img class="shrink-0 h-20 w-20 object-cover object-center sm:order-1" src="./src/assets/img/pizza-${item.imagen}.webp" alt="${item.nombre}" loading="lazy" />
            <div class="w-full min-w-0 flex-1 space-y-4 sm:hidden sm:order-2 sm:max-w-md">
              <p class="text-base font-medium text-gray-900 line-clamp-2">${item.nombre}</p>
              <div class="flex items-center gap-4">
                <button type="button" class="remove-item custom-focus-visible inline-flex items-center text-sm font-medium text-red-600 hover:underline" data-item-id="${item.id}">
                  <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between sm:order-3 sm:justify-end">
            <div class="flex items-center">
              <button type="button" class="decrement-button custom-focus-visible inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-slate-800 border-gray-300 bg-gray-100 transition-colors duration-300 hover:bg-slate-200 hover:text-red-500" aria-label="Disminuir cantidad">
                <svg class="h-2.5 w-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                </svg>
              </button>
              <span class="quantity w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900">1</span>
              <button type="button" class="increment-button custom-focus-visible inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-slate-800 border-gray-300 bg-gray-100 transition-colors duration-300 hover:bg-slate-200 hover:text-red-500" aria-label="Aumentar cantidad">
                <svg class="h-2.5 w-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>
            <div class="text-end sm:order-4 sm:w-32">
              <p class="text-base font-bold text-gray-900">S/ <span class="item-price">${item.precio}</span></p>
            </div>
          </div>
          <div class="hidden w-full min-w-0 flex-1 space-y-4 sm:block sm:order-2 sm:max-w-md">
            <p class="text-base font-medium text-gray-900 line-clamp-2">${item.nombre}</p>
            <div class="flex items-center gap-4">
              <button type="button" class="remove-item custom-focus-visible inline-flex items-center text-sm font-medium text-red-600 hover:underline" data-item-id="${item.id}">
                <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </article>
    `;

    containerItems.innerHTML += itemCart;
  });
}

function removeItem() {
  const buttonsRemoveItem = document.querySelectorAll('.remove-item');

  buttonsRemoveItem.forEach((button) => {
    button.addEventListener('click', (e) => {
      /* OBTENEMOS EL ARTICLE MAS CERCANO DEL BOTON CLICKEADO, Y LO ELIMINAMOS DEL DOM */
      const articleParent = e.currentTarget.closest('.item');
      articleParent.remove();

      /* OBTENEMOS EL ID DEL BOTON CLICKEADO, LO BUSCAMOS Y ASIGNAMOS A INDEX, Y LUEGO ELIMINAMOS DEL STORAGE */
      const itemId = e.currentTarget.dataset.itemId;
      const index = itemsCart.findIndex((item) => item.id === itemId);
      itemsCart.splice(index, 1);

      /* ACTUALIZAMOS LA VARIABLE DE STORAGE Y RECARGAMOS LA PAGINA*/
      localStorage.setItem('itemsCart', JSON.stringify(itemsCart));
      location.reload();
    });
  });
}

function emptyCart() {
  const emptyCart = document.querySelector('.empty-cart');

  emptyCart.addEventListener('click', () => {
    /* ELIMINAMOS LA VARIABLE DE STORAGE Y RECARGAMOS LA PAGINA */
    localStorage.removeItem('itemsCart');
    location.reload();
  });
}

function isExistItemsCart() {
  const defaultParagraph = document.querySelector('.default-paragraph');
  const emptyCart = document.querySelector('.empty-cart');
  const btnPay = document.querySelector('.btn-pay');
  
  /* SI EXISTEN ELEMENTOS EN EL ARRAY, ELIMINAMOS EL PARRAFO Y CAMBIAMOS LAS CLASES CORR */
  if (itemsCart && itemsCart.length > 0) {
    defaultParagraph.remove();
  
    emptyCart.classList.remove('hidden');
    emptyCart.classList.add('flex');
  
    btnPay.classList.remove('cursor-not-allowed');
    btnPay.removeAttribute('disabled');
  }
}

function updateItemQuantity() {
  const items = document.querySelectorAll('.item');

  /* RECORREMOS CADA ITEM DEL CARRITO DE COMPRA */
  items.forEach((item) => {
    /* OBTENEMOS LOS ELEMENTOS DEL ITEM */
    const decrementButton = item.querySelector('.decrement-button');
    const incrementButton = item.querySelector('.increment-button');
    const quantity = item.querySelector('.quantity');
    const itemPrice = item.querySelector('.item-price');
    const priceValue = parseFloat(itemPrice.textContent);
    let quantityValue = parseInt(quantity.textContent);

    /* DECREMENTAMOS LA CANTIDAD */
    decrementButton.addEventListener('click', () => {
      if (quantityValue > 1) {
        quantityValue--;
        quantity.textContent = quantityValue;

        /* ACTUALIZAMOS EL PRECIO */
        itemPrice.textContent = (priceValue * quantityValue).toFixed(2);

        /* ACTUALIZAMOS EL RESUMEN DE ORDEN */
        updateSummaryOrder();
      }
    });

    /* AUMENTAMOS LA CANTIDAD */
    incrementButton.addEventListener('click', () => {
      if (quantityValue < 10) {
        quantityValue++;
        quantity.textContent = quantityValue;

        /* ACTUALIZAMOS EL PRECIO */
        itemPrice.textContent = (priceValue * quantityValue).toFixed(2);

        /* ACTUALIZAMOS EL RESUMEN DE ORDEN */
        updateSummaryOrder();
      }
    });
  });
}

function updateSummaryOrder() {
  const itemsPrices = document.querySelectorAll('.item-price');
  const subtotalElement = document.querySelector('.subtotal');
  const discountElement = document.querySelector('.discount');
  const totalElement = document.querySelector('.total');
  const valueForDiscountElement = document.querySelector('.value-for-discount');
  const percentageForDiscountElement = document.querySelector('.percentage-for-discount');
  const valueForDiscount = 300;
  const percentageForDiscount = 20;
  let subtotal = 0;
  let discount = 0;
  let total = 0;

  itemsPrices.forEach((price) => {
    const priceValue = parseFloat(price.textContent);
  
    subtotal += priceValue;
  });
  
  /* APLICAMOS UN DESCUENTO CON LOS VALORES CORRESPONDIENTES */
  if (subtotal >= valueForDiscount) {
    discount = subtotal * (percentageForDiscount / 100);
  }
  
  total = subtotal - discount;
  
  /* ASIGNAMOS LOS VALORES CORRESPONDIENTES PARA VISUALIZAR */
  subtotalElement.textContent = subtotal.toFixed(2);
  discountElement.textContent = discount.toFixed(2);
  totalElement.textContent = total.toFixed(2);
  valueForDiscountElement.textContent = valueForDiscount.toFixed(2);
  percentageForDiscountElement.textContent = percentageForDiscount;
}

function payOrder() {
  const form = document.querySelector('.form-order');
  const btnPay = document.querySelector('.btn-pay');

  btnPay.addEventListener('click', (e) => {
    e.preventDefault();

    const orderDate = document.querySelector('.order-date');
    const orderTotal = document.querySelector('.order-total');
    const totalValue = document.querySelector('.total').textContent;
    const dateValue = new Date();
    const day = dateValue.getDate();
    const month = dateValue.getMonth() + 1;
    const year = dateValue.getFullYear();
    const hour = dateValue.getHours();
    const minute = dateValue.getMinutes();

    /* ASIGNAMOS LOS VALORES A LOS INPUTS DEL FORM */
    orderTotal.value = totalValue;
    orderDate.value = `${day}/${month}/${year} - ${hour}:${minute < 10 ? '0' + minute : minute}`;

    /* ALERTAMOS QUE SE HA COMPLETADO EL ORDEN */
    alert('¡Orden pagada y registrada exitosamente!\nGracias por su compra.');

    /* ELIMINAMOS LA VARIABLE DE STORAGE */
    localStorage.removeItem('itemsCart');

    /* ENVIAMOS EL FORMULARIO */
    form.submit();
  });
}

if (itemsCart) {
  createItems('.container-items-cart', itemsCart);
}
removeItem();
emptyCart();
isExistItemsCart();
updateItemQuantity();
updateSummaryOrder();
payOrder();