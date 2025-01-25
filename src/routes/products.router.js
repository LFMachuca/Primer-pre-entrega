import { Router } from "express";
const router = Router();

/*CODIGOS DE ESTADO HTTP: 
200 OK : La solicitud ha tenido éxito. El significado de un éxito varía dependiendo del método HTTP:
201 Created : La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado de ello.
204 No Content : La solicitud se ha completado con éxito pero su respuesta no tiene ningún contenido.
400 Bad Request : Esta respuesta significa que el servidor no pudo interpretar la solicitud dada una sintaxis inválida.
404 Not Found : El servidor no pudo encontrar el contenido solicitado.
405 Method Not Allowed : El método de solicitud es conocido por el servidor pero ha sido deshabilitado y no puede ser utilizado.
500 Internal Server Error : El servidor ha encontrado una situación con la que no sabe cómo RESOLVER.
 */
let products = [];

// METODO GET PARA OBTENER TODOS LOS PRODUCTOS
 router.get('/', (req, res) => {
    res.json(products) 
});

// METODO GET PARA OBTENER UN PRODUCTO POR ID
router.get('/:pid', (req, res) => {
    const productId = req.params.id;
    const product = productos.find((producto) => producto.id === productoId);

    if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }

    res.json(product);
});

// METODO POST PARA CREAR UN PRODUCTO
router.post('/', (req, res) => {
    const {title, description, code, price, stauts, stock, category, thumbnails} = req.body;
    if (!title || !description || !code || !price || !stauts || !stock || !category || !thumbnails) {
        res.status(400).json({ error: 'Faltan datos' });
        return;
    }
    const IdProducts = productos.length + 1;
    const product = {
        id: IdProducts,
        title,
        description,
        code,
        price,
        stauts,
        stock,
        category,
        thumbnails
    };

    products.push(product);
    res.status(201).json(product);
});
 

// METODO PUT PARA ACTUALIZAR UN PRODUCTO

router.put('/:pid', (req, res) => {
    const productId = req.params.id;
    const updateProduct = req.body;
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex === -1) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }
    products[productIndex] = { ...products[productIndex], ...updateProduct };
    res.json(products[productIndex]);
});

// METODO DELETE PARA ELIMINAR UN PRODUCTO
router.delete('/:pid', (req, res) => {
    const productId = req.params.id;
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex === -1) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }
    products.splice(productIndex, 1);
    res.status(204).send({message: "Producto eliminado"});
});

export default router;