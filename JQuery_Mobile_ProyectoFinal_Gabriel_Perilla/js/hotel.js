    function cambiarPagina(pag) {

        $.mobile.changePage("#" + pag, {
            transition: "flip"
        });
    }
    $(document).ready(function() {
        var hoteles = [];
        var marcador;
        var mapa;
        var latlngInicial = new google.maps.LatLng(25.760527, 80.192800); 

        //Hoteles iniciales
        var hotelCaribe = {
                codigo: 1,
                nombre: "Hotel Caribe",
                ciudad: "Cartagena",
                telefono: "7645466",
                estrellas: 5                
        }
        hoteles.push(hotelCaribe);
        var hotelTeq = {
                codigo: 2,
                nombre: "Hotel Tequendama",
                ciudad: "Bogota",
                telefono: "3434344",
                estrellas: 5                
        }    
        hoteles.push(hotelTeq);    

        $(".volver").click(function() {
            cambiarPagina("paginaInicio");
        });

        $("#btnRegistroHotel").click(function() {
            cambiarPagina("paginaRegistroHotel");
        });

        $("#btnGuardarhotel").click(function() {

            var codigo = hoteles.length+1;
            var nombre = $("#nombre").val();
            var ciudad = $("#ciudad").val();
            var telefono = $("#telefono").val();
            var estrellas = $("#estrellas").val();   
            var hotel = {
                codigo: codigo,
                nombre: nombre,
                ciudad: ciudad,
                telefono: telefono,
                estrellas: estrellas                
            }
            hoteles.push(hotel);            
            limpiarCampos();
            cambiarPagina("paginaInicio");

        });

        $("#btnListarHoteles").click(function() {         
            
            $('#listaHoteles').empty();
            for (var i = 0; i < hoteles.length; i++) {       
                var hotel = "";
                hotel += '<li><a href="#mapa" class="ui-btn" id="'+hoteles[i].codigo +'">';
                hotel += '<h3>' +hoteles[i].nombre+" - "+ hoteles[i].ciudad + '</h3>';
                hotel += '<p>Teléfono:' + hoteles[i].telefono + '</p><p>Estrellas:' + hoteles[i].estrellas + '</p></a></li>';
               $("#listaHoteles").append(hotel);
               $("#"+hoteles[i].codigo).on("click",function(e){
                    $("#ubica").text("Ubicacion:" + e.currentTarget.childNodes[0].innerHTML);
                    geoPosicion(e.currentTarget.childNodes[0].innerHTML);
               });
            }                   
            cambiarPagina("paginaInfoHoteles");
            $('#listaHoteles').listview('refresh');
            
        });

        function limpiarCampos() {

            $("#nombre").val("");
            $("#ciudad").val("");
            $("#telefono").val("");
            var selectestrellas = $("#estrellas");
            selectestrellas[0].selectedIndex = 0;
            selectestrellas.selectmenu("refresh")
        }

        function geoPosicion(dir) {           
            var geocoder = new google.maps.Geocoder();

              $.mobile.loading("show", {            
                text: "Buscando...",
                            textVisible: true,
                            theme: "a",
                            textonly: false,
                            html: ''    
            });

            geocoder.geocode({
                'address': dir
            }, function(resultados, estado) {
                if (estado == google.maps.GeocoderStatus.OK) {
                        marcador = new google.maps.Marker({
                        map: mapa,
                        position: resultados[0].geometry.location
                    });
                     mapa.setCenter(resultados[0].geometry.location);
                           $.mobile.loading("hide");
                } else {
                          $.mobile.loading("hide");
                    alert('Error en el servicio!!: ' + estado);
                }
            });
        }

        function mostrarMapa() {  
            var opciones = {            
                zoom: 5,
                center: latlngInicial,
                mapTypeId: google.maps.MapTypeId.ROADMAP        
            };                   
            mapa = new google.maps.Map(document.getElementById("mapa"), opciones);   
            marcador = new google.maps.Marker({            
                position: latlngInicial,
                map: mapa,
                title: "Punto"        
            });                          
        }
         mostrarMapa();
    })