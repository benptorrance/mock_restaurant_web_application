
const cart = new Map();


//Button event listener and functions
document.getElementById("order_btn").addEventListener("click", order)


function order(){
    console.log("Start Your Order! Pressed!");
    location.href = "/public/pages/menu.html";
    
}

function login(){
    console.log("Sign In Pressed!")
}

function addToCart(item){
    //Function that will place the item object passed to it and add that to the cart.
    cart.set(item);
}

function removeFromCart(){
    cart.delete(item)
}