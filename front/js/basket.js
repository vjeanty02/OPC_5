/** Class representing the basket. */
export class Basket {
    /**
     * Create a basket.
     */
    constructor() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            this.basket = [];
        } else {
            this.basket = JSON.parse(basket);
        }
    }
    /**
     * Save the basket to local storage.
     */
    save() {
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }
    /**
     * Add a quantity of product in the basket
     * @param {object} The product value.
     * @param {number} The quantity value.
     */
    add(product, quantity) {
        if (!(quantity > 0 && quantity <= 100)) {
            quantity = 0;
        }
        let foundProduct = this.basket.find(p => p.id == product.id && p.color == product.color);
        if (foundProduct != undefined) {
            foundProduct.quantity += quantity;
            
        } else {
            product.quantity = quantity;
            this.basket.push(product);
        }
        this.save()
    }
    /**
     * Remove a product in the basket
     * @param {object} The product value.
     */
    remove(product) {
        this.basket = this.basket.filter(p => p.id != product.id || (p.id == product.id && p.color != product.color ));
        this.save();
    }
    /**
     * Change the quantity of product in the basket
     * @param {object} The product value.
     * @param {number} The quantity value.
     */
    changeQuantity(product, quantity) {
        if (!(quantity > 0 && quantity <= 100)) {
            quantity = 0;
        }
        let foundProduct = this.basket.find(p => p.id == product.id && p.color == product.color);
        if (foundProduct != undefined) {
            foundProduct.quantity = quantity;
            if (foundProduct.quantity <= 0) {
                this.remove(foundProduct);
            } else {
                this.save();
            }
        }
        
    }
    /**
     * Get the number(by Quantity) of product.
     * @return {number} The number value.
     */
    getTotalProduct() {
        let number = 0;
        for (let product of this.basket) {
            number += product.quantity;
        }
        return number;
    }
    /**
     * Get the price of products.
     * @return {number} The total value.
     */
    getTotalPrice() {
        let total = 0;
        for (let product of this.basket) {
            total += product.quantity * product.price;
        }
        return total;
    }
    /**
     * Get the number(by Id) of product.
     * @return {number} The number value.
     */
    getNumberProduct() {
        let number = this.basket.length
        return number;
    }
    /**
     * Get all products
     * @return {Array} The products value.
     */
    getProducts() {
        let products = this.basket.filter(p => p == p)
        return products ;   
    }
    
}

