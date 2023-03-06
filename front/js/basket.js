/** Class representing the basket. */
export class Basket {
    /**
     * Create a basket.
     */
    constructor() {
        let basket = localStorage.getItem("basket");
        this.basket = basket == null? [] : JSON.parse(basket);
    }
    /**
     * Save the basket to local storage.
     */
    save() {
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }
    /**
     * Add a quantity (1-100) of product in the basket
     * @param {{id:string, color:string}} product 
     * @param {number} quantity 
     * @throws Will throw an error if quantity is not a positive number < 100 .
     */
    add(product, quantity) {
        if (Number.isInteger(quantity) && quantity > 0 && quantity <= 100) {
            let foundProduct = this.basket.find(p => p.id == product.id && p.color == product.color);
            if (foundProduct == undefined) {
                product.quantity = quantity;
                this.basket.push(product);
            } else if(foundProduct.quantity + quantity > 100) {
                foundProduct.quantity = 100;
            } else {
                foundProduct.quantity += quantity;
            }
            this.save()
        }
        else{
            throw new Error("La quantité doit être un nombre compris entre 1 et 100");
        }
    }
    /**
     * Remove a product in the basket
     * @param {{id:string, color:string}} product 
     */
    remove(product) {
        this.basket = this.basket.filter(p => p.id != product.id || (p.id == product.id && p.color != product.color ));
        this.save();
    }
    /**
     * Change the quantity (1-100) of product in the basket
     * @param {{id:string, color:string}} product
     * @param {number} quantity 
     */
    changeQuantity(product, quantity) {
        if (Number.isInteger(quantity) && quantity >= 0 && quantity <= 100){
            let foundProduct = this.basket.find(p => p.id == product.id && p.color == product.color);
            if (foundProduct != undefined) {
                foundProduct.quantity = quantity;
                if (foundProduct.quantity <= 0 || quantity <= 0) {
                    this.remove(foundProduct);
                } else {
                    this.save();
                }
            } 
        }
    }
    /**
     * Get all products
     * @return {{id:string, color:string, quantity:num}[]} 
     */
    get products() {
        let products = this.basket.filter(p => p == p)
        return products ;   
    } 
}