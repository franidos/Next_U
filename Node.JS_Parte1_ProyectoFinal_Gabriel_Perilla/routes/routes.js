var user = require('../controllers/userController');
var Image = require('../controllers/imageController');


	//Rutas definidas de la app
 var rutas = function(app){

 	//Registro
 	app.get('/registro', function(req, res){
 		res.render('registro');
 	});
 
 	//Login
 	app.get('/', function(req, res){ 
 		res.render('login');
 	});

 	//GAleria
 	app.get('/galery', Image.getImages, function(req, res){
 		res.render('index',{
			usuario: req.session.passport.user.usuario,
			images: req.images
		});
 	});

 	//Registro
	app.post('/registro', user.registro, function(req, res){
 		res.redirect('/');
 	});

 	//Error
 	app.get('/error', function(req, res){
		res.render('loginInvalid');
	});

 	//SUbir imagenes
 	app.post('/upload', Image.uploadImage, function(req, res){
 		res.redirect('/galery');

 	});

 	//Subir imagen
 	app.get('/fileUp', function(req, res){
 		res.render('fileup');
 	});


 	//Lienzo de dibujo
 	app.get('/canvas/:imgName', function(req, res){
 		res.render('canvas', {
 			imgName: req.params.imgName,
 			usuario: req.session.passport.user.usuario,
 			twitName: req.session.passport.user.nombre
		 }); 
		
 	});

 };

 module.exports = rutas;