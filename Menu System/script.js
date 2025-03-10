let order = [];
let total = 0;

function addToOrder(item, price, quantity = 1) {
    for (let i = 0; i < quantity; i++) {
        order.push({ item, price });
    }
    updateOrderDisplay();
    updateTotal();
}

function resetOrder() {
    order = [];
    total = 0;
    updateOrderDisplay();
    updateTotal();
}

function updateOrderDisplay() {
    const orderDisplay = document.getElementById('order-display');
    let orderText = '';
    for (let i = 0; i < order.length; i++) {
        orderText += `${order[i].item} - ₱${order[i].price}\n`;
    }
    orderDisplay.value = orderText;
}

function updateTotal() {
    total = order.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('order-total').value = `Total: ₱${total}`;
}

// Function to show notification
function showNotification(total) {
    alert(`Thank you for your order! The total is ₱${total}.`);
    // Alternatively, you can use a custom popup here
}

function placeOrder() {
    if (total > 0) {
        showNotification(total);
        resetOrder(); // Reset order after placing it
    }
}

// Call showNotification when order is finalized
document.getElementById('order-total').addEventListener('click', function() {
    if (total > 0) {
        showNotification(total);
    }
});

// Quantity popup logic
let selectedItem = null;
let selectedPrice = 0;

function showQuantityPopup(item, price) {
    selectedItem = item;
    selectedPrice = price;
    document.getElementById('popup-item-name').innerText = `Quantity for ${item}:`;
    document.getElementById('quantity').value = 1; // Reset quantity to 1
    document.getElementById('quantityPopup').style.display = 'flex';
}

function closeQuantityPopup() {
    document.getElementById('quantityPopup').style.display = 'none';
    selectedItem = null;
    selectedPrice = 0;
}

function addToOrderWithQuantity() {
    const quantity = parseInt(document.getElementById('quantity').value);
    if (quantity > 0 && selectedItem !== null) {
        addToOrder(selectedItem, selectedPrice, quantity);
        closeQuantityPopup();
    }
}
