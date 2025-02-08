import fs from 'fs';

class cartManager{
    constructor() {
        this.filePath = 'cart.json';
      }

        async readCarts() {
          try {
              const data = await fs.readFile(this.filePath, 'utf-8');
              return JSON.parse(data) || [];
          } catch (error) {
              if (error.code === 'ENOENT') {
                  return [];
              }else {
                  console.error('Error en leer los carritos', error);
                  throw error;
              }
          }
        }

      async createCart(){
        const carts= await this.readCarts();
        const newCart ={
            id: carts.lenght  +1,
            products:[]
        };
        this.carts.push(newCart);
        await fs.writeFileriteFile(this.filePath, JSON.stringify(this.products, null, 2))
        return newCart;
    }
//oobtener el carrito por el id
    
    async getCartById(id){
        const carts = await this.readFile();
        const cart = carts.find(c => c.id === id);
        if(!cart){
            return console.log("Carrito no encontrado");
        }else{

            return cart;
        }
    }
    //agregar productos
    async addProductsCart(cartId,productId,quantity){
        const carts = await this.readCarts();
        const cartIndex = carts.findIndex(c => c.id === cartId );

        if (cartIndex === -1) {
            console.log("Carrito no encontrado");
        }

        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(productId.id === productId);

        if (productIndex === -1) {
            cart.products.push({product:productId,quantity});

        }else{
            cart.products[productIndex].quantity++;
        }

        await fs.WriteFile(this.filePath, JSON.stringify(this.carts, null, 2));

    }
}
export default cartManager;