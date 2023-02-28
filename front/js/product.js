import { Basket } from './basket.js';

/**
 * Get product id to display
 * @param {url} The url value.
 * @returns {string}
 */
function getId(url) {
    return new URL(url).searchParams.get("id");
}
const reponse = await fetch(`http://localhost:3000/api/products/${getId(location.href)}`);
const products = await reponse.json();

/**
 * Get product value
 * @returns {object} The product value
 */
function getProduct() {
    let x = document.querySelector("#colors").selectedIndex;
    let product ={ 
        id: new URL(location.href).searchParams.get("id"), 
        color: document.getElementsByTagName("option")[x].value, 
        quantity: document.querySelector("#quantity").value, 
        name: document.querySelector("#title").innerText, 
        description: document.querySelector("#description").innerText, 
        price: document.querySelector("#price").innerText, 
        url: document.querySelector("#item__img img").src
    };
    return product
}
/**
 * Add product in the basket (on click)
 */
function addProductOnClick(){
    document.getElementById("addToCart").addEventListener("click", function(e) {
        new Basket().add({ 
            id: getProduct().id, 
            "color": getProduct().color, 
            "name": getProduct().name, 
            "description": getProduct().description, 
            "price": getProduct().price, 
            "url": getProduct().url 
        }, parseInt(getProduct().quantity));
    });
}

// Add product(descriptions) to product.html
document.querySelector("#item__img img").src = products.imageUrl;
document.querySelector("#title").innerText = products.name;
document.querySelector("#price").innerText = products.price;
document.querySelector("#description").innerText = products.description;
for (let i = 0; i < products.colors.length; i++) {
    const element = products.colors[i];
    document.querySelector("#colors").innerHTML += `<option value="${element}">${element}</option>`;
}

addProductOnClick();
