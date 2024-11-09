console.log('Archivo admin.js cargado');

document.addEventListener('DOMContentLoaded', function () {
    
    const addButtons = document.querySelectorAll('.add-to-cart');
    const cartIndicator = document.querySelector('.cart-indicator');

    function actualizarIndicadorCarrito() {

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length > 0) {

            cartIndicator.style.display = 'block';
        } else {

            cartIndicator.style.display = 'none';
        }
    }

    addButtons.forEach(button => {

        button.addEventListener('click', () => {

            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const product = { name: productName, price: productPrice };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            actualizarIndicadorCarrito();
            alert(`${productName} añadido al carrito`);

        });
    });

    actualizarIndicadorCarrito();
});

document.getElementsByTagName("button")[0].addEventListener("click", () => {
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.location.href = "/";
});

let index = 0;
const productos = document.querySelector('.contenedor');
const totalProductos = document.querySelectorAll('.producto').length;
const productosVisibles = 4;

function cambiar(direccion) {
    index += direccion;

 
    if (index < 0) {
        index = 0; 
    } 

    else if (index > totalProductos - productosVisibles) {
        index = totalProductos - productosVisibles;
        index = 0;
    }


    actualizarCarrusel();
}

function actualizarCarrusel() {
    const desplazamiento = index * -300; 
    productos.style.transform = `translateX(${desplazamiento}px)`;
}


setInterval(() => cambiar(1), 3500);
