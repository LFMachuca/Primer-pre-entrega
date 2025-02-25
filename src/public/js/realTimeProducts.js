const socket = io();

const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");

productForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const nombre = productForm.nombre.value;
    const precio = productForm.precio.value;

    socket.emit("addProduct",{nombre,precio});
    productForm.reset();
});