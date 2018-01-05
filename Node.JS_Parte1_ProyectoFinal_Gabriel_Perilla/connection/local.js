 


 //MOdulos
 var passport = require('passport');
 var passportLocal = require('passport-local');
 var localStrategy = passportLocal.Strategy;
 var User = require('../models/user'); 

 var localConnection = function(app){ 
 	passport.use('user', new localStrategy({
 		usernameField: 'usuario',
 		passwordField: 'password'
 	},
 	function(nombreuser, contrasena, done){

 		User.findOne({usuario: nombreuser}, function(err, user)
 		{
 			if(err){
 				return done(err);
 			}
 			if(!user){
 				return done(null, false, {message: 'Nombre de usuario invalido.'});
			}else{
				if(user.password != contrasena){
					return done(null, false, {message: 'Password invalido'});
				}else{
					return done(null, user);
				}
			}
 		});
 	}
));
app.post('/login',  passport.authenticate('user', {successRedirect: '/galery', failureRedirect: '/error', failureFlash: 'Usuario o Password invalidos'}));
 };

 module.exports = localConnection;