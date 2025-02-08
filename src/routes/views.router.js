import { Router } from "express";
import ProductManager from '../fileManager/productManager'
const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
    try {
        const products = await productManager.readProducts()
        res.render('index', {products})
    } catch (error) {
        console.log(error);
    }
});

export default router;