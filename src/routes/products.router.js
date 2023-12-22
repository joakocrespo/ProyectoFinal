import { Router } from 'express';
import { productManager } from '../index.js';

const productsRouter = Router();


productsRouter.get('/', async (req, res) => {
    try {

        const { limit } = req.query;
        const products = await productManager.getProducts()

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts)
        }
        return res.json(products)

    } catch (error) {

        console.log(error);
        res.send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS');

    }
})

productsRouter.get('/:pid', async (req, res) => {

    const { pid } = req.params;
    try {
        const products = await productManager.getProductById(pid)
        res.json(products);
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO POR ID ${pid}`)
    }

})

productsRouter.post('/', async (req, res) => {
    try {
        const { nombre, categoria, memoria, stock, precio, img, code } = req.body;

        const response = await productManager.addProduct({ nombre, categoria, memoria, stock, precio, img, code })

        res.json(response);
    } catch (error) {
        console.log('Error al intentar agregar producto');
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const { nombre, categoria, memoria, stock, precio, img, code } = req.body;
        const response = await productManager.updateProduct( pid, { nombre, categoria, memoria, stock, precio, img, code });
        res.json(response);
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar editar el producto con ID ${pid}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProduct(pid);
        res.send('Producto eliminado correctamente')
    } catch (error) {
        console.log(`Error al intentar eliminar producto con ID ${pid}`);
    }
})


export { productsRouter };