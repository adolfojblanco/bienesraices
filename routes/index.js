import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

import userRoutes from './userRoutes.js';

app.use('/usuario', userRoutes);

export default app;
