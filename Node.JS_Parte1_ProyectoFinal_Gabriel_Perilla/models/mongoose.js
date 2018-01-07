

//Modulo para schemas del sitio

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/nodeJSCurso');


console.log('Esta Conectado a mongo');
 
module.exports = mongoose;