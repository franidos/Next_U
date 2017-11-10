
$(document).ready( function() {

   //Carga los datos
    (function(){       
        $.ajax({
            url: "server/search.php",
            dataType: "json",
            type: 'GET',
            data:{metod:'getAll'},
            success: function(response){

                  var ciudades = Array();
                  var tiposInm = Array();
                  $.map(response, function(dato){
                    
                    //Llena los valores sin repetir
                    if(ciudades.indexOf(dato.Ciudad) == -1)
                       ciudades.push(dato.Ciudad);
                    if(tiposInm.indexOf(dato.Tipo) == -1)
                       tiposInm.push(dato.Tipo);             

                  });

                  //crea los items de cada select 
                  for (var i = ciudades.length - 1; i >= 0; i--) {
                        var optionCity = '<option value="' + ciudades[i]+'">' + ciudades[i]+'</option>';                       
                        $('#selectCiudad').append(optionCity);
                  };
                   
                  for (var i = tiposInm.length - 1; i >= 0; i--) {
                        var optionTipo = '<option value="' + tiposInm[i]+'">' + tiposInm[i]+'</option>';
                        $('#selectTipo').append(optionTipo);
                  };

                //Asigna los datos a cada select
                var filterCiudad = $('#selectCiudad');
                filterCiudad.material_select();
                var filterTipo = $('#selectTipo');
                filterTipo.material_select();
                
            },
            error: function(err){
              console.log(err);
            }
          })
    })();

    //mostrar todos los registros en el boton
    $('#mostrarTodos').on('click', function() {
       
        $.ajax({
            url: "server/search.php",
            dataType: "json",
            type: 'GET',
            data:{metod:'getAll'},
            success: function(response){
              if(response){

                //Reasigna los datos a cada select
                var filterCiudad = $('#selectCiudad');
                filterCiudad.material_select();
                var filterTipo = $('#selectTipo');
                filterTipo.material_select();

                //Se remueven todos los resultados que anteriormente pudieron haber sido cargados
                $('.itemMostrado').remove();

                $.map(response, function(dato){
                  var item = '<div class="itemMostrado card">'+
                                    '<img src="img/home.jpg" alt="">'+
                                    '<div class="card-stacked">'+
                                      '<div class="card-content">'+
                                        '<div><b>Direccion: </b>' + dato.Direccion+'</div>'+
                                        '<div><b>Ciudad: </b>' + dato.Ciudad+'</div>'+
                                        '<div><b>Telefono: </b>' + dato.Telefono+'</div>'+
                                        '<div><b>Código postal: </b>' + dato.Codigo_Postal+'</div>'+ 
                                        '<div><b>Precio: </b><span class="precioTexto">' + dato.Precio+'</span></div>'+
                                        '<div><b>Tipo: </b>' + dato.Tipo+'</div>'+
                                      '</div>'+
                                      '<div class="card-action right-align"><a href="#">Ver más</a></div>'+
                                    '</div>'+
                                  '</div>'
                 
                  $('.colContenido').append(item)
                });
              };
            },
            error: function(err){
              console.log(err);
            }
          })

    });

    //mostrar los regsitros filtrados
    $('#formulario').submit(function(){ 

        event.preventDefault()
         var ciudad = $('#selectCiudad').val();
         var tipo = $('#selectTipo').val();       
        var precio = $('#rangoPrecio').val();
        var precioInit = precio.split(";")[0]
        var precioFin = precio.split(";")[1]
       
        $.ajax({
          url: "server/search.php",
          dataType: "json",
          type: 'GET',
          data:{metod:'filters',precioInit:precioInit, precioFin:precioFin, tipo:tipo, ciudad:ciudad},
          success: function(response){
            if(response){
              //Se remueven todos los resultados que anteriormente pudieron haber sido cargados
              $('.itemMostrado').remove();
               $.map(response, function(dato){
                  var item = '<div class="itemMostrado card">'+
                                    '<img src="img/home.jpg" alt="">'+
                                    '<div class="card-stacked">'+
                                      '<div class="card-content">'+
                                        '<div><b>Direccion: </b>' + dato.Direccion+'</div>'+
                                        '<div><b>Ciudad: </b>' + dato.Ciudad+'</div>'+
                                        '<div><b>Telefono: </b>' + dato.Telefono+'</div>'+
                                        '<div><b>Código postal: </b>' + dato.Codigo_Postal+'</div>'+ 
                                        '<div><b>Precio: </b><span class="precioTexto">' + dato.Precio+'</span></div>'+
                                        '<div><b>Tipo: </b>' + dato.Tipo+'</div>'+
                                      '</div>'+
                                      '<div class="card-action right-align"><a href="#">Ver más</a></div>'+
                                    '</div>'+
                                  '</div>'
                 
                  $('.colContenido').append(item)
              })
            }
          },
          error: function(err){
            console.log(err);
          }
        });
    });

 });

/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window).scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       //video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
       // video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
     // video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();
