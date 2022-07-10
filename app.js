import express from 'express';
import db from './config/db.js';
import router from './routes/index.js';
const app = express();

//* Conexion a la base de datos
try {
  await db.authenticate();
  console.log('Conexion correcta a la Base de Datos');
} catch (error) {
  console.log(process.env);
  console.log(error);
}

//* Static Files
app.use(express.static('public'));

//* Template Engine
app.set('view engine', 'pug');
app.set('views', './views');

//* Routing
app.use('/', router);

//* Servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
