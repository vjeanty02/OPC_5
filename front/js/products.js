// Récupération des produits depuis le fichier JSON

let url = new URL(document.location.href);
let id = url.searchParams.get("id");
const reponse = await fetch('http://localhost:3000/api/products/'+id);
const product = await reponse.json();


document.getElementById("item__img").innerHTML = '<img src = "'+ product.imageUrl + '" alt="Photographie d\'un canapé"></img>'
document.getElementById("title").innerHTML = product.name;
document.getElementById("price").innerHTML = product.price;
document.getElementById("description").innerHTML = product.description;

for (let i = 0; i < product.colors.length; i++) {
    const element = product.colors[i];
    document.getElementById("colors").innerHTML += '<option value="'+element+'">'+element+'</option>';
}



