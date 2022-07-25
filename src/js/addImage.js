import { Dropzone } from 'dropzone';

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
console.log(token);

Dropzone.options.image = {
  dictDefaultMessage: 'Sube tus imágenes aquí',
  acceptedFiles: '.png,.jpg,.jpeg',
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictRemoveFile: 'Borrar Imagen',
  dictMaxFilesExceeded: 'El limite es una imagen',
  headers: {
    'CSRF-Token': token,
  },
  paramName: 'image',
  init: function () {
    const dropzone = this;
    const btnPublicar = document.querySelector('#publicar');

    btnPublicar.addEventListener('click', function () {
      dropzone.processQueue();
    });

    dropzone.on('queuecomplete', function () {
      if (dropzone.getActiveFiles().length == 0) {
        window.location.href = '/propiedades/mis-propiedades';
      }
    });
  },
};
