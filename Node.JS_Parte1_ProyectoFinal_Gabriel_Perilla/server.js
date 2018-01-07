
//Modulos
const express = require('express'); 
var app = express();

var server = require('http').createServer(app);
var socketIO = require('socket.io');
var io = socketIO(server);
var redis = require('redis');

//rutas y passport
var routes = require('./routes/routes');
var local = require('./connection/local');
var twitter = require('./connection/twitter');

//Aquí almacenamos las variables de sesión
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var client = redis.createClient();

//Passport
var passport = require('passport');
var flash = require('connect-flash');
var fs = require('fs');
var path = require('path');
//Logger de peticiones http
var logger = require('morgan');
//Parsea las cookies y pobla el objeto req.cookies con un objeto de llaves, que tiene el nombre de la cookie
var cookieParser = require('cookie-parser');
//Parsea el cuerpo de las peticiones y respuestas http
var bodyParser = require('body-parser');
var path = require('path');
var swig = require('swig');
var _ = require('lodash');

var usuarios = [];
var clientes = [];

//Modelos
var Usuarios = require('./models/user');
var Imagenes = require('./models/image');

//Con esto le decimos a express, que motor de template utilizar, a lo que asignamos Swig.
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '\\view');
//Deshabilitar cache
app.set('view cache', false);
swig.setDefaults({cache: false});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Necesario para la gestión de las variables de sesión
app.use(session({
	store: new RedisStore({}),
	secret: 'nextapp'
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


passport.serializeUser(function(user, done){
	console.log('serializeUser: '+ user);
	done(null, user);

});

passport.deserializeUser(function(obj, done){
	console.log('deserializeUser: '+ obj);
	done(null, obj);
});

routes(app);
local(app);
twitter(app);

//Conexiones
io.on('connection', (socket)=>{

    socket.on('disconnect', ()=>{
        console.log('User desconectado');
        client.hdel('usuarios', socket.id.toString());   
        client.hgetall('usuarios', (err, usuarios)=>{
            io.emit('user gone', usuarios);
        }); 
    });
 
    socket.on('image', (imagen)=>{
        var imgPath = path.join(__dirname, '/public/img/', imagen.image);
        fs.readFile(imgPath, (err, buf)=>{
            socket.emit('image', { image: true, buffer: buf.toString('base64') });
            console.log('Image file is inicialize');
        });
        
    });

    socket.on('new user', function(nombre){
        console.log(socket.id, nombre);
        client.hset('usuarios', socket.id.toString(), nombre);
        client.hgetall('usuarios', (err, usuarios)=>{
            io.emit('new user', usuarios);
            console.log(usuarios);
        }); 
        Imagenes.find({}).exec((err, images)=>{
            if(err){console.log(err); }
            images.forEach((image, i)=>{
                socket.emit('chat message', image);
            });
        });
    });
});

server.listen(3000, function(){
	console.log('Corriendo en puerto 3000');
})