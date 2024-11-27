const filterElement = document.getElementById("filter-tab");

const productsElement = document.getElementById("products");
const quantityButtonElement = document.getElementById("quantity");

const cartEmptyElement = document.getElementById("cart-empty");
const cartFullElement = document.getElementById("cart-full");
const totalpriceElement = document.getElementById("totalprice");

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

/*printcart*/

/*<div class="cart-items-box">
            <div class="item">
              <div class="item-info">
                <h3 class="title title-cart">Product Name</h3>
                <div class="cuantity-box-cart">
                  <span class="title cuantity-cart">1x</span>
                  <span class="tag-text">@ $5.50</span>
                  <span class="tag-text tag-text-bold"> $5.50</span>
                </div>
              </div>
              <div class="icon-remove-box">
                <img
                  class="icon-remove"
                  src="assets/images/icon-remove-item.svg"
                  alt="Remove item"
                />
              </div>
            </div>
          </div>
          */

/*total suma*/

const orderTotal = () => {
  const total = cartContent.reduce((acc, product) => product.quantity + acc, 0);
  console.log(total);
  totalpriceElement.textContent = total;
};

const printCart = () => {
  const fragment = document.createDocumentFragment();
  cartContent.forEach((product) => {
    /*cart-item-box*/
    const itemBox = document.createElement("div");
    itemBox.classList.add("cart-items-box");

    /*cart-item*/
    const item = document.createElement("div");
    item.classList.add("item");
    item.append(itemBox);

    /*item-info*/
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");
    itemInfo.append(item);

    /*title-cart*/
    const productName = document.createElement("h3");
    productName.classList.add("title", "title-cart");
    productName.append(itemInfo);

    /*quantity-box*/
    const quantityBoxCart = document.createElement("div");
    quantityBoxCart.classList.add("cuantity-box-cart");
    quantityBoxCart.append(itemInfo);

    /*quantity*/
    const quantity = document.createElement("span");
    quantity.textContent = `${product.quantity}x`;
    quantity.classList.add("title", "cuantity-cart");
    quantity.append(quantityBoxCart);

    /*price*/
    const price = document.createElement("span");
    price.textContent = `@ $${product.price}`;
    price.classList.add("tag-text");
    price.append(quantityBoxCart);

    /*pricebold*/
    const priceBold = document.createElement("span");
    priceBold.textContent = `@ $${product.price}`;
    priceBold.classList.add("tag-text", "tag-text-bold");
    priceBold.append(quantityBoxCart);

    /*iconremove*/
    const iconRemoveBox = document.createElement("div");
    iconRemoveBox.classList.add("icon-remove-box");
    iconRemoveBox.append(item);

    /*imagen*/
    const iconRemove = document.createElement("img");
    iconRemove.classList.add("icon-remove");
    iconRemove.src = "assets/images/icon-remove-item.svg";
    alt = "Remove item";
    iconRemove.append(iconRemoveBox);

    itemBox.append(fragment);
  });

  cartFullElement.append(fragment);
  orderTotal();
};

const addToCart = (product, price) => {
  cartContent.push({ name: product, price: price, quantity: 1 });
  console.log(cartContent);
  printCart();
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

const buttonNumber = (quantity, element) => {
  element.textContent = quantity;
};

/*sumar uno a quantity*/
const addOne = (name, element) => {
  const producSelected = cartContent.find((product) => (product.name = name));
  producSelected.quantity++;
  console.log(cartContent);
  buttonNumber(producSelected.quantity, element.previousElementSibling);
  printCart();
};

/*reducir uno quantity*/
const removeOne = (name, element) => {
  console.log(name);
  const product = cartContent.find((product) => {
    return product.name === name;
  });

  if (product.quantity > 1) {
    product.quantity--;
    printCart();
    buttonNumber(product.quantity, element.nextElementSibling);
  } else if (product.quantity === 1) {
    /*eliminar el producto del array*/
    const filter = cartContent.filter((product) => product.name !== name);
    cartContent = filter;

    /*poner el botón de nuevo*/
    hideButtonQuantity(element);
  }

  console.log(cartContent);

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
    const productName = event.target.parentElement.dataset.name;
    /*llamar a la función que añade producto diciendo que vaya al producto correcto*/
    addOne(productName, event.target);
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
