import express from 'express';
const app = express();

import userRoutes from './userRoutes.js';
import propiedadesRoutes from './propiedadesRoutes.js';

app.use('/usuario', userRoutes);
app.use('/propiedades', propiedadesRoutes);

export default app;
