// Récupération des produits depuis le fichier JSON

let url = new URL(document.location.href);
let id = url.searchParams.get("id");
const reponse = await fetch('http://localhost:3000/api/products/'+id);
const product = await reponse.json();


document.querySelector("#item__img img").src = product.imageUrl;
document.querySelector("#title").innerText = product.name;
document.querySelector("#price").innerText = product.price;
document.querySelector("#description").innerText = product.description;

for (let i = 0; i < product.colors.length; i++) {
    const element = product.colors[i];
    document.querySelector("#colors").innerHTML += '<option value="'+element+'">'+element+'</option>';
}



