import Express from 'express';
import  ProductManager  from './managers/productManager.js';
import { productsRouter } from './routes/products.router.js';

const app = Express();

const port = 8080;

export const productManager = new ProductManager;

app.use(Express.json());
app.use('/api/products', productsRouter);

app.listen(port, (req, res) => {
    console.log(`Servidor escuchando en puerto ${port}`);
})