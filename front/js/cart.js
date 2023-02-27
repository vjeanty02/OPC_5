import { Basket } from './basket.js';

let basket = new Basket();
function hideSelector(selector1, selector2,selector3, selector4){
    document.querySelector(selector1).innerHtml = "";
    document.querySelector(selector2).style.display = 'none';
    document.querySelector(selector3).innerHTML = "0";
    document.querySelector(selector4).innerHTML = "0";
}
function showSelector(selector1, selector2, selector3, selector4){
    document.querySelector(selector2).style.display = '';
    for (let i = 0; i < basket.getNumberProduct(); i++) {
        let product = basket.getProducts()[i];
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
        document.querySelector(selector3).innerHTML = basket.getTotalProduct();
        document.querySelector(selector4).innerHTML = basket.getTotalPrice();
    }
}

    if (basket.getNumberProduct() == 0) {
        hideSelector("#cart__items",".cart__order",'#totalQuantity','#totalPrice');
    } else {
        showSelector("#cart__items",".cart__order",'#totalQuantity','#totalPrice');
    }

function removeProductOnClick() {
    let products = document.querySelectorAll('.deleteItem');
    for (let j = 0; j < products.length; j++) {
        let product = products[j];
        product.addEventListener('click', function(event) {
            let productId = event.target.closest('article').getAttribute("data-id");
            let productColor = event.target.closest('article').getAttribute("data-color"); 
            alert(productId + " " + productColor);
            basket.remove({id:productId, color:productColor});
            location.reload();
        })
    }
   
}
removeProductOnClick();
