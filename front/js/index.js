import { getProductsfromJson } from './json.js';
import { productsForIndexPage } from './html.js';

// Get products from JSON file
const products = getProductsfromJson();

// Add products to homepage (index.html)
document.querySelector('#items').innerHTML = productsForIndexPage(products);
products.forEach((product,i) => {
    document.querySelector(`.product-${i}`).href = `./product.html?id=${product._id}`;
    document.querySelector(`.product-image-${i}`).src = product.imageUrl;
    document.querySelector(`.product-image-${i}`).alt = product.altTxt;
    document.querySelector(`.product-name-${i}`).innerText = product.name;
    document.querySelector(`.product-description-${i}`).innerText = product.description;
});