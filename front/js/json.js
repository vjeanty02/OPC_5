// Get products from JSON file
const reponse = await fetch(`http://localhost:3000/api/products/`);
const products = await reponse.json();


/*=============================================
=            Functions            =
=============================================*/

/**
 * Get products from JSON file
 * @returns {Array}
 */
export function getProductsfromJson(){
    return products;
}
/**
 * Get products (by id) from JSON file
 * @param {object} The url value.
 * @returns {object}
 */
export function getProductfromJsonById(id){
    return products.find(p => p._id == id);
}
