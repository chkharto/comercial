const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

// open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}

// close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

// Cart Working JS
if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making funtion
function ready() {
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for(let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // quantity changes
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for(let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // add to cart 
    let addCart = document.getElementsByClassName("add-cart");
    for(let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener('click', buyButtonClick)
}
// buyt button
function buyButtonClick() {
    alert("Your Order is placed");
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}


// remove irems from cart
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// quantity changes
function quantityChanged(event) {
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
} 

// add to cart clicked
function addCartClicked(event) {
    let button = event.target;
        let cartBox = button.parentElement.parentElement;
        let shopProducts = button.parentElement;
        let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
        let price = shopProducts.getElementsByClassName('price')[0].innerText;
        let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
        addProductCart(title, price, productImg);
        updatetotal();
}

function addProductCart(title, price, productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemNames = cartItems.getElementsByClassName("cart-product-title");
    for(let i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert("You have already add this to cart");
            return;
        }
    }
    let cartBoxContent = `
        <img src=${productImg} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- Remove Cart -->
        <i class="bx bxs-trash-alt cart-remove"></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Update Total
function updatetotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for(let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + price * quantity;
    }
        // if price contains some cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}



// -------------------------chat-----------------------
function maximize(){
    document.getElementById("chatbox").style.opacity = "1";
    document.getElementById("chatcircle").style.opacity = "0";
}
function minimize(){
    document.getElementById("chatbox").style.opacity = "0";
    document.getElementById("chatcircle").style.opacity = "1";
    document.getElementById("chatcircle").style.visibility = "visible";
}
function Solve(val) {
    var v = document.getElementById('res');
    v.value += val;
}
function Result() {
    var num1 = document.getElementById('res').value;
    var num2 = eval(num1);
    document.getElementById('res').value = num2;
}
function Clear() {
    var inp = document.getElementById('res');
    inp.value = '';
}
function Back() {
    var ev = document.getElementById('res');
    ev.value = ev.value.slice(0,-1);
 }

const minimizeBtn = document.getElementById("minimize-btn");
const chatContent = document.getElementById("chat-content");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const userNameElement = document.getElementById("user-name");

minimizeBtn.addEventListener("click", () => {
chatbox.classList.toggle("minimized");
});

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
sendMessage();
}
});

// Fetch and display old messages when the page loads
window.addEventListener("DOMContentLoaded", () => {
    const userName = "dato";
    const otheruser = "Bot";
    userNameElement.textContent = userName;
    fetchOldMessages(userName);
});
function fetchOldMessages(userName) {
    const otheruser = "Bot";
    fetch("http://172.27.27.108:5000/get-all-messages")
    .then((response) => response.json())
    .then((data) => {
    const messages = data.messages;
    messages.forEach((message) => {
    const sender = message.sender === userName ? userName : otheruser;
    if (sender === userName) {
    displayMessage(message.message, sender, message.timestamp);
    } else {
    displayMessageOther(message.message, sender, message.timestamp);
    }
});


 // Scroll to the bottom of the chat content
 chatContent.scrollTop = chatContent.scrollHeight;
})
.catch((error) => {
 console.error("Error fetching messages:", error);
});
}

function displayMessage(message, sender, timestamp) {
    console.log("Current User:", userNameElement.textContent);
    console.log("Message Sender:", sender);

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");
    messageContainer.classList.add("visible");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message;

    const timestampElement = document.createElement("div");
    timestampElement.classList.add("timestamp");
    timestampElement.classList.add("small-font");
    timestampElement.textContent = formatTimestamp(timestamp);

    messageContainer.appendChild(messageElement);
    messageContainer.appendChild(timestampElement);
    chatContent.appendChild(messageContainer);
    // Trigger animation
    setTimeout(() => {
    messageContainer.classList.add("active");
    }, 100);

    // Print the sender's name for debugging
    console.log("Sender:", sender);
}

function displayMessageOther(message, sender, timestamp) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container1");
    messageContainer.classList.add("visible");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message;

    const timestampElement = document.createElement("div");
    timestampElement.classList.add("timestamp");
    timestampElement.classList.add("small-font");
    timestampElement.textContent = formatTimestamp(timestamp);

    messageContainer.appendChild(messageElement);
    messageContainer.appendChild(timestampElement);
    chatContent.appendChild(messageContainer);
    // Print the sender's name for debugging
    setTimeout(() => {
        messageContainer.classList.add("active");
    }, 100);
    console.log("Sender:", sender);
}

function formatTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp));
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

function sendMessage() {
    const userName = userNameElement.textContent;
    const otherUserName = "Bot";
    const message = messageInput.value.trim();
    if (message !== "") {
    displayMessage(message, userName, Date.now());

    // Send message to the server with the user name
    fetch("http://172.27.27.108:5000/store-message", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, sender: userName, timestamp: Date.now() }),
    })
    .then((response) => {
    if (response.ok) {
        console.log("Message sent successfully");
    } else {
        console.log("Failed to send message");
    }
    })
    .catch((error) => {
    console.error("Error sending message:", error);
    });

    messageInput.value = "";
    messageInput.focus();

    chatContent.scrollTop = chatContent.scrollHeight;
    }
    displayMessageOther(message.message, otherUserName, Date.now());
}