let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(event) {

    const productName = event.target.dataset.name;
    const productPrice = parseFloat(event.target.dataset.price);

    const newProduct = {
        name: productName,
        price: productPrice
    };

    cart.push(newProduct);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const tableBody = document.querySelector("#cart-table tbody");
    tableBody.innerHTML = '';  

    if (cart.length === 0) {
        
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = 3;
        emptyCell.textContent = 'El carrito está vacío';
        emptyRow.appendChild(emptyCell);
        tableBody.appendChild(emptyRow);
        document.getElementById('total-price').textContent = '0.00'; 
        return;
    }

    let totalPrice = 0;  

    cart.forEach((product, index) => {
        const row = document.createElement('tr');

        
        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;

        
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${product.price.toFixed(2)}`;

        
        const actionCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = () => removeProduct(index); 
        actionCell.appendChild(removeButton);

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);

        totalPrice += product.price; 
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}


function removeProduct(index) {
    cart.splice(index, 1);  
    localStorage.setItem('cart', JSON.stringify(cart));  
    updateCart();  
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);  
});

updateCart();
