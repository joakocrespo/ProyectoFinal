const express = require('express');
const ProductManager = require('./managers/productManager.js');
const productsRouter = require('./routes/products.router.js')

const app = express();

const port = 8080;

export const productManager = new ProductManager;

app.use(express.json());
app.use('/products', productsRouter);

app.listen(port, (req, res) => {
    console.log(`Servidor escuchando en puerto ${port}`);
})