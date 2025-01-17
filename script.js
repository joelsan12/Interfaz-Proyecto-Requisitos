let carrito = [];
const carritoLista = document.getElementById('carrito-lista');
const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');

// Función para actualizar el carrito
function actualizarCarrito() {
    carritoLista.innerHTML = `
        ${carrito.map(producto => `<li>${producto.nombre}: $${producto.precio.toFixed(2)}</li>`).join('')}
        <li>Productos: ${carrito.length}</li>
        <li>Total: $${carrito.reduce((total, producto) => total + producto.precio, 0).toFixed(2)}</li>
    `;
    guardarCarrito(); // Guardar el carrito cada vez que se actualiza
}

// Función para guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Cargar el carrito al cargar la página
window.onload = cargarCarrito;

// Agregar productos al carrito
agregarCarritoBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const productos = [
            { nombre: "Laptop 15 pulgadas", precio: 800.00 },
            { nombre: "Smartphone Android", precio: 500.00 },
            { nombre: "Auriculares inalámbricos", precio: 50.00 }
        ];
        const producto = productos[index];

        // Verificar si el producto ya está en el carrito
        if (!carrito.some(item => item.nombre === producto.nombre)) {
            carrito.push(producto);
            actualizarCarrito();
        } else {
            alert('Este producto ya está en tu carrito.');
        }
    });
});

// Finalizar compra
finalizarCompraBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
        alert('Compra finalizada. Gracias por tu compra!');
        carrito = []; // Vaciar carrito
        actualizarCarrito();
    } else {
        alert('Tu carrito está vacío.');
    }
});
