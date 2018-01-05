var models = require('./mongoose');
var Schema = models.Schema;



//Modelo imagen user
var imageSchema = new Schema({ 
	imgName: String,
	imgPath: String
});

var Imagen  = models.model('Imagen', imageSchema);
module.exports = Imagen;