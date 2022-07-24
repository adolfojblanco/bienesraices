import { Dropzone } from 'dropzone';

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
console.log(token);

Dropzone.options.image = {
  dictDefaultMessage: 'Sube tus imágenes aquí',
  acceptedFiles: '.png,.jpg,.jpeg',
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: true,
  addRemoveLinks: true,
  dictRemoveFile: 'Borrar Imagen',
  dictMaxFilesExceeded: 'El limite es una imagen',
  headers: {
    'CSRF-Token': token,
  },
};
