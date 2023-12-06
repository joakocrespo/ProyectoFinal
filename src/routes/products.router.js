const  router = require('express');
const productManager = require('../managers/productManager.js')

const productsRouter = router();


productsRouter.get('/', async (req, res)=>{
    try {
        const {limit} = req.query;
        const productos = productManager.getProducts();

        if (limit) {
            const limitedProducts = productos.slice(0, limit);
            return res.json(limitedProducts)            
        }
        return res.json(productos)
    }catch(error){
        console.log(error);
        res.send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS')
    }
})

productsRouter.get('/:pid', async (req, res) =>{
    try{
        const {pid} = req.params;
        const products = productManager.getProductById(pid);
        res.json(products);
    }catch(error){
        console.log(error);
        res.send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO POR ID ${pid}`)
    }
})

productsRouter.post('/', async (req, res) =>{
    try{
        const { nombre, categoria, memoria, stock, precio, img, code } = req.body;

        const reponse = await productManager.addProduct({ nombre, categoria, memoria, stock, precio, img, code })

        res.json(response);
    }catch{

    }
})


export {productsRouter};