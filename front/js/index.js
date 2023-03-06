import { getProductsfromJson } from './json.js';
import { productsForIndexPage } from './html.js';

// Get products from JSON file
const products = getProductsfromJson();

// Add products to homepage (index.html)
document.querySelector('#items').innerHTML = productsForIndexPage(products);
for (let i = 0; i < products.length; i++) {
    const product = products[i];
    document.querySelector(`.product-${i}`).href = `./product.html?id=${product._id}`;
    document.querySelector(`.product-image-${i}`).src = product.imageUrl;
    document.querySelector(`.product-name-${i}`).innerText = product.name;
    document.querySelector(`.product-description-${i}`).innerText = product.description;
}