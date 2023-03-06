// Get products from JSON file
const reponse = await fetch(`http://localhost:3000/api/products/`);
const products = await reponse.json();

/*=============================================
=            Functions            =
=============================================*/

/**
 * @typedef {Object} products
 * @property {string[]} colors
 * @property {string} _id
 * @property {string} name
 * @property {number} price
 * @property {string} imageUrl
 * @property {string} description
 * @property {string} altTxt
 */
/**
 * Get products from JSON file
 * @returns {products[]}
 */
export function getProductsfromJson(){
    return products;
}
/**
 * Get products (by id) from JSON file
 * @param {string} id
 * @returns {products}
 */
export function getProductfromJsonById(id){
    return products.find(p => p._id == id);
}