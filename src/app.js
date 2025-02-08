import express from 'express';
import _dirname from './utils.js';

import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';  
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/',viewsRouter);

//configuracion de motor de plantillas
app.engine('handlebars',handlebars.engine());
app.set('views',_dirname + '/views');
app.set('view engine','handlebars');


const server = app.listen(8080, () => {
  console.log('Server is running on port 8080');
});  