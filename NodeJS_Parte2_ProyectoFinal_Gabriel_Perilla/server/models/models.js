var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/teamapp');

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Error de conexión!'));
	db.once('open', function callback() {
		console.log('Base de datos Teamapp abierta');
	});

console.log('Esta Conectado a mongo');

module.exports = mongoose;