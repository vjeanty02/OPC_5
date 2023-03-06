import { Basket } from './basket.js';
import { getProductfromJsonById } from './json.js';
import { productsForCartPage } from './html.js';

let price = 0; let quantity = 0; 
let products = new Basket().getProducts();
    
// Add products to cartpage (cart.html)
document.querySelector('#cart__items').innerHTML = productsForCartPage(products);

products.forEach((product,i) => {
    // Get products from JSON file
    const fullProduct = getProductfromJsonById(product.id);

    // Add product description to product (cart.html)
    document.querySelector(`.url-${i}`).src = fullProduct.imageUrl;
    document.querySelector(`.cart-${i} h2`).innerText += fullProduct.name;
    document.querySelector(`.cart-${i} .cart_price`).innerText += fullProduct.price;
    document.querySelector(`.cart-${i} .cart_description`).innerText += fullProduct.description;

    quantity += product.quantity;
    price += product.quantity * fullProduct.price;
});

hideShowItems();
displayPriceAndQuantity(price, quantity);
removeProductOnClick();
changeProductOnClick();
verifyInputById('#firstName', new RegExp("^[A-zÀ-ú \-]+$"));
verifyInputById('#lastName', new RegExp("^[A-zÀ-ú \-]+$"));
verifyInputById('#address', new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$"));
verifyInputById('#city', new RegExp("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"));
verifyInputById('#email', new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$"));
orderOnClick();

/*=============================================
=            Functions            =
=============================================*/

/**
 * Make all input empty
 * @param {[selector]} the ...selector value
 */
function makeAllInputEmpty(...selector){
    for (const arg of selector) {
        document.querySelector(selector).value = ''
    }
}
/**
 * hide selectors with display none
 * @param {[selector]} the ...selector value
 */
function hideItems(...selector) {
    for (const arg of selector) {
        document.querySelector(arg).style.display = 'none';
    }
}
/**
 * Show selectors with display block
 * @param {[selector]} the ...selector value
 */
function showItems(...selector) {
    for (const arg of selector) {
        document.querySelector(arg).style.display = '';
    }
}
/**
 * Show or hide the contents of the basket
 */
function hideShowItems() {
    if (new Basket().getProducts().length == 0) {
        hideItems('#cart__items', '.cart__order', '#totalQuantity', '#totalPrice');
    } else {
        showItems('#cart__items', '.cart__order', '#totalQuantity', '#totalPrice');
    }
}
/**
 * Add price and quantity to #totalQuantity and #totalPrice
 */
function displayPriceAndQuantity(price, quantity) {

    document.querySelector('#totalQuantity').innerHTML = quantity;
    document.querySelector('#totalPrice').innerHTML = price;
}
/**
 * Remove product in the basket (on click)
 */
function removeProductOnClick() {
    let products = document.querySelectorAll('.deleteItem');
    products.forEach(product => {
        product.addEventListener('click', function (e) {
            new Basket().remove({
                id: e.target.closest('article').getAttribute("data-id"),
                color: e.target.closest('article').getAttribute("data-color")
            });
            location.reload();
        }) 
    });
}
/**
 * Change product in the basket (on click)
 */
function changeProductOnClick() {
    let products = document.querySelectorAll('.itemQuantity');
    products.forEach(product => {
        product.addEventListener('change', function (e) {
            new Basket().changeQuantity({
                id: e.target.closest('article').getAttribute("data-id"),
                color: e.target.closest('article').getAttribute("data-color")
            }, parseInt(e.target.value));
            location.reload();
        })
    });
}
/**
 * Verify user input with regex and show a error message 
 * @param {selector} the formSelec value
 * @param {RegExp} the regExp value
 */
function verifyInputById(formSelec, regExp){
    makeAllInputEmpty(formSelec);
    let errorMsg = document.querySelector(formSelec+'ErrorMsg');
    document.querySelector(formSelec).addEventListener('change', function(e) {
        let value = e.target.value;
        errorMsg.innerHTML = regExp.test(value)? '':'Veuillez vérifier ce que vous avez entré.';
    });
}
/**
 * Make a command object (contact object, product array)
 * @returns {object} the body value
 */
function makeRequestBody()
{
    let form = document.querySelector(".cart__order__form");
    const body = {
        contact: {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            address: form.address.value,
            city: form.city.value,
            email: form.email.value,
        },
        products: ids(),
    };
    return body;
}
/**
 * Returns an array of all item IDs in the cart
 * @returns {array}
 */
function ids() {
    let products = new Basket().getProducts()
    let ids = []
    products.forEach((product,i) => {
        ids[i] = product.id;
    }); 
    return ids;
}
/**
 * Submit the order if the fields have the correct values
 */
function orderOnClick(){
    document.querySelector('#order').addEventListener('click', function (e) {
        if (isInputCorrect()) {
            e.preventDefault();
            const body = makeRequestBody();
            fetch('http://localhost:3000/api/products/order', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then((data) => {
                    const orderId = data.orderId;
                    window.location.href = 'confirmation.html?orderId=' + orderId;
                })
                .catch((err) => {
                    console.error(err);
                    alert('erreur: ' + err);
                });
        } else {
            alert('Vous devez remplir correctement le formulaire avant de pouvoir commander'); 
        }
    })
}
/**
 * Verify user input before ordering 
 * @returns {boolean} The isInputCorrect value
 */
function isInputCorrect()
{   
    let isInputCorrect = (document.querySelector('#firstNameErrorMsg').innerText == ''
    && document.querySelector('#lastNameErrorMsg').innerText == ''
    && document.querySelector('#emailErrorMsg').innerText == ''
    && document.querySelector('#addressErrorMsg').innerText == ''
    && document.querySelector('#cityErrorMsg').innerText == '')

    && document.querySelector('#firstName').value != ''
    && document.querySelector('#lastName').value != ''
    && document.querySelector('#email').value != ''
    && document.querySelector('#address').value != ''
    && document.querySelector('#city').value != '';

    return isInputCorrect;
}