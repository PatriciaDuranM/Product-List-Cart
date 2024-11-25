const filterElement = document.getElementById("filter-tab");

const productsElement = document.getElementById("products");

let cartContent = [];

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

/*cambio de boton*/
const changeButton = {};

/*añadir productos*/
const productClick = (event) => {
  /*detecta el tipo de botón*/
  const type = event.target.dataset.type;
  if (!type) return;

  if (type === "add") {
    /*muestre el botón de quantity*/
    const showQuantity = event.target.nextElementSibling;
    showQuantity.classList.remove("hide");
    /*agrege el borde seleccionado a la imagen*/
    /*tengo que cambiar el estilo de la caja de la imagen?*/
    const selectedImg = event.target.previousElementSibling.children;
    selectedImg.classList.add("selected");
  }

  const product = event.target.dataset.name;
  const price = event.target.dataset.price;

  cartContent.push({ name: product, price: price, quantity: 1 });
  console.log(cartContent);
};

productsElement.addEventListener("click", productClick);
