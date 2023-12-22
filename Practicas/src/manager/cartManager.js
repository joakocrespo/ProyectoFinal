import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class CartManager {
    constructor(){
        this.path = './Practicas/src/data/cart.json';
    }

    readCart = async () => {
        let response = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(response)
    }

    writeCart = async (prod) =>{
        await fs.writeFile(this.path, JSON.stringify(prod))
    }

    existCart = async (id) => {
        let respuesta = await this.readCart();
        return respuesta.find(prod => prod.id == id);

    }

    addCart = async (prod) => {

        let response = await this.readCart();

        prod.cantidad = 0;

        let allCarts = [...response, prod];
        await this.writeCart(allCarts);
        return 'Producto agregado'
    }

    getCarts = async () => {

        let respuesta = await this.readCart()
        return console.log(respuesta);
    }

    getCartById = async (id) => {
        let CartById = await this.existCart(id);
        if (!CartById) return 'Producto no encontrado';
        let response = await this.readCart();
        let filter = response.find(prod => prod.id == id);
        return filter;
    }

    updateCart = async (id, prod) => {
        let CartById = await this.existCart(id);
        if (!CartById) return 'Producto no encontrado';
        await this.deleteCart(id);
        let prodFilter = await this.readCart();
        let newStock = [ {...prod, id : id}, ...prodFilter ]
        await this.writeCart(newStock);
        return 'Producto Actualizado!'
    }

    deleteCart = async (id) => {
        let respuesta = await this.readCart();
        let filterCart = respuesta.filter(prod => prod.id != id);

        if (!filterCart) return `Producto con ID: ${id} no encontrado`

        await this.writeCart(filterCart);
        return `Producto con ID: ${id} eliminado`
    }
}