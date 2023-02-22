//Get product id to display
function getId(url) {
    return new URL(url).searchParams.get("id");
}

// Get product from JSON file
const reponse = await fetch('http://localhost:3000/api/products/' + getId(location.href));
const product = await reponse.json();

// Add a product to product.html
document.querySelector("#item__img img").src = product.imageUrl;
document.querySelector("#title").innerText = product.name;
document.querySelector("#price").innerText = product.price;
document.querySelector("#description").innerText = product.description;

for (let i = 0; i < product.colors.length; i++) {
    const element = product.colors[i];
    document.querySelector("#colors").innerHTML += `<option value="${element}">${element}</option>`;
}



