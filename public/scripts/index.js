import {user} from "./auth0.js"
console.log(user);

const order_btns = document.getElementsByClassName("order_btn");
const redirect_btns = document.getElementsByClassName("redirect_btn");
const cart_btns = document.getElementsByClassName("to_cart_btn");
const close_btns = document.getElementsByClassName("close_btn");
const clear_btns = document.getElementsByClassName("clear_btn");
const order_modal = document.getElementById("order_modal");

/*Used a ternary operator here because it was an effective and easily readable way to have the script determine if a new cart needed to be made 
or if it pulls in existing cart data. */
const cart = (localStorage.cart) ? new Map(JSON.parse(localStorage.cart)) : new Map();


//Button event listeners
if(redirect_btns.length == 0){
    for(let i = 0; i < order_btns.length; i++){
        order_btns[i].addEventListener("click", displayCart);
    }
    for(let i = 0; i < cart_btns.length; i++){
        cart_btns[i].addEventListener("click", updateCart);
    }
} else{
    for(let i = 0; i < redirect_btns.length; i++){
        redirect_btns[i].addEventListener("click", redirect);
    }
}
for(let i = 0; i < close_btns.length; i++){
    close_btns[i].addEventListener("click", close);
}
for(let i = 0; i < clear_btns.length; i++){
    clear_btns[i].addEventListener("click", clearCart);
}


//Function Declarations
function displayCart(){
    order_modal.classList.add("show");
    updateModal()
}

function redirect(){
    window.location.href = "./public/pages/menu.html";
}

function close(){
    order_modal.classList.remove("show");
}

//This function allows the map to contain all of each item's data in a single key, value pair.
function Food(name, price, amount){
    this.food_name = name;
    this.food_price = price;
    this.food_amount = amount;
}

function updateCart(){

    let id;
  
    /*Because this is already grabbing the info from the cart, I can improve this by removing this same loop from the add, remove, and set item functions by making
    a variable to hold i, which will be the item's ID in the cart.
    */
    for (let i=0; i<cart.size; i++){
        if(event.target.parentElement.querySelector(".item_name").innerText == cart.get(i).food_name){
            id = i;
        }
    }
    /*If statement that determines whether to add remove or set the amount of the item in the cart modal. Currently only the
    add_item is present as it is the only one that is working.
    */
    if (event.target.className == "item_add" || event.target.className == "to_cart_btn"){
        addItem(id);
    } else if(event.target.className == "item_rmve"){
        removeItem(id);
    } else if(event.target.className == "item_amount"){
        setItem(id);
    }
    updateModal();
    saveCart();
}

function updateModal(){
    const cart_box = document.getElementById("cart_modal");
    const item_list = []

    /*Puts each piece of information about item into its own element then appends that into a section so its all grouped in one place.
    This is good for semantic HTML as these elements share a theme, but also so that each food section can be targeted with the same css*/
    cart.forEach((value, key) => {
        let section = document.createElement("section");
        let name = document.createElement("p");
        let price = document.createElement("p");
        let amount = document.createElement("INPUT");
        let add = document.createElement("button");
        let remove = document.createElement("button");

        name.innerText = value.food_name;
        price.innerText = value.food_price;
        add.innerText = "+";
        remove.innerText = "-"

        amount.setAttribute("type", "number");
        amount.setAttribute("value", value.food_amount);

        section.className = `food_item`;
        name.className = "item_name";
        price.className = "item_price";
        amount.className = "item_amount";
        add.className = "item_add";
        remove.className = "item_rmve"
            
        section.appendChild(name);
        section.appendChild(price);
        section.appendChild(remove);
        section.appendChild(amount);
        section.appendChild(add);

        item_list.push(section);
        }
    );

    //Prevents the displayCart function from replacing the p tag until after there is something in the cart. If the cart returns to empty, the p tag is added back.
    if(cart.size != 0){
        cart_box.replaceChildren(...item_list);

        //Note: This can be updated so that one event listener can watch the parent element and determine which function to run by the event.target's class element.
        for(let i = 0; i < item_list.length; i++){
            item_list[i].querySelector(".item_add").addEventListener("click", updateCart);
            item_list[i].querySelector(".item_rmve").addEventListener("click", updateCart);
            item_list[i].querySelector(".item_amount").addEventListener("keydown", () => {
                if(event.key === "Enter")
                    updateCart();
            });
        }
    } else{
        let para = document.createElement("p");
        para.innerText = "Cart is empty!";
        cart_box.replaceChildren(para);
    }


}

function addItem(id = cart.size){
    //Function that will place the item object passed to it and add that to the cart.

    if (typeof cart.get(id) == 'object'){
        
        let food = new Food(cart.get(id).food_name, cart.get(id).food_price, cart.get(id).food_amount + 1);
        cart.set(id, food);
    } else{
        //These are only declared inside this else statement as they are unneeded in a larget scope.
        let item = event.target.parentElement.querySelector(".item_name");
        let price = event.target.parentElement.querySelector(".item_price");

        let food = new Food(item.innerText, price.innerText, 1);
        cart.set(cart.size, food);
    }
}

//Function that removes an item from the cart. Takes in only item and the amount in the cart. No need to take in price.
function removeItem(id = cart.size){

    let food = new Food(cart.get(id).food_name, cart.get(id).food_price, cart.get(id).food_amount - 1);
    cart.set(id, food);

    if(cart.get(id).food_amount == 0){
        cart.delete(id);
        cart.forEach((value, key) => {
            if (key > id){
                cart.set(key -1, value);
                cart.delete(key);
            };
        })
    }
}

/*Started writing the setItem function, which will take info on keydown of the 'enter' key and 
set the food_amount of the specific item in the cart to whatever value is in the input. */
function setItem(id){

    let amount = event.target.parentElement.querySelector(".item_amount").value;
    amount = Number(amount);

    let food = new Food(cart.get(id).food_name, cart.get(id).food_price, amount)
        cart.set(id, food);

    if(cart.get(id).food_amount == 0){
        cart.delete(id);
        cart.forEach((value, key) => {
            if (key > id){
                cart.set(key -1, value);
                cart.delete(key);
            };
        })
    }
}

function clearCart(){
    cart.clear();
    updateModal();
    saveCart();
}

//This function saves the cart to a JSON file in local storage
function saveCart(){
    let array = Array.from(cart.entries());
    localStorage.cart = JSON.stringify(array);
}

