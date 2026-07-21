
const order_btn = document.getElementById("order_btn");
const login_btn = document.getElementById("login_btn");
const modal = document.getElementById("modal");
const close_btn = document.getElementById("close_btn");
const cart = new Map();


//Button event listeners
order_btn.addEventListener("click", order);
login_btn.addEventListener("click", login);
close_btn.addEventListener("click", close);


function order(){
    console.log("Start Your Order! Pressed!");

    modal.classList.add("show");
}

function login(){
    console.log("Sign In Pressed!");
}

function close(){
    modal.classList.remove("show");
}

function addToCart(item){
    //Function that will place the item object passed to it and add that to the cart.
    cart.set(item);
}

function removeFromCart(){
    //Function that removes an item from the cart.
    cart.delete(item);
}