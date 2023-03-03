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
function getProductFromHtml() {
    let x = document.querySelector("#colors").selectedIndex;
    let product ={ 
        id: new URL(location.href).searchParams.get("id"), 
        color: document.getElementsByTagName("option")[x].value, 
        quantity: document.querySelector("#quantity").value, 
};
    return product
} 
/**
 * Add product in the basket (on click)
 */
function addProductOnClick(){
    document.getElementById("addToCart").addEventListener("click", function(e) {
        new Basket().add({ 
            id: getProductFromHtml().id, 
            "color": getProductFromHtml().color, 
            "name": getProductFromHtml().name, 
            "description": getProductFromHtml().description, 
            "price": getProductFromHtml().price, 
            "url": getProductFromHtml().url 
        }, parseInt(getProductFromHtml().quantity));
        alert(`Vous avez ajouté ${parseInt(getProductFromHtml().quantity)} produit(s) dans le panier`)
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
