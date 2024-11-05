
document.getElementsByTagName("button")[0].addEventListener("click", () => {
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.location.href = "/";
});

document.getElementById('whatsapp').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto
    window.open('https://wa.me/+573104260584', '_blank'); // Abrir WhatsApp en una nueva pestaña
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

  
  