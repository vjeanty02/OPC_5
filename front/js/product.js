import { Basket } from './basket.js';
import { getProductfromJsonById } from './json.js';

// Get products from JSON file
const id = getId(location.href);
const product = getProductfromJsonById(id);

console.log()
// Add product(descriptions) to product.html
document.querySelector("#item__img img").src = product.imageUrl;
document.querySelector("#item__img img").alt = product.altTxt;
document.querySelector("#title").innerText = product.name;
document.querySelector("#price").innerText = product.price;
document.querySelector("#description").innerText = product.description;
product.colors.forEach(color => {
    document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`;
});
addProductTocartOnClick();


/*=============================================
=            Functions            =
=============================================*/
/**
 * Get product id to display
 * @param {string} url 
 * @returns {URL}
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
        alert(`Vous avez ajouté ${quantity} produit(s)`);   
        } catch (error) {
            alert(error.message);
        }   
    });
}
/**
 * Get product value
 * @returns {{id:string, color:string, quantity:num}}
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