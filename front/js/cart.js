
import { Basket } from './basket.js';
/**
 * hide selectors with display none
 * @param {[selector]} the ...selector value
 */
function hideSelectors(...selector) {
    for (const arg of selector) {
        document.querySelector(arg).style.display = 'none';
    }
  }
/**
 * Show selectors with display block
 * @param {[selector]} the ...selector value
 */
function showSelectors(...selector) {
    for (const arg of selector) {
        document.querySelector(arg).style.display = '';
    }
}
function hideShow(){
    if (new Basket().getNumberProduct() == 0) {
        hideSelectors("#cart__items",".cart__order",'#totalQuantity','#totalPrice');
    } else {
        showSelectors("#cart__items",".cart__order",'#totalQuantity','#totalPrice');
    }
}
/**
 * Add html card to a selector
 * @param {selector} the selector value
 */
function addCardTo(selector){
    for (let i = 0; i < new Basket().getNumberProduct(); i++) {
        let product = new Basket().getProducts()[i];
        document.querySelector(selector).innerHTML += `
        <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="${product.url}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>Couleur : ${product.color}</p>
            <p>Prix :  ${product.price} €</p>
            <p class="description">Description : ${product.description}</p>
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
    }
}
/**
 * Add price and quantity to #totalQuantity and #totalPrice
 */
function addPriceAndQuantity(){
    document.querySelector('#totalQuantity').innerHTML = new Basket().getTotalProduct();
    document.querySelector('#totalPrice').innerHTML = new Basket().getTotalPrice();
}
/**
 * Remove product in the basket (on click)
 */
function removeProductOnClick() {
    let products = document.querySelectorAll('.deleteItem');
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        product.addEventListener('click', function(e) {
            new Basket().remove({
                id:e.target.closest('article').getAttribute("data-id"), 
                color:e.target.closest('article').getAttribute("data-color")
            });
            addPriceAndQuantity();
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
        product.addEventListener('change', function(e) {
            new Basket().changeQuantity({
                id:e.target.closest('article').getAttribute("data-id"), 
                color:e.target.closest('article').getAttribute("data-color")
            },parseInt(e.target.value));
            addPriceAndQuantity();
        })
    }
   
}
/**
 * Test user input
 * @param {selector} the formSelec value
 * @param {selector} the msgErrorSelector value
 * @param {RegExp} the regExp value
 */
function testInput(formSelec, msgErrorSelector, regExp){
    let firstNameErrorMsg = document.querySelector(msgErrorSelector);
    document.querySelector(formSelec).addEventListener('change', function(e) {
        let value = e.target.value;
        if (regExp.test(value)){
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez vérifier ce que vous avez entré.';
        }
    });
}

function makeRequestBody()
{
    let form = document.querySelector(".cart__order__form");
    const body = {
        contact: {
            firstName:form.firstName.value,
            lastName:form.lastName.value,
            address:form.address.value,
            city: form.city.value,
            email: form.email.value,
        },
        products: ["8906dfda133f4c20a9d0e34f18adcf06"], 
    };
    return body;
    
}

hideShow();
addCardTo('#cart__items');
addPriceAndQuantity();
removeProductOnClick();
changeProductOnClick();
testInput('#firstName', '#firstNameErrorMsg', new RegExp("^[A-zÀ-ú \-]+$"));
testInput('#lastName', '#lastNameErrorMsg',new RegExp("^[A-zÀ-ú \-]+$"));
testInput('#address', '#addressErrorMsg', new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$"));
testInput('#city', '#cityErrorMsg', new RegExp("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"));
testInput('#email', '#emailErrorMsg', new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$"));


document.querySelector('#order').addEventListener('click', function(e) {
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
})


 

