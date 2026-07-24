
const order_btn = document.getElementById("order_btn");
const cart_btns = document.getElementsByClassName("to_cart_btn");
const login_btn = document.getElementById("login_btn");
const modal = document.getElementById("modal");
const close_btn = document.getElementById("close_btn");
const cart = new Map();


//Button event listeners
order_btn.addEventListener("click", order);
for(let i = 0; i < cart_btns.length; i++){
        cart_btns[i].addEventListener("click", addToCart);
    }
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

function Food(name, price, amount){
    this.food_name = name;
    this.food_price = price;
    this.food_amount = amount;
}

function addToCart(){
    //Function that will place the item object passed to it and add that to the cart.

    //add functionality that will allow the user to put in how many they would like to order when they add item to cart
    let item = event.target.parentElement.querySelector(".item_name");
    let price = event.target.parentElement.querySelector(".item_price");
    console.log(typeof cart.get(1));
    if (typeof cart.get(1) == 'object'){
        console.log("Inside if");
        console.log("Amount Before: "+ cart.get(1).food_amount);
        let food = new Food(item.innerText, price.innerText, cart.get(1).food_amount +1);
        cart.set(1,food);
        console.log("Amount After: "+ cart.get(1).food_amount);
    } else{
        console.log("Inside else");
        let food = new Food(item.innerText, price.innerText, 1);
        cart.set(1, food);
        console.log(cart.get(item.innerText));
    }
    console.log("Added " + item.innerText + " to Cart!");
}

function removeFromCart(){
    //Function that removes an item from the cart.
    cart.delete(item);
}
