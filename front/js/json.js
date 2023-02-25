// Get products from JSON file
const reponse = await fetch(`http://localhost:3000/api/products/`);
const products = await reponse.json();

export function getProductsfromJson(){
    return products;
}
export function getProductfromJson(ID){
    return products.find(p => p.id == ID.id);
}

