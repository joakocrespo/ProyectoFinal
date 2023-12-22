import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class ProductManager2 {
    constructor() {
        this.path = './Practicas/src/data/products.json';
    }

    readProduct = async () => {
        let respuesta = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(respuesta);
    }

    writeProduct = async (prod) => {
        await fs.writeFile(this.path, JSON.stringify(prod))
    }

    existProduct = async (id) => {
        let respuesta = await this.readProduct();
        return respuesta.find(prod => prod.id == id);

    }

    addProduct = async (prod) => {

        let response = await this.readProduct();

        prod.id = uuidv4();

        let allProducts = [...response, prod];
        await this.writeProduct(allProducts);
        return 'Producto agregado'
    }


    getProducts = async () => {

        let respuesta = await this.readProduct()
        return console.log(respuesta);

    }

    getProductById = async (id) => {
        let productById = await this.existProduct(id);
        if (!productById) return 'Producto no encontrado';
        let response = await this.readProduct();
        let filter = response.find(prod => prod.id == id);
        return filter;
    }



    updateProduct = async (id, prod) => {
        let productById = await this.existProduct(id);
        if (!productById) return 'Producto no encontrado';
        await this.deleteProduct(id);
        let prodFilter = await this.readProduct();
        let newStock = [ {...prod, id : id}, ...prodFilter ]
        await this.writeProduct(newStock);
        return 'Producto Actualizado!'
    }

    deleteProduct = async (id) => {
        let respuesta = await this.readProduct();
        let filterProduct = respuesta.filter(prod => prod.id != id);

        if (!filterProduct) return `Producto con ID: ${id} no encontrado`

        await this.writeProduct(filterProduct);
        return `Producto con ID: ${id} eliminado`
    }
}
