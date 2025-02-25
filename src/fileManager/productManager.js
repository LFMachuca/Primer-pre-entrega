import fs from 'fs/promises';

class productManager {
  constructor() {
    this.filePath = 'products.json';
  }

  //ALMACENAR UN PRODUCTO
 async addProduct(product) {
    try {
        let products= await this.readProducts();
        
        products.push(product);

        await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2));

        console.log('Producto agregado');
    } catch (error) {
        console.error('Error en agregar un producto', error);
    }
  }
async getProducts(){
 return await this.readProducts();
}

  async readProducts() {
    try {
        const data = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(data) || [];
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }else {
            console.error('Error en leer productos', error);
            throw error;
        }
    }
  }

  

}

export default productManager;