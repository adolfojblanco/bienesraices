import express from 'express';
import router from './routes/index.js';
const app = express();

//* Template Engine
app.set('view engine', 'pug');
app.set('views', './views');

//* Routing
app.use('/', router);

//* Servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
