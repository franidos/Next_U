var User = require('../models/user');
var _ = require('lodash');


//Controlador registro usuarios
exports.registro = function(req, res, next){ 

var body = _.pick(req.body, ['usuario', 'password']); 
var user = new User(body);

user.save(function(err, usuario){
	if(!err){res.status(201);
		next()
	}else{
		res.status(400);
		res.send('Problema al guadar el usuario');
	}
})
};