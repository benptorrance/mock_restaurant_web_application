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
} else{
    redirect_btn.addEventListener("click", redirect);
}
for(let i = 0; i < cart_btns.length; i++){
        cart_btns[i].addEventListener("click", updateCart);
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
    let price = event.target.parentElement.querySelector(".item_price");
    let amount = 0;
    if (event.target.parentElement.querySelector(".item_amount") != null){
        let amount = event.target.parentElement.querySelector(".item_amount");
        amount = Number(amount.value);
    }

    /*If statement that determines whether to add remove or set the amount of the item in the cart modal. Currently only the
    add_item is present as it is the only one that is working.
    */
    if (event.target.className == "item_add" || event.target.className == "to_cart_btn"){

        if(amount != 0){
            updateItem(item, price, amount);
        } else {
            updateItem(item, price, amount +1)
        }
    } 
    else if(event.target.className == "item_rmve"){
        if(amount != 0){
            updateItem(item, price, amount-1);
        } else {
            removeItem(item);
        }
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

function updateItem(item = event.target.parentElement.querySelector(".item_name"), price = event.target.parentElement.querySelector(".item_price"), amount = 1){
    //Function that will place the item object passed to it and add that to the cart.

    let pointer = 0;

    //Cycles through the map to see if the item is already present, then sets the pointer variable to. This prevents duplicate entries and also that we targe the right one.
    for (let i = 0; i < cart.size; i++) {
            value = cart.get(i);
            if(value.food_name == item.innerText){
                pointer = i;
                break;
            } else{
                pointer = cart.size + 1;
            }
    }

    if (typeof cart.get(pointer) == 'object'){
        let food = new Food(item.innerText, price.innerText, cart.get(pointer).food_amount + amount);
        cart.set(pointer, food);
    } else{
        let food = new Food(item.innerText, price.innerText, 1);
        cart.set(cart.size, food);
    }
}

function removeItem(){
    //Function that removes an item from the cart.
    let pointer = null;
    console.log("hello");
    //Same loop as from above to locate the specific item in the cart
    for (let i = 0; i < cart.size; i++) {
            value = cart.get(i);
            if(value.food_name == item.innerText){
                pointer = i;
                break;
            }
    }

    cart.delete(item);
}
