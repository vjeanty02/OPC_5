import { Basket } from './basket.js';

let price = 0; let quantity = 0; 
document.querySelector('#firstName').value = ''
document.querySelector('#lastName').value = ''
document.querySelector('#email').value = ''
document.querySelector('#address').value = ''
document.querySelector('#city').value = '';

for (let i = 0; i < new Basket().getProducts().length; i++) {
    let product = new Basket().getProducts()[i];
    // Get products from JSON file
    const reponse = await fetch(`http://localhost:3000/api/products/${product.id}`);
    const fullProduct = await reponse.json();
    
    // Add products to cartpage (cart.html)
    document.querySelector('#cart__items').innerHTML += `
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}" data-quantity="${product.quantity}">
    <div class="cart__item__img">
    <img class="url-${i}" src="" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description cart-${i}">
        <h2></h2>
        <p>Couleur : ${product.color}</p>
        <p class="cart_price">Prix : € </p>
        <p class="cart_description">Description : </p>
    </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div>
    </article>`;

    // Add product description to product (cart.html)
    document.querySelector(`.url-${i}`).src = fullProduct.imageUrl;
    document.querySelector(`.cart-${i} h2`).innerText += fullProduct.name;
    document.querySelector(`.cart-${i} .cart_price`).innerText += fullProduct.price;
    document.querySelector(`.cart-${i} .cart_description`).innerText += fullProduct.description;

    quantity += product.quantity;
    price += product.quantity * fullProduct.price;
}

displayPriceAndQuantity(price, quantity);
hideShowItems();
removeProductOnClick();
changeProductOnClick();
verifyInputById('#firstName', '#firstNameErrorMsg', new RegExp("^[A-zÀ-ú \-]+$"));
verifyInputById('#lastName', '#lastNameErrorMsg',new RegExp("^[A-zÀ-ú \-]+$"));
verifyInputById('#address', '#addressErrorMsg', new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$"));
verifyInputById('#city', '#cityErrorMsg', new RegExp("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"));
verifyInputById('#email', '#emailErrorMsg', new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$"));

// Submit the order if the fields have the correct values
document.querySelector('#order').addEventListener('click', function (e) {
    if (isInputsCorrect()) {
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
        alert("Vous devez remplir correctement le formulaire avant de pouvoir commander"); 
    }
    
})



/*=============================================
=            Functions            =
=============================================*/

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
        hideItems("#cart__items", ".cart__order", '#totalQuantity', '#totalPrice');
    } else {
        showItems("#cart__items", ".cart__order", '#totalQuantity', '#totalPrice');
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
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        product.addEventListener('click', function (e) {
            new Basket().remove({
                id: e.target.closest('article').getAttribute("data-id"),
                color: e.target.closest('article').getAttribute("data-color")
            });
            location.reload();
        })
    }

}
/**
 * Change product in the basket (on click)
 */
function changeProductOnClick() {
    let products = document.querySelectorAll('.itemQuantity');
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        product.addEventListener('change', function (e) {
            new Basket().changeQuantity({
                id: e.target.closest('article').getAttribute("data-id"),
                color: e.target.closest('article').getAttribute("data-color")
            }, parseInt(e.target.value));
            location.reload();
        })
    }
}

/**
 * Verify user input with regex and show a error message 
 * @param {selector} the formSelec value
 * @param {selector} the msgErrorSelector value
 * @param {RegExp} the regExp value
 */
function verifyInputById(formSelec, msgErrorSelector, regExp){
    let ErrorMsg = document.querySelector(msgErrorSelector);
    document.querySelector(formSelec).addEventListener('change', function(e) {
        let value = e.target.value;
        if (regExp.test(value)){
            ErrorMsg.innerHTML = '';
        } else {
            ErrorMsg.innerHTML = 'Veuillez vérifier ce que vous avez entré.';
        }
    });
}
/**
 * Verify user input before ordering 
 * @returns {boolean} The isInputCorrect value
 */
function isInputsCorrect()
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
    let array = new Basket().getProducts()
    let ids = []
    for (let i = 0; i < array.length; i++) {
        ids[i] = array[i].id;
    }
    return ids;
}
