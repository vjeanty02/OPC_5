import { Basket } from './basket.js';
import { getProductfromJsonById } from './json.js';

// Get products from JSON file
const id = getId(location.href);
const products = getProductfromJsonById(id);

console.log()
// Add product(descriptions) to product.html
document.querySelector("#item__img img").src = products.imageUrl;
document.querySelector("#title").innerText = products.name;
document.querySelector("#price").innerText = products.price;
document.querySelector("#description").innerText = products.description;
for (let i = 0; i < products.colors.length; i++) {
    const color = products.colors[i];
    document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`;
}
addProductTocartOnClick();



/*=============================================
=            Functions            =
=============================================*/

/**
 * Get product id to display
 * @param {url} The url value.
 * @returns {string}
 */
function getId(url) {
    return new URL(url).searchParams.get("id");
}
/**
 * add product to cart (on click)
 */
function addProductTocartOnClick(){
    let quantity;
    document.getElementById("addToCart").addEventListener("click", function(e) {
        try {
            quantity = parseInt(getProductFromUser().quantity);
            new Basket().add({ 
            id: getProductFromUser().id, 
            "color": getProductFromUser().color
        }, quantity);     
        } catch (error) {
            alert(error.message);
        }   
    });
}
/**
 * Get product value
 * @returns {object} The product value
 */
function getProductFromUser() {
    let x = document.querySelector("#colors").selectedIndex;
    let product ={ 
        id: new URL(location.href).searchParams.get("id"), 
        color: document.getElementsByTagName("option")[x].value, 
        quantity: document.querySelector("#quantity").value 
    };
    return product
} 
