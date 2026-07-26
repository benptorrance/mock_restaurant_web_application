
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
    console.log(cart.get(1));
    document.getElementById("cart_text").textContent = cart.get(1); 
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
    let pointer = 0;

    //Cycles through the map to see if the item is already present, then sets the pointer variable to. This prevents duplicate entries and also that we targe the right one.
    for (let i = 0; i < cart.size; i++) {
            value = cart.get(i);
            if(value.food_name == item.innerText){
                console.log ("Yep " + value.food_name);
                pointer = i;
                break;
            } else{
                console.log ("Nope " + value.food_name);
                pointer = cart.size + 1;
            }
    }

    if (typeof cart.get(pointer) == 'object'){
        let food = new Food(item.innerText, price.innerText, cart.get(pointer).food_amount +1);
        cart.set(pointer,food);
    } else{
        let food = new Food(item.innerText, price.innerText, 1);
        cart.set(cart.size, food);
        console.log(cart.get(item.innerText));
    }
    cart.forEach((value, key) => {console.log(value)});
    console.log("Added " + item.innerText + " to Cart!");
}

function removeFromCart(){
    //Function that removes an item from the cart.
    cart.delete(item);
}
