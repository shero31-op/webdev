let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let addCartButtons = document.querySelectorAll('.addCart');
let cartList = document.querySelector('.listCart');
let totalElement = document.querySelector('.total');
let totalAmount = 0;
let cartCountElement = document.querySelector('.icon-cart span');
let cartItemCount = 0;

// Toggle cart visibility
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Add to cart functionality
addCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    let productItem = event.target.closest('.item');
    let productName = productItem.querySelector('h2').innerText;
    let productPrice = parseFloat(productItem.querySelector('.price').innerText.replace('$', ''));
    let productImage = productItem.querySelector('img').src;

    // Check if the product is already in the cart
    let existingProduct = Array.from(cartList.children).find(item => item.querySelector('.name').innerText === productName);

    if (existingProduct) {
        // If the product already exists, update its quantity
        let quantityElement = existingProduct.querySelector('.quantityValue');
        let currentQuantity = parseInt(quantityElement.innerText);
        quantityElement.innerText = currentQuantity + 1;

        let totalPriceElement = existingProduct.querySelector('.totalPrice');
        totalPriceElement.innerText = (productPrice * (currentQuantity + 1)).toFixed(2);
    } else {
        // If the product is not in the cart, add it
        let cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.innerHTML = `
            <div class="image">
                <img src="${productImage}" alt="${productName}">
            </div>
            <div class="name">${productName}</div>
            <div class="totalPrice">${productPrice.toFixed(2)}</div>
            <div class="quantity">
                <span class="minus">-</span>
                <span class="quantityValue">1</span>
                <span class="plus">+</span>
            </div>
        `;
        cartList.appendChild(cartItem);

        // Add event listeners for quantity changes
        cartItem.querySelector('.plus').addEventListener('click', () => {
            updateQuantity(cartItem, productPrice, 1);
        });

        cartItem.querySelector('.minus').addEventListener('click', () => {
            updateQuantity(cartItem, productPrice, -1);
        });
    }

    updateTotal(productPrice);
    updateCartCount(1);
}

function updateQuantity(cartItem, productPrice, change) {
    let quantityElement = cartItem.querySelector('.quantityValue');
    let totalPriceElement = cartItem.querySelector('.totalPrice');
    let currentQuantity = parseInt(quantityElement.innerText);
    let newQuantity = currentQuantity + change;

    if (newQuantity > 0) {
        quantityElement.innerText = newQuantity;
        totalPriceElement.innerText = (productPrice * newQuantity).toFixed(2);
        updateTotal(productPrice * change);
    } else if (newQuantity === 0) {
        cartItem.remove();
        updateTotal(-productPrice * currentQuantity);
        updateCartCount(-1);
    }
}

function updateTotal(change) {
    totalAmount += change;
    totalElement.innerText = `Total: $${totalAmount.toFixed(2)}`;
}

function updateCartCount(change) {
    cartItemCount += change;
    cartCountElement.innerText = cartItemCount;
}