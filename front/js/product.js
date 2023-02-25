import { Basket } from './basket.js';
import { getProductfromJson } from './json.js';

//Get product id to display
function getId(url) {
    return new URL(url).searchParams.get("id");
}
const products = getProductfromJson(getId(location.href));

function getProduct() {
    let x = document.querySelector("#colors").selectedIndex;
    let color = document.getElementsByTagName("option")[x].value;
    let quantity = document.querySelector("#quantity").value;
    let id = new URL(location.href).searchParams.get("id");
    return { id: id, color: color, quantity: quantity };
}
function onClick() {
    new Basket().add({ id: getProduct().id, "color": getProduct().color }, parseInt(getProduct().quantity));
}
function addProductOnClick(){
    document.getElementById("addToCart").addEventListener("click", onClick);
}

// Add a product to product.html
document.querySelector("#item__img img").src = products.imageUrl;
document.querySelector("#title").innerText = products.name;
document.querySelector("#price").innerText = products.price;
document.querySelector("#description").innerText = products.description;
for (let i = 0; i < products.colors.length; i++) {
    const element = products.colors[i];
    document.querySelector("#colors").innerHTML += `<option value="${element}">${element}</option>`;
}
addProductOnClick();
