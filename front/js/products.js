//Get product id to display
function getId(url) {
    return new URL(url).searchParams.get("id");
}
let id = getId(location.href);
// Get product from JSON file
const reponse = await fetch(`http://localhost:3000/api/products/${id}`);
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

function addToCart() {
    // let x = document.querySelector("#colors").selectedIndex;
    // let color = document.getElementsByTagName("option")[x].value;
    // let quantity = document.querySelector("#quantity").value;
    // let id = new URL(location.href).searchParams.get("id");
    //     let basket = new Basket();
    // basket.add({id:"25","color":`${color}`},5);
    alert('a');
}