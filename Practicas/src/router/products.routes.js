import { Router } from "express";
import ProductManager2 from "../manager/ProductManager2.js"

const ProductRoutes = Router();
const productos = new ProductManager2();

ProductRoutes.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await productos.readProduct());
    let allProducts = await productos.readProduct();
    let productLimit = allProducts.slice(0, limit);
    res.send(await productLimit);
})

ProductRoutes.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    res.send(await productos.getProductById(id));
})


ProductRoutes.post('/', async (req, res)=>{
    let newProduct = req.body;
    res.send(await productos.addProduct(newProduct))
});

ProductRoutes.put('/:id', async (req, res)=>{
    let id = req.params.id;
    let updateProd= req.body;
    res.send(await productos.updateProduct(id, updateProd))
});

ProductRoutes.delete('/:id', async (req, res) =>{
    let id = parseInt(req.params.id);
    res.send(await productos.deleteProduct(id))
});

export default ProductRoutes;