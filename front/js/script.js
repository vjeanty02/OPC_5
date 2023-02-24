// Get products from JSON file
const response = await fetch('http://localhost:3000/api/products');
const product = await response.json();

// Add products to homepage (index.html)
for (let i = 0; i < product.length; i++) {
    const article = product[i];
    document.querySelector('#items').innerHTML += `
    <a class="product-${i}" href="./product.html?id=">
        <article>
            <img class="product-image-${i}" src="" alt="Lorem ipsum dolor sit amet, Kanap name1">
            <h3 class="product-name-${i}" class="productName"></h3>
            <p class="product-description-${i}"></p>
        </article>
    </a>`
    document.querySelector(`.product-${i}`).href = `./product.html?id=${article._id}`;
    document.querySelector(`.product-image-${i}`).src = article.imageUrl;
    document.querySelector(`.product-name-${i}`).innerText = article.name;
    document.querySelector(`.product-description-${i}`).innerText = article.description;
}