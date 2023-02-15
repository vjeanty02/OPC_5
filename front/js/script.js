// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('http://localhost:3000/api/products');
const pieces = await reponse.json();


// Création des balises 

for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    let linkElement = document.createElement("a");
    linkElement.className = "item-link-" + i;
    linkElement.href = "./product.html?name=" + article._id;

    let articleElement = document.createElement("article");
    articleElement.className = "article-" + i;
    

    let imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    imageElement.alt = article.altTxt;
    imageElement.id = article.imageUrl;
    
    let nameElement = document.createElement("h3");
    nameElement.innerText = article.name;

    let descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description;

    //Rattachement de nos balises au DOM
    let link = document.querySelector(".items");
    link.appendChild(linkElement);

    let articles = document.querySelector(".item-link-" + i);
    articles.appendChild(articleElement);

    let sectionFiches = document.querySelector(".article-"+ i);
    sectionFiches.appendChild(imageElement);
    sectionFiches.appendChild(nameElement);
    sectionFiches.appendChild(descriptionElement);
}


