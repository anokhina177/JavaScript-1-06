let products = [
    {id: 0, name : "oranges", price: 100}, 
    {id: 1, name : "apples", price: 100}, 
    {id: 2, name : "pears", price: 100}, 
    {id: 3, name : "melons", price: 100}, 
];

let cart ={};

let createElement = function(tag, className, innerText){
    let element = document.createElement(tag);
    element.className = className;
    element.innerText = innerText;
    return element;
}

let putToCart = function(id) {
    console.log("Adding product: " + products[id].name + "...");
    let item;
    if (id in cart) {
        item = cart[id];
        item.quantity +=1;
    }
    else {
        item = {id:id, product:products[id], quantity : 1};
        cart[id] = item;
    }
}

let getCartPrice = function(cart) {
    let price = 0;
    for (const key in cart) {
        price += cart[key].quantity * cart[key].product.price;
    }

    return price;
}

let objectHasProperties = function(object) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            return true;
        }
    }
    return false;
}

let updateCartTag = function(tag, cart) {
    tag.innerHTML = "";
    if (!objectHasProperties(cart)) {
        tag.appendChild(createElement("div", "product", "Cart is empty..."));
        return;
    }
    
    for (const key in cart) {
        let item = document.createElement("div");
        item.id = cart[key].id;
        item.className = "cart-item";
        item.appendChild(createElement("div", "title", cart[key].product.name));
        item.appendChild(createElement("div", "quantity", "x" + cart[key].quantity));
    
        tag.appendChild(item);        
    }
    tag.appendChild(createElement("div", "total-price", "Total Price: $" + getCartPrice(cart)));

}
let createProduct = function(p) {
    let product = document.createElement("div");
    product.className = "product";
    product.id = p.id;

    product.appendChild(createElement("div", "title", p.name));
    product.appendChild(createElement("div", "price", p.price));
    let buyButton = createElement("button","add-button","Add");
    buyButton.addEventListener('click', function(){
        putToCart(p.id);
        updateCartTag(document.getElementById("cart"), cart);
    });

    product.appendChild(buyButton);

    return product
}

let loadProducts = function() {
    console.log("Loading products...");
    let catalogue = document.getElementById("catalogue");
    catalogue.className = "catalogue";
    products.forEach(p => {
        let product = createProduct(p);

        catalogue.appendChild(product);
    });

    let cartTag = document.getElementById("cart");
    cartTag.className = "cart";
    updateCartTag(cartTag, cart)
}