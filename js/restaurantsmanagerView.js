class RestaurantsManagerView {
  constructor() {
    this.initzone = document.getElementById("init_zone");
    this.centralzone = document.getElementById("central_zone");
    this.menu = document.querySelector(".navbar");
    this.nav = document.getElementById("navbarScroll");
    this.breadcrumb = document.querySelector(".breadcrumb");
    this.form = document.querySelector(".form__section");
    this.us = document.querySelector(".ussection");
  }

  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      handler();
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      handler();
    });
  }

  // Función que permite visualizar platos en la zona inicial del HTML
  showRandomDishes(dishes) {
    if (this.initzone.children.length > 0) {
      this.initzone.children[0].remove();
    }
    // Creamos un nuevo div y le asignamos un id y las clases pertinentes
    const container = document.createElement("div");
    container.id = "random-list";
    container.classList.add("row", "mx-auto", "text-center");
    // Dentro del div ponemos una cabecera
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green bg__black my-3 lang" key="dish-title">Nuestros platos</h1>`
    );
    // Recorremos el array con los platos y le damos el formato necesario
    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-4 col-lg-4 col-md-4 col-xl-4 my-1">
          <a
            class="text--green"
            data-name="${dish.dish.name}"
            href="#single-dish">
            <div>
              <img
                alt="${dish.dish.title}"
                src="${dish.dish.image}"
                class="img-fluid rounded mb-4">
            </div>
            <div>
              <h3 class="lang" key="${dish.dish.name}">${dish.dish.name}</h3>
              <div class="lang" key="description-${dish.dish.name}">${dish.dish.description}</div>
            </div>
          </a>
        </div>`
      );
    }
    // Insertamos el contenedor con el formato de platos en el html
    this.initzone.append(container);
  }

  // Manejador que se da cuando se realiza click en la zona con los platos aleatorios
  bindDishesRandomList(handler) {
    // Obtiene el elemento y aquellos que dentro se compongan con el tag <a>
    const randomList = document.getElementById("random-list");
    const links = randomList.querySelectorAll("a");
    // Los recorre y recupera el nombre del plato con el atributo personalizado dataset.name
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  // Permite unir con el controlador el plato (de aquellos que formen parte de una lista, nunca de los platos iniciales aleatorios), añadiendo un manejador de eventos para cada plato
  bindShowDish(handler) {
    // Obtiene el elemento y los links
    const dishList = document.getElementById("dish-list");
    const links = dishList.querySelectorAll("a.text--green");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
    // También recoge las imágenes
    const images = dishList.querySelectorAll("figcaption a");
    for (const image of images) {
      image.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  // Función que permite imprimir en el HTML las categorías
  showCategories(categories) {
    if (this.centralzone.children.length > 0) {
      this.centralzone.children[0].remove();
    }
    // Crea un elemento div, se le asigna un id y las clases necesarias
    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("row", "mx-auto", "text-center");
    // Se inserta una cabecera dentro del div creado
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green bg__black mt-5 lang" key="category-title">Nuestras categorías</h1>`
    );
    // Recorremos las categorías y le damos un formato visible para el HTML
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-12 col-sm-12  col-md-12 col-lg-4 col-xl-4 bg__black my-3">
          <a class="text--green" data-category="${category.category.name}" href="#dish-list">
            <div class="border--green rounded p-3">
              <h3 class="lang" key="${category.category.name}">${category.category.name}</h3>
              <div class="lang" key="${category.category.description}">${category.category.description}</div>
            </div>
          </a>
        </div>`
      );
    }
    // Inserta en el HTML el contenedor que hemos creado
    this.centralzone.append(container);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con las categorías
  showCategoriesInMenu(categories) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu", "mx-auto");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class="nav-link dropdown-toggle lang"
        key="categorias"
        href="#"
        id="navCats"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Categorías
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos las categorías y se insertarán dentro del desplegable
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-category="${category.category.name}"
            class="dropdown-item lang" key="${category.category.name}"
            href="#dish-list"
          >
            ${category.category.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.nav.append(div);
  }

  // Manejador que se da cuando se realiza click en la zona central de categorías
  bindDishesCategoryList(handler) {
    // Obtiene el elemento y aquellos que dentro se compongan con el tag <a>
    const categoryList = document.getElementById("dish-list");
    const links = categoryList.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado dataset.category
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  // Manejador que se da cuando se realiza click en la zona de navegación de categorías
  bindDishesCategoryListInMenu(handler) {
    // Obtiene el elemento de navCats y recoge el siguiente hermano con el tag <a>
    const navCats = document.getElementById("navCats");
    const links = navCats.nextSibling.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado dataset.category
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los alérgenos
  showAllergensInMenu(allergens) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu", "mx-auto");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class="nav-link dropdown-toggle lang" key="alergenos"
        href="#"
        id="navAllergens"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Alérgenos
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los alérgenos y se insertarán dentro del desplegable
    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-allergen="${allergen.allergen.name}"
            class="dropdown-item lang" key="${allergen.allergen.name}"
            href="#dish-list"
          >
            ${allergen.allergen.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.nav.append(div);
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de alérgenos
  bindDishesAllergenListInMenu(handler) {
    // Obtiene el elemento de navAllergens y recoge los tag <a>
    const navAllergens = document.getElementById("navAllergens");
    const links = navAllergens.nextSibling.querySelectorAll("a");
    // Los recorre y añade el manejador para aquellos que tienen el atributo allergen
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.allergen);
      });
    }
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los menús registrados
  showMenusInNav(menus) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu", "mx-auto");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class="nav-link dropdown-toggle lang" key="menus"
        href="#"
        id="navMenus"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Menús
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los menús y se insertarán dentro del desplegable
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-menu="${menu.menu.name}"
            class="dropdown-item"
            href="#dish-list"
          >
            ${menu.menu.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.nav.append(div);
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de menús
  bindMenuListInNav(handler) {
    // Obtiene el elemento de navMenus y recoge los tag <a>
    const navMenus = document.getElementById("navMenus");
    const links = navMenus.nextSibling.querySelectorAll("a");
    // Los recorre y añade el manejador para aquellos que tienen el atributo menú
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.menu);
      });
    }
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los restaurantes registrados
  showRestaurantsInMenu(restaurants) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu", "mx-auto");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class="nav-link dropdown-toggle lang" key="restaurantes"
        href="#"
        id="navRests"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Restaurantes
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los restaurantes y se insertarán dentro del desplegable
    for (const rest of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-rest="${rest.restaurant.name}"
            class="dropdown-item"
            href="#restaurant"
          >
            ${rest.restaurant.name}
          </a>`
      );
    }

    div.append(container);
    // Inserta el menú de navegación creado
    this.nav.append(div);
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de restaurantes
  bindRestaurantListInMenu(handler) {
    // Obtiene el elemento de navRests y recoge los tag <a>
    const navRests = document.getElementById("navRests");
    const links = navRests.nextSibling.querySelectorAll("a");
    // Los recorre y añade un manejador de eventos para aquellos con el atributo rest
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.rest);
      });
    }
  }

  // Función que permite mostrar una tarjeta personalizada con la información de cada restaurante
  showRestaurant(res, page) {
    this.centralzone.replaceChildren();
    this.centralzone.classList.remove("d-none");

    if (this.form) this.form.replaceChildren();
    if (this.us) this.us.replaceChildren();

    // Crea el contenedor y le añade las clases
    const container = document.createElement("div");
    container.classList.add("container", "my-5");
    // Si se obtiene el plato correctamente, se le otorga un id y se da formato en HTML
    if (res) {
      container.id = "restaurant";
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row">
          <div class="col-12">
            <div class="card bg__grey border--green">
              <div class="row align-items-center">
                <div class="col-xl-12 text-center">
                  <div class="p-4">
                    <div class="mb-5">
                      <h2 class="text-uppercase text--green fw-bold fst-italic">${res.name}</h2>
                    </div>
                    <div class="mb-5">
                      <h5 class="text-uppercase text--green fw-bold">Ubicación ${res.name}</h5>
                      <p class="text--green">${res.location}</p>
                    </div>
                    <div class="mb-1">
                      <h6 class="text-uppercase text--green fw-bold">Descripción</h6>
                      <p class="text--green">${res.description}</p>
                    </div>
                    <div class="cart mt-3 align-items-center">
                      <button
                        data-name="${res.name}"
                        class="newfood__content__button button--animated text-uppercase mr-2 px-4"
                      > <a href="form.html" class="text-dark">
                        Reservar </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
      // Le da una cabecera justo al principio
      container.insertAdjacentHTML(
        "afterbegin",
        `<h1 class="text--green my-3">Ficha de restaurante</h1>`
      );
      this.centralzone.append(container);
    }
  }

  // Función que permite listar los platos
  listDishes(dishes, title, page) {
    // Borra la zona central
    this.centralzone.replaceChildren();
    this.centralzone.classList.remove("d-none");

    if (this.form) this.form.replaceChildren();
    if (this.us) this.us.replaceChildren();
    // Crea un elemento, le asigna el id y las clases pertinentes
    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("container", "my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    // Recorremos el array de platos
    for (const dish of dishes) {
      // Se crea un nuevo div, le damos formato con los platos
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card bg__black">
            <a data-name="${dish.dish.name}" href="#single-dish" class="text--green text-center"">
              <img class="img-fluid" src="${dish.dish.image}">
              <figcaption class="my-3 lang" key="${dish.dish.name}">${dish.dish.name}</figcaption>
            </a>
        </figure>`
      );
      // Insertamos el div creado
      container.children[0].append(div);
    }
    // Le da una cabecera justo al principio indicando el nombre de la categoría, alérgeno, menú...
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="text--green my-3 lang" key="${title}">${title}</h1>`
    );
    this.centralzone.append(container);
  }

  // Función que permite mostrar una tarjeta personalizada con la información de cada plato
  showDish(dish, message) {
    this.centralzone.replaceChildren();

    // Crea el contenedor y le añade las clases
    const container = document.createElement("div");
    container.classList.add("container", "my-5");
    // Si se obtiene el plato correctamente, se le otorga un id y se da formato en HTML
    if (dish) {
      container.id = "single-dish";
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row">
          <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 mx-auto">
            <div class="card bg__grey border--green">
              <div class="row align-items-center">
                <div class="col-xl-6">
                  <div class="text-center p-4">
                    <img class="img-fluid rounded" src="${dish.image}" />
                  </div>
                </div>
                <div class="col-xl-6 text-center">
                  <div class="p-4">
                    <div class="mb-3">
                      <h2 class="text-uppercase text--green fw-bold fst-italic lang" key="${dish.name}">${dish.name}</h2>
                    </div>
                    <div class="mt-4 mb-3">
                      <h6 class="text-uppercase text--green fw-bold lang" key="Ingredientes">Ingredientes</h6>
                      <p class="text--green lang" key="ingredients-${dish.name}">${dish.stringIngredients}</p>
                    </div>
                    <div class="mt-5">
                      <h6 class="text-uppercase text--green fw-bold lang" key="Descripcion">Descripción</h6>
                      <p class="text--green lang" key="description-${dish.name}">${dish.description}</p>
                    </div>
                    <div class="cart mt-4 align-items-center">
                      <button
                        data-name="${dish.name}"
                        class="newfood__content__button button--animated text-uppercase mr-2 px-4 lang" key="btn-descubrir"
                      >
                        Descubrir ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
      // Si no se encuentra el plato, lanza un mensaje de error
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center text--green">${message}</div>`
      );
    }
    this.centralzone.append(container);
  }

  // Función que permite mostrar el modal del mapa web
  showWebMapModal() {
    let container = document.getElementById("webmapModal");

    if (container) {
      container.insertAdjacentHTML(
        "beforeend",
        ` <div class="modal-dialog modal-lg">
      <div class="modal-content text-center bg__grey">
          <div class="modal-header">
              <h1 class="modal-title fs-5 text--green" id="webmapModalLabel">Mapa web King Arthur Burger</h1>
              <button type="button" class="btn-close cross--red" data-bs-dismiss="modal"
                  aria-label="Close"></button>
          </div>
  
          <div class="modal-body">
              <img src="img/mapaweb.jpg" usemap="#kab" class="modal__image" alt="Mapa-web">
              <map name="kab" id="kab">
                  <area shape="rect" coords="1,122,93,160" alt="Inicio" href="index.html">
                  <area shape="rect" coords="110,122,203,160" alt="Nosotros" href="nosotros.html">
                  <area shape="rect" coords="221,122,311,160" alt="Reservas" href="form.html">
                  <area shape="rect" coords="331,122,423,160" alt="Categorías" href="index.html#dish-list">
                  <area shape="rect" coords="441,122,533,160" alt="Alérgenos" href="index.html">
                  <area shape="rect" coords="550,122,642,160" alt="Menús" href="index.html">
                  <area shape="rect" coords="663,122,755,159" alt="Restaurantes" href="index.html">
                  <area shape="rect" coords="333,181,422,222" data-category="Category" alt="Burger principales">
                  <area shape="rect" coords="333,247,422,284" data-category="Category" alt="Acompañamientos">
                  <area shape="rect" coords="333,309,422,347" data-category="Category" alt="Postres">
                  <area shape="rect" coords="445,183,536,218" data-category="Allergen" alt="Lactosa">
                  <area shape="rect" coords="445,245,536,282" data-category="Allergen" alt="Gluten">
                  <area shape="rect" coords="445,310,536,346" data-category="Allergen" alt="Soja">
                  <area shape="rect" coords="445,375,536,411" data-category="Allergen" alt="Frutos Secos" >
                  <area shape="rect" coords="556,184,643,221" data-category="Menu" alt="Classic Arthur Menu" >
                  <area shape="rect" coords="556,249,643,283" data-category="Menu" alt="Funny Flavours" >
                  <area shape="rect" coords="556,309,643,350" data-category="Menu" alt="New and Old" >
                  <area shape="rect" coords="667,184,754,220" data-category="Restaurant" alt="KAB Madrid" >
                  <area shape="rect" coords="667,251,754,283" data-category="Restaurant" alt="KAB Ciudad Real" >
                  <area shape="rect" coords="667,312,754,348" data-category="Restaurant" alt="KAB Parla">
              </map>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn modal__button fw-bold" data-bs-dismiss="modal">Cerrar</button>
          </div>
      </div>
  </div>`
      );
    }
  }

  // Enlazador con el controlador, recoge la categoría y su alt, para en el controlador llamar al manejador correspondiente
  bindShowWebMapModal(handler) {
    let modal = document.getElementById("webmapModal");

    if (modal) {
      modal = new bootstrap.Modal(modal);
      let map = document.getElementById("kab");
      let areas = map.querySelectorAll("area");
      for (const area of areas) {
        area.addEventListener("click", (event) => {
          handler(
            event.currentTarget.dataset.category,
            event.currentTarget.alt
          );
          modal.hide();
        });
      }
    }
  }
}

export default RestaurantsManagerView;
