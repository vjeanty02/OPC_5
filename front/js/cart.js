import { Basket } from './basket.js';

// Get products from JSON file
const response = await fetch('http://localhost:3000/api/products');
const product = await response.json()

let basket = new Basket();
function hideSelector(selector1, selector2,selector3){
    document.querySelector(selector1).innerHtml = "";
    document.querySelector(selector2).style.display = 'none';
    document.querySelector('#totalQuantity').innerHTML = "0";
}
function showSelector(selector1, selector2, selector3){
    document.querySelector(selector2).style.display = '';
    for (let i = 0; i < basket.getNumberProduct(); i++) {
        
        document.querySelector(selector1).innerHTML += `
        <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="../images/logo.png" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Couleur : ${basket.getProducts()[i].color}</p>
            <p>Prix : 42,00 €</p>
            <p>Description : </p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket.getProducts()[i].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
        </article>`;
        document.querySelector(selector3).innerHTML = basket.getTotalProduct();
    }
}
if (basket.getNumberProduct() == 0) {
    hideSelector("#cart__items",".cart__order",'#totalQuantity');
} else {
    showSelector("#cart__items",".cart__order",'#totalQuantity');
}

