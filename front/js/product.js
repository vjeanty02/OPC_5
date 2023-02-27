import { Basket } from './basket.js';

//Get product id to display
function getId(url) {
    return new URL(url).searchParams.get("id");
}
const reponse = await fetch(`http://localhost:3000/api/products/${getId(location.href)}`);
const products = await reponse.json();

function getProduct() {
    let x = document.querySelector("#colors").selectedIndex;
    return { 
        id: new URL(location.href).searchParams.get("id"), 
        color: document.getElementsByTagName("option")[x].value, 
        quantity: document.querySelector("#quantity").value, 
        name: document.querySelector("#title").innerText, 
        description: document.querySelector("#description").innerText, 
        price: document.querySelector("#price").innerText, 
        url: document.querySelector("#item__img img").src
    };
}
function onClick() {
    new Basket().add({ 
        id: getProduct().id, 
        "color": getProduct().color, 
        "name": getProduct().name, 
        "description": getProduct().description, 
        "price": getProduct().price, 
        "url": getProduct().url 
    }, parseInt(getProduct().quantity));
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
