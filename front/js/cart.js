import { Basket } from './basket.js';

function hideSelectors(...selector) {
    for (const arg of selector) {
        document.querySelector(arg).style.display = 'none';
    }
  }
function showSelector(selector1, selector2, selector3, selector4){
    document.querySelector(selector2).style.display = '';
    for (let i = 0; i < new Basket().getNumberProduct(); i++) {
        let product = new Basket().getProducts()[i];
        document.querySelector(selector1).innerHTML += `
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
        document.querySelector(selector3).innerHTML = new Basket().getTotalProduct();
        document.querySelector(selector4).innerHTML = new Basket().getTotalPrice();
    }
}

    if (new Basket().getNumberProduct() == 0) {
        hideSelectors("#cart__items",".cart__order");
    } else {
        showSelector("#cart__items",".cart__order",'#totalQuantity','#totalPrice');
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
            location.reload();
        })
    }
   
}

// Validation formulaire
let form = document.querySelector(".cart__order__form");

// REGEX
var adressRegExp = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
var nameRegExp = new RegExp("^[A-zÀ-ú \-]+$");
var emailRegExp = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

var firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
form.firstName.addEventListener('change', function(e) {
    var value = e.target.value;
    if (nameRegExp.test(value)){
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre prénom.';
    }
});

let lastNameErrorMsg = form.lastName.nextElementSibling;
form.lastName.addEventListener('change', function(e) {
    var value = e.target.value;
    if (nameRegExp.test(value)){
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre nom.';
    }
});

var adressErrorMsg = document.querySelector('#addressErrorMsg');
form.address.addEventListener('change', function(e) {
    var value = e.target.value;
    if (adressRegExp.test(value)){
        adressErrorMsg.innerHTML = '';
    } else {
        adressErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre adresse postale.';
    }
});

var cityErrorMsg = document.querySelector('#cityErrorMsg');
form.city.addEventListener('change', function(e) {
    var value = e.target.value;
    if (nameRegExp.test(value)){
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre ville.';
    }
});

var emailErrorMsg = document.querySelector('#emailErrorMsg');
form.email.addEventListener('change', function(e) {
    var value = e.target.value;
    if (emailRegExp.test(value)){
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre adresse email.';
    }
});

removeProductOnClick();
changeProductOnClick();
