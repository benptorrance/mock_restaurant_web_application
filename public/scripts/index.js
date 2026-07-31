const order_btn = document.getElementById("order_btn");
const redirect_btn = document.getElementById("redirect_btn");
const cart_btns = document.getElementsByClassName("to_cart_btn");
const login_btn = document.getElementById("login_btn");
const close_btn = document.getElementById("close_btn");
const modal = document.getElementById("modal");
const cart = new Map();


//Button event listeners
if(redirect_btn == null){
    order_btn.addEventListener("click", display_cart);
    for(let i = 0; i < cart_btns.length; i++){
        cart_btns[i].addEventListener("click", updateCart);
    }
} else{
    redirect_btn.addEventListener("click", redirect);
}
login_btn.addEventListener("click", login);
//This currently throws an error on the Home and About screens, but that is due to there not being a close_btn element on those pages yet.
close_btn.addEventListener("click", close);

function display_cart(){
    modal.classList.add("show");
    updateModal()
}

function login(){
    console.log("Sign In Pressed!");
}

function redirect(){
    window.location.href = "./public/pages/menu.html";
}

function close(){
    modal.classList.remove("show");
}

function Food(name, price, amount){
    this.food_name = name;
    this.food_price = price;
    this.food_amount = amount;
}

function updateCart(){

    let item = event.target.parentElement.querySelector(".item_name");
    let price;
    let amount;
    let id;
  
    /*Because this is already grabbing the info from the cart, I can improve this by removing this same loop from the add, remove, and set item functions by making
    a variable to hold i, which will be the item's ID in the cart.
    */
    for (let i=0; i<cart.size; i++){
        if(item.innerText == cart.get(i).food_name){
            price = cart.get(i).food_price;
            amount = cart.get(i).food_amount;
            id = i;
        }
    }
    /*If statement that determines whether to add remove or set the amount of the item in the cart modal. Currently only the
    add_item is present as it is the only one that is working.
    */
    console.log("Amount: " + amount);
    if (event.target.className == "item_add" || event.target.className == "to_cart_btn"){
        addItem(id);
    } else if(event.target.className == "item_rmve"){
        removeItem(id);
    } else if(event.target.className == "item_rmve"){

    }
    updateModal();
}

function updateModal(){
    const cart_box = document.getElementById("cart_modal");
    const item_list = []

    //Loops through all the items and adds them to an array so that it can be printed out on the cart modal.
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

        section.id = `item_${value.food_name}`;
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

    //Prevents the display_cart function from replacing the p tag until after there is something in the cart. If the cart returns to empty, the p tag is added back.
    if(cart.size != 0){
        cart_box.replaceChildren(...item_list);

        //Note: This can be updated so that one event listener can watch the parent element and determine which function to run by the event.target's class element.
        for(let i = 0; i < item_list.length; i++){
            item_list[i].querySelector(".item_add").addEventListener("click", updateCart);
            item_list[i].querySelector(".item_rmve").addEventListener("click", updateCart);
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
        console.log(cart);
    }
}

/*Started writing the setItem function, which will take info on keydown of the 'enter' key and 
set the food_amount of the specific item in the cart to whatever value is in the input. */
function setItem(id, amount){

    if (amount == 0){
        cart.delete(id);
    } else{
        let food = new Food(cart.get(id).food_name, cart.get(id).food_price, amount)
    }
}