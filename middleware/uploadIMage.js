import multer from 'multer';
import path from 'path';
import { genId } from '../helpers/tokens.js';

/**
 * Guardar imagenes en el servidor
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); // Ubicacion del archivo
  },
  filename: function (req, file, cb) {
    cb(null, genId() + path.extname(file.originalname)); // Nombre del archivo
  },
});

const upload = multer({ storage }); // Pasamos la config a multer

export default upload;
