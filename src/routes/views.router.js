import { Router } from "express";
import productManager from '../fileManager/productManager.js'
const router = Router();
const Manager = new productManager();

router.get('/', async (req, res) => {
    try {
        const products = await Manager.getProducts()
        res.render('index', {products})
    } catch (error) {
        console.log(error);
    }
});

router.get("/realTimeProducts",(req,res)=>{
    const products = Manager.getProducts();
    res.render("realTimeProducts", {products});
});

export default router;