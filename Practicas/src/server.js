import express from "express";
import ProductRoutes from "./router/products.routes.js";
import CartRoutes from "./router/cart.routes.js";

const app = express();
const port = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/products', ProductRoutes)
app.use('/cart', CartRoutes)


app.listen(port, () => {
    console.log(`Puerto ${port} abierto y funcionando`);
});

