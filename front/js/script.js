// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('http://localhost:3000/api/products');
const pieces = await reponse.json();


// Création des balises 
const article = pieces[0];
const imageElement = document.createElement("img");
imageElement.src = article.imageUrl;
const nomElement = document.createElement("h2");
nomElement.innerText = article.name;
const prixElement = document.createElement("p");
prixElement.innerText = article.price;

//Rattachement de nos balises au DOM
const sectionFiches = document.querySelector(".items");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
