
//Objeto con los metodos y evnetos necesarios del dibujo
DrawCanvas = {
		canvas:  null,
		bandera: false,
		pos: {},
		img: new Image, 
		ctx: null,
		inicio: function(img){
			if (this.canvas  && this.canvas.getContext) {
				this.ctx = this.canvas.getContext("2d");
				if (this.ctx){	return this.ctx
				}else {	alert("No soportado por el explorador.");
				}

			 } else {alert("No soportado por el explorador.");
			}
		},
		ajusta: function(xx, yy){
			var posCanvas = this.canvas.getBoundingClientRect();
			var x = xx - posCanvas.left;
			var y = yy - posCanvas.top;
			return {x:x, y:y};
		},
		dibuja: function(inicio, fin){
			this.ctx.beginPath();
			this.ctx.strokeStyle;
			this.ctx.lineWidth;
			this.ctx.moveTo(inicio.x, inicio.y);
			this.ctx.lineTo(fin.x, fin.y);
			this.ctx.stroke();
		},
		cargarImagen: function(imgName){
			this.img.src = '/img/'+ imgName;
			this.ctx.drawImage(img, 0, 0);
		}
};

$(document).ready(function(){

	DrawCanvas.canvas = document.getElementById("canvas");
	//eventos:
	DrawCanvas.canvas.onmousedown= function(e){
		this.pos = DrawCanvas.ajusta(e.clientX, e.clientY);
		this.bandera = true;
	};
	DrawCanvas.canvas.onmouseup= function(e){
		this.bandera = false;
	};
	DrawCanvas.canvas.onmousemove= function(e){
		if (this.bandera){
		var fin = DrawCanvas.ajusta(e.clientX, e.clientY);
		DrawCanvas.dibuja(this.pos, fin);
		this.pos = fin;
		}
	};

	//Inicia el dibujo
	DrawCanvas.inicio();


	$('#color').change(function(){
		DrawCanvas.ctx.strokeStyle = this.value;
	});
	$('#ancho').change(function(){
		DrawCanvas.ctx.lineWidth = this.value;
	});

	//Inicia un nuevo usuario
	var socket = io();
	socket.emit('new user', usuario);

	if (usuario != null){
		socket.emit('new user', usuario);
	}

	$('#cargarImagen').click(function(event){
		socket.emit('image', {image: imagen});
		return false;
	});

	//carga una imagen
	socket.on('image', function(info){
		if(info.image){
			var img = new Image();
			img.src =  'data:image/jpeg;base64,' + info.buffer;
			DrawCanvas.img.src = img.src;
			img.onload = function(){
				DrawCanvas.ctx.drawImage(DrawCanvas.img, 0, 0);
			}
		
		}
	})
	socket.on('new user', function(usuarios){
		$('#cuerpo-online').html('');
		$.each(usuarios, function(i, usuario){
			$('#cuerpo-online').append($('<li>').text(usuario));
		});
	});
	socket.on('user gone', function(usuarios){
		$('#cuerpo-online').html('');
		$.each(usuarios, function(i, usuario){
			$('#cuerpo-online').append($('<li>').text(usuario));
		});
	})
})