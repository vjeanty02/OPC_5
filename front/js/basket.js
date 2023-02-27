export class Basket {
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
        this.basket = this.basket.filter(p => p.id != product.id && p.color != product.color );
        this.save();
    }
    changeQuantity(product, quantity) {
        let foundProduct = this.basket.find(p => p.id == product.id && p.color == product.color);
        if (foundProduct.quantity <= 0) {
            this.remove(foundProduct);
        } else {
            this.save();
        }
    }
    getTotalProduct() {
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
    getNumberProduct() {
        return this.basket.length;
    }
    getProducts() {
        return this.basket.filter(p => p == p);   
    }
}
