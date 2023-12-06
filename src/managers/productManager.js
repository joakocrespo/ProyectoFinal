const fs = require('promises/fs');
const uuid = require('v4/uuid');

export class ProductManager {

    constructor() {
        this.path = 'products.json';
        this.products = [];
    }

    addProduct = async ({ nombre, categoria, memoria, stock, precio, img, code }) => {
        const id = uuid();

        let newProduct = { id, nombre, categoria, memoria, stock, precio, img, code }

        this.products = this.getProducts;
        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products));

        return newProduct;

    }

    getProducts = async () => {

        const response = await fs.readFile(this.path, "utf-8");
        const responseJSON = JSON.parse(response);

        return responseJSON;;
    }

    getProductById = async () => {
        const response = this.getProducts();

        const product = response.find(prod => prod.id === id);

        if (product) {
            return product;
        } else {
            console.log('Producto no encontrado');
        }
    }

    updateProduct = async (id, { ...data }) => {
        const products = this.getProducts();

        const index = products.findIndex(prod => prod.id === id);

        if (index !== -1) {
            products[index] = { id, ...data }
            await fs.writeFile(this.path, JSON.stringify(products));
            return reponse[index]
        } else {
            console.log('Producto no encontrado');
        }
    }

    deleteproduct = async (id) => {
        const products = this.getProducts();
        const index = products.findIndex(prod => prod.id === id);

        if (index !== -1) {
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products));             
        }else{
            console.log('Producto no encontrado');
        }
    }
}