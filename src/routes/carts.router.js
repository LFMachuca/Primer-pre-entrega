import { Router } from "express";
const router = Router();

// METODO POST PARA CREAR UN CARRITO QUE TIENE UN ARRAY DE PRODUCTOS
router.post('/', (req, res) => {
    const { products } = req.body;
    if (!products) {
        res.status(400).json({ error: 'Faltan datos' });
        return;
    }
    const cartId = carts.length + 1;
    const cart = {
        id: cartId,
        products
    };

    carts.push(cart);
    res.status(201).json(cart);
});
//METODO GET PARA OBTENER TODOS LOS PRODUCTOS DEL CARRITO por ID DE CARRITO
router.get('/:cid', (req, res) => {
    const cartId = req.params.id;
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
        return;
    }

    res.json(cart);
});
//METODO POST PARA AGREGAR UN PRODUCTO AL ARRAY DE PRODUCTOS DEL CARRITO 
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        res.status(404).json({ error: 'Carrito inexistente' });
        return;
    }

    const productIndex = cart.products.findIndex((p) => p.product === productId);

    if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
    } else {
        cart.products.push({ product: productId, quantity: 1 });
    }

    res.status(201).json(cart);
});

export default router;