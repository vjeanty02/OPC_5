class Basket {
    constructor() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            this.basket = [];
        } else {
            this.basket = JSON.parse(basket);
        }
    }
    save() {
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }
    add(product, quantity) {
        let foundProduct = this.basket.find(p => p.id == product.id && p.color == product.color);
        if (foundProduct != undefined) {
            foundProduct.quantity += quantity;
        } else {
            product.quantity = quantity;
            this.basket.push(product);
        }
        this.save()
    }
    remove(product) {
        this.basket = this.basket.filter(p => p.id != product.id);
        this.save();
    }
    changeQuantity(product, quantity) {
        let foundProduct = this.basket.find(p => p.id == product.id);
        if (foundProduct.quantity <= 0) {
            this.remove(foundProduct);
        } else {
            this.save();
        }
    }
    getNumberProduct() {
        let number = 0;
        for (let product of this.basket) {
            number += product.quantity;
        }
        return number;
    }

    getTotalPrice() {
        let total = 0;
        for (let product of this.basket) {
            total += product.quantity * product.price;
        }
        return total;
    }
}
function getProduct() {
    let x = document.querySelector("#colors").selectedIndex;
    let color = document.getElementsByTagName("option")[x].value;
    let quantity = document.querySelector("#quantity").value;
    let id = new URL(location.href).searchParams.get("id");
    return { id: id, color: color, quantity: quantity };
}
function onClick() {
    new Basket().add({ id: getProduct().id, "color": getProduct().color }, parseInt(getProduct().quantity));
}
function addToCart(){
    document.getElementById("addToCart").addEventListener("click", onClick);
}
addToCart();