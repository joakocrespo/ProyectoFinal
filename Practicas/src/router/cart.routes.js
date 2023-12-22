import { Router } from "express";
import CartManager from "../manager/cartManager.js";

const CartRoutes = Router();
const cart = new CartManager();

CartRoutes.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await cart.readCart());
    let allCart = await cart.readCart();
    let CartLimit = allCart.slice(0, limit);
    res.send(await CartLimit);
})

CartRoutes.get('/:id', async (req, res) => {
    let id = req.params.id;
    res.send(await cart.getCartById(id));
})


CartRoutes.post('/', async (req, res)=>{
    let newCart = req.body;
    res.send(await cart.addCart(newCart))
});

CartRoutes.put('/:id', async (req, res)=>{
    let id = req.params.id;
    let updateProd= req.body;
    res.send(await cart.updateCart(id, updateProd))
});

CartRoutes.delete('/:id', async (req, res) =>{
    let id = parseInt(req.params.id);
    res.send(await cart.deleteCart(id))
});

export default CartRoutes;