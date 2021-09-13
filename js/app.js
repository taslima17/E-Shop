
/*................load data ...........*/

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

/*..................... show all product in UI ............ */

const showProducts = (products) => {

  const allProducts = products.map((pd) => pd);

  for (const product of allProducts) {
    const image = product.image;

    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `<div class="card h-100 bg-secondary text-white">
    <img src=${image} class="card-img-top product-image" alt="...">
    <div class="card-body">
    <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Average Rating: ${product.rating.rate} <br> Total Rating: ${product.rating.count}</p>

      <h2>Price: $ ${product.price}</h2>
             
    </div>
     <div class="card-footer d-flex justify-content-between">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-light">add to cart</button> 
      <button type="button" class="btn btn-light " data-toggle="modal"  onclick="show(${product.id})">
  Details
</button>
    </div>
  </div>`;

    document.getElementById("all-products").appendChild(div);
  }
};

/*.......... update Cart Information........ */
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

/* ....function:getting value from id... */
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

/* ..........main price update function........ */
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = parseFloat(convertedOldPrice + convertPrice).toFixed(2);
  document.getElementById(id).innerText = (total);
};

/* ............set innerText function............... */
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

/*...... update delivery charge and total Tax.......... */
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

/* ...........grandTotal update function........... */
const updateTotal = () => {
  const grandTotal = parseFloat(getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax")).toFixed(2)
    ;
  document.getElementById("total").innerText = grandTotal;
};

/* ..........show details in the top........................ */
const show = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayData(data)
    );

}
const displayData = data => {
  document.getElementById('Details-info').innerHTML = `<div class="row g-0">
  <div class="col-md-4">
    <img src=${data.image} class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h2 class="card-title">${data.title}</h2>
      <p class="card-text">${data.description}</p>
      <h4 class="text-warning">Price: $ ${data.price}</h4>        
      </div> 
        <button onclick="addToCart(${data.id},${data.price})" id="addToCart-btn" class="buy-now btn btn-danger w-50 m-2">add to cart</button>        
    </div>
  </div>
</div>`;
  ;
}
