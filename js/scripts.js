const filterElement = document.getElementById("filter-tab");

const productsElement = document.getElementById("products");
const quantityButtonElement = document.getElementById("quantity");

const cartEmptyElement = document.getElementById("cart-empty");
const cartFullElement = document.getElementById("cart-full");

/*filtro chips*/

const changeFilter = (event) => {
  const filter = event.target.dataset.filter;

  if (!filter) return;

  for (const filter of filterElement.children) {
    filter.classList.remove("chip-active");
  }

  event.target.classList.add("chip-active");
};

filterElement.addEventListener("click", changeFilter);

/*añadir productos al carrito*/

let cartContent = [];

const addToCart = (product, price) => {
  cartContent.push({ name: product, price: price, quantity: 1 });
  console.log(cartContent);
};

/*cambio de boton*/

const showButtonQuantity = (element, product, price) => {
  /*muestre el botón de quantity*/
  const showQuantity = element.nextElementSibling;
  showQuantity.classList.remove("hide");
  /*agrege el borde seleccionado a la imagen*/
  const selectedImg = element.previousElementSibling.children[3];
  selectedImg.classList.add("selected");
  /*por ultimo añadimos el producto al array*/
  addToCart(product, price);
};

const hideButtonQuantity = (element) => {
  /*muestre el botón de quantity*/
  console.log(element);
  const showQuantity = element.parentElement;
  showQuantity.classList.add("hide");
  /*agrege el borde seleccionado a la imagen*/
  const selectedImg =
    element.parentElement.previousElementSibling.previousElementSibling
      .children[3];
  selectedImg.classList.remove("selected");
  /*por ultimo añadimos el producto al array*/
};
/*Actualizar el número en la interfaz del producto correspondiente.*/

const buttonNumber = (name, element) => {
  const product = (quantityButtonElement.textContent = cartContent.quantity);
};

/*sumar uno a quantity*/
const addOne = (name) => {
  cartContent = cartContent.map((product) => {
    if (product.name === name) {
      product.quantity++;
    }

    return product;
  });
  console.log(cartContent);
  buttonNumber();
};

/*reducir uno quantity*/
const removeOne = (name, element) => {
  console.log(name);
  const product = cartContent.find((product) => {
    return product.name === name;
  });

  if (product.quantity > 1) {
    product.quantity--;
  } else if (product.quantity === 1) {
    /*eliminar el producto del array*/
    const filter = cartContent.filter((product) => product.name !== name);
    cartContent = filter;

    /*poner el botón de nuevo*/
    hideButtonQuantity(element);
  }

  console.log(cartContent);
  buttonNumber();
  emptyCart();
};

/*Enseñar la carta vacia o llena*/

const emptyCart = (event) => {
  if (cartContent.length === 0) {
    cartFullElement.classList.add("hide");
    cartEmptyElement.classList.remove("hide");
  } else {
    cartFullElement.classList.remove("hide");
    cartEmptyElement.classList.add("hide");
  }
};

/*añadir productos*/
const productClick = (event) => {
  /*1.detecta el tipo de botón*/
  const type = event.target.dataset.type;
  if (!type) return;

  if (type === "add") {
    /*localizamos el producto y el precio*/
    const product = event.target.dataset.name;
    const price = event.target.dataset.price;

    showButtonQuantity(event.target, product, price);
  }

  if (type === "increase") {
    /*detectar boton de sumar*/
    const product = event.target.parentElement.dataset.name;
    /*llamar a la función que añade producto diciendo que vaya al producto correcto*/
    addOne(product);
    console.log(event.target.parentElement);

    /*interfaz*/
  } else if (type === "decrease") {
    /*detectar boton de sumar*/
    const product = event.target.parentElement.dataset.name;
    removeOne(product, event.target);
  }

  emptyCart();
};

/*
- Si al quitar cantidad de productos llegamos a 0, en ese caso tendremos que eliminar el producto del carrito y hacer los cambios necesarios en la interfaz.

- Después de tener el array funcionando correctamente, podremos pintar el carrito en la interfaz de la página*/

productsElement.addEventListener("click", productClick);
