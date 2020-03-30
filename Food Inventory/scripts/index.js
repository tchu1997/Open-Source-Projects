const foodList = document.querySelector('.food-section');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const clearCartBtn = document.querySelector('#clear-cart');


const setupUI = (user) => {
    if (user){
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }else{
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

let products = [];
// set up food
const setupFood = (data) => {
     if (data.length){
        let html = '';
        data.forEach(doc => {
        const foodItem = doc.data();
        const foodImg = "img/" + foodItem.description.toLowerCase() + ".jpg";
        const foodCard = `
        <div class ="column">
            <div class="item-card">
                <div class="item-image">
                    <img src="${foodImg}">
                </div>
                <div class="item-info">
                    <h5>${foodItem.description}</h5>
                    <h6>${foodItem.unit}</h6>
                    <h6>Limit: ${foodItem.limit}</h6>
                </div>
                <a href="#" class="add-cart fa fa-shopping-cart"></a>
            </div>
        </div>`;
        html += foodCard;
        products.push(new Product(foodItem.description,foodItem.unit,foodItem.quantity,foodItem.isVeg,foodItem.limit, 0));
        });
        foodList.innerHTML = html;
    } else {
        foodList.innerHTML = '<div class="alert">Please login to order food!</div>';
    }    
}

// show number of products added to cart when page is refreshed
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
// get the number of products added to cart
function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    let productNumbers = localStorage.getItem('cartNumbers');
    cartItems = JSON.parse(cartItems);
    if (cartItems !=null){
        if (cartItems[product.description] == undefined){
            cartItems = {
                ...cartItems,
                [product.description]: product
            }
        }
        if (cartItems[product.description].inCart < cartItems[product.description].limit){
            cartItems[product.description].inCart +=1;
        }else {
            // if inCart exceeds limit
            localStorage.setItem('cartNumbers', productNumbers -1);
            alert("Sorry! This item has a limit of " + cartItems[product.description].limit);
        }
        
    } else {
        product.inCart = 1;
        cartItems =  {
            [product.description]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

window.onload = function () {
    (function () {
        const carts = document.querySelectorAll('.add-cart');
        if (carts.length > 0) {
            // do something if add-cart is found
            for (let i = 0; i < carts.length; i ++){
                carts[i].addEventListener('click', ()=>{
                    cartNumbers(products[i]);
                });
            }
        }
        else {
            setTimeout(arguments.callee, 50); // call myself again in 50 msecs
        }
    }());
};
onLoadCartNumbers();

// }
class Product {
    constructor(desc, unit, qty, isVeg, lim, inCart) {
        this.description = desc;
        this.unit = unit;
        this.quantity = qty;
        this.isVeg = isVeg;
        this.limit = lim;
        this.inCart = inCart;
    }
    toString(){
        return this.description + ", " + this.unit + ", " + this.quantity
            + ", " + this.isVeg + ", " + this.limit;
    }
}

// setup materialize components
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartTotal = localStorage.getItem('cartNumbers');
    if (cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            //let productImg = "img/" + item.description.toLowerCase() + ".jpg";
            productContainer.innerHTML +=`
            <div class="row">
                <div class="product col s6">
                    <ion-icon name="close-circle"></ion-icon>
                    <span>${item.description}</span>
                </div>
                <div class="quantity col s6">
                    <ion-icon class="decrease" name="arrow-back-circle-outline"></ion-icon>
                    <span>${item.inCart}</span> 
                    <ion-icon class="increase" name="arrow-forward-circle-outline"></ion-icon>
                </div>
            </div>
            `
        });
        productContainer.innerHTML +=`
        <div class="basketTotalContainer">
            <h5 class="basketTotalTitle">
                Total: 
            </h5>
            <h5 class="basketTotal"> ${cartTotal} Items
            </h5>
        </div>
        `

    }
}
displayCart();
document.addEventListener('DOMContentLoaded',function(){
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    
});



