let pizzas = [];
let pizzasRecommended = [];
let pizzasMoreSales = [];
let pizzasNews = [];

async function cargarPizzas() {
  const url = 'http://localhost/Proyecto_Final_Ciclo_VI/src/api/list.php';

  const response = await fetch(url);
  const data = await response.json(); // CONVIERTE LA RESPUESTA A JSON

  pizzas = data; // GUARDAR LOS DATOS

  pizzasRecommended = pizzas.filter((pizza) => pizza.etiqueta === 'recomendados');
  pizzasMoreSales = pizzas.filter((pizza) => pizza.etiqueta === 'mas vendidos');
  pizzasNews = pizzas.filter((pizza) => pizza.etiqueta === 'novedades');
}

await cargarPizzas(); // ESPERAMOS A QUE LA FUNCIÓN CARGARPIZZAS SE COMPLETE PARA CONTINUAR

removeSkeletons(); // PRIMERO REMOVEMOS LOS SKELETONS UNA VEZ ESPERADO QUE LAS PIZZAS YA SE CARGUEN

function createCards(container, arrayPizzas) {
  const containerCards = document.querySelector(container);
  
  arrayPizzas.forEach((pizza) => {
    const card = `
      <div class="swiper-slide">
        <article class="flex flex-col bg-white border border-slate-200 rounded-lg">
          <figure class="p-2.5 h-56 overflow-hidden">
            <img
              class="size-full rounded-md object-cover object-center"
              src="./src/assets/img/pizza-${pizza.imagen}.webp"
              alt="${pizza.nombre}"
              loading="lazy"
            />
          </figure>
          <div class="p-4">
            <div class="mb-2 flex gap-x-4 items-center justify-between text-lg text-slate-800 font-semibold whitespace-nowrap">
              <h3 class="truncate">${pizza.nombre}</h3>
              <p>S/ ${pizza.precio}</p>
            </div>
            <p class="text-sm text-slate-600 line-clamp-2">
              ${pizza.descripcion}
            </p>
            <div class="flex gap-4 mt-6">
              <button class="add-cart btn-primary w-full" type="button" data-pizza-id="${pizza.id}" data-pizza-name="${pizza.nombre}" data-pizza-price="${pizza.precio}" data-pizza-image="${pizza.imagen}">Agregar al carrito</button>
              <button data-tooltip-target="tooltip-default-${pizza.id}" type="button" class="open-modal custom-focus-visible flex justify-center items-center w-12 text-slate-600 rounded-md transition-colors duration-300 hover:bg-slate-200 hover:text-red-500" aria-label="Ver más información de la ${pizza.nombre}" data-pizza-id="${pizza.id}" data-pizza-name="${pizza.nombre}" data-pizza-price="${pizza.precio}" data-pizza-image="${pizza.imagen}" data-pizza-description="${pizza.descripcion}" data-pizza-ingredients="${pizza.ingredientes}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1-19.995.324L2 12l.004-.28C2.152 6.327 6.57 2 12 2zm0 9h-1l-.117.007a1 1 0 0 0 0 1.986L11 13v3l.007.117a1 1 0 0 0 .876.876L12 17h1l.117-.007a1 1 0 0 0 .876-.876L14 16l-.007-.117a1 1 0 0 0-.764-.857l-.112-.02L13 15v-3l-.007-.117a1 1 0 0 0-.876-.876L12 11zm.01-3-.127.007a1 1 0 0 0 0 1.986L12 10l.127-.007a1 1 0 0 0 0-1.986L12.01 8z"/></svg>
              </button><div id="tooltip-default-${pizza.id}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-xs font-medium text-white transition-opacity duration-300 bg-gray-700 rounded-lg shadow-sm opacity-0 tooltip" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate(837px, 337px);">
                  Más información
                  <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
        </article>
      </div>
    `;

    containerCards.innerHTML += card;
  });
}

function modal() {
  const modal = document.querySelector('.modal');
  const buttonsOpenModal = document.querySelectorAll('.open-modal');
  const closeModal = document.querySelector('.close-modal');

  buttonsOpenModal.forEach((button) => {
    button.addEventListener('click', (e) => {
      /* DATOS DEL MODAL */
      const image = document.querySelector('.modal-image');
      const title = document.querySelector('.modal-title');
      const description = document.querySelector('.modal-description');
      const ingredients = document.querySelector('.modal-ingredients');
      const price = document.querySelector('.modal-price');

      /* OBTENEMOS LOS VALORES DE LOS DATA ATRIBUTTES DE LA PIZZA CLICKEADA */
      const pizzaId = e.currentTarget.dataset.pizzaId;
      const pizzaName = e.currentTarget.dataset.pizzaName;
      const pizzaPrice = e.currentTarget.dataset.pizzaPrice;
      const pizzaImage = e.currentTarget.dataset.pizzaImage;
      const pizzaDescription = e.currentTarget.dataset.pizzaDescription;
      const pizzaIngredients = e.currentTarget.dataset.pizzaIngredients;

      /* ASIGNAMOS LOS VALORES A LOS DATOS DEL MODAL */
      image.setAttribute('src', `./src/assets/img/pizza-${pizzaImage}.webp`);
      image.setAttribute('alt', pizzaName);
      title.textContent = pizzaName;
      description.textContent = pizzaDescription;
      ingredients.textContent = pizzaIngredients;
      price.textContent = pizzaPrice;

      /* ASIGNAMOS LOS VALORES DE LOS DATA ATRIBUTTES A LOS DATA ATRIBUTTES DEL BOTON AGREGAR AL CARRITO */
      const addCartButton = document.querySelector('.add-cart-modal');
      addCartButton.dataset.pizzaId = pizzaId;
      addCartButton.dataset.pizzaName = pizzaName;
      addCartButton.dataset.pizzaPrice = pizzaPrice;
      addCartButton.dataset.pizzaImage = pizzaImage;
      
      /* ABRIMOS EL MODAL */
      modal.showModal();
    });
  });

  /* CERRAR MODAL */
  closeModal.addEventListener('click', () => {
    modal.close();
  });
}

function addToCart() {
  const buttonsAddCart = document.querySelectorAll('.add-cart');
  const itemsCart = JSON.parse(localStorage.getItem('itemsCart')) || []; // INICIALIZAR CON LA VARIABLE DE STORAGE SI EXISTE, SINO CREAMOS UN ARRAY VACIO

  buttonsAddCart.forEach((button) => {
    button.addEventListener('click', (e) => {
      /* OBTENEMOS LOS VALORES DE LOS DATA ATRIBUTTES DE LA PIZZA CLICKEADA */
      const pizzaId = e.currentTarget.dataset.pizzaId;
      const pizzaName = e.currentTarget.dataset.pizzaName;
      const pizzaPrice = e.currentTarget.dataset.pizzaPrice;
      const pizzaImage = e.currentTarget.dataset.pizzaImage;
      
      /* CREAMOS EL OBJETO DEL ITEM CLICKEADO */
      const item = {
        id: pizzaId,
        imagen: pizzaImage,
        nombre: pizzaName,
        precio: pizzaPrice,
      };

      itemsCart.push(item);

      /* GUARDAMOS LOS DATOS EN LA VARIABLE DE STORAGE COMO STRING */
      localStorage.setItem('itemsCart', JSON.stringify(itemsCart));

      alert('Agregado al carrito exitosamente');
    });
  });
}

function changeActiveLink() {
  const links = document.querySelectorAll('.link-nav');

  /* RECORREMOS TODOS LOS LINKS Y ESCUCHAMOS UN CLICK */
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      /* RECORREMOS TODOS LOS LINKS Y QUITAMOS LA CLASE ACTIVE */
      links.forEach((link) => {
        link.classList.remove('active');
      });

      /* AGREGAMOS LA CLASE ACTIVE AL LINK CLICKEADO */
      e.currentTarget.classList.add('active');
    });
  });
}

function removeSkeletons() {
  const skeletonCard = document.querySelectorAll('.skeleton-card');
  
  skeletonCard.forEach((skeleton) => {
    skeleton.remove();
  });
}

createCards('.container-pizzas-news', pizzasNews);
createCards('.container-pizzas-recommended', pizzasRecommended);
createCards('.container-pizzas-more-sales', pizzasMoreSales);
addToCart();
modal();
changeActiveLink();