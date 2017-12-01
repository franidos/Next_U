var minute;
var second;
var Temporizar;
var checked = false;

//reinicia el jeugo
function ResetGame(checked) {
      minute = 0;
      second = 0;
      Temporizar = 0;
      clearTimeout(Temporizar);
      $(".btn-reinicio").text("Iniciar");
      if (checked) {
        $(".panel-tablero").show("slow");
        checked=false;
      };
  
}

//Finaliza el juego
function FinGame() {
  clearTimeout(Temporizar);
  $(".panel-tablero").hide("slow");
  $(".panel-score").animate(
      {
        width: "400"
      }, 1000
  );
   $(".btn-reinicio").text("Reiniciar");
  checked=true;
}

//Evento del btn de inicio
$(".btn-reinicio").on("click", function(){
      var txt =$(".btn-reinicio").text();
      if (txt=="Iniciar") {
        $(".btn-reinicio").text("Reiniciar");
        clearTimeout(Temporizar);
      }
      else {
        ResetGame(checked);
      }
      minute =0;
      second =0;
      $(".elemento").remove('img');
      $('#score-text').text("0");
      $('#movimientos-text').text("0");
      reloj();
      newCandy();
});


//Actualiza los turnos
function UpdateTurns(){
  var actualValue = Number($('#movimientos-text').text());
  var result = actualValue += 1;
  $('#movimientos-text').text(result);
}

//Actualiza los puntos
function UpdatePoints(eliminados){
  var PuntosActuales = Number($('#score-text').text());
  var PuntosNuevos = PuntosActuales += Number(eliminados);
  $('#score-text').text(PuntosNuevos);
}


//agrega los nuevos dulces para llenar espacios
function newCandy(){  
    for (var i = 1; i <8; i++) {
      for (var j = 1; j < 8; j++) {
        var candy= Math.floor((Math.random() * 4) + 1);
        var fila = "<div class='row-"+j+"'></div>";
        var ElementImg=document.createElement('img')
        $(".col-"+i).append(ElementImg)
        $(ElementImg).addClass('elemento')
        $(ElementImg).attr('src',"image/"+candy+".png")        
      }
    }
    newCandyEvent();
    ValidateV();
    ValidateH();
}

//Asigna eventos al arrastrar y soltar
function newCandyEvent() {
        $('img').draggable({
          containment: '.panel-tablero',
          droppable: 'img',
          revert: true,
          revertDuration: 200,
          grid: [50, 50],
            drag: function(event, candy){
              //Posiciona el dulce dentro del div al soltarlo
              candy.position.top = Math.min(50, candy.position.top);
              candy.position.bottom = Math.min(50, candy.position.bottom);
              candy.position.left = Math.min(50, candy.position.left);
              candy.position.right = Math.min(50, candy.position.right);
            }
            
          });
        $('img').droppable({
            drop: function(event, candy){
                var candy = $(candy.draggable);
                var dragSrc = candy.attr('src');
                var candyDrop = $(this);
                var dropSrc = candyDrop.attr('src');
                candy.attr('src', dropSrc);
                candyDrop.attr('src', dragSrc);
               Temporizar = setTimeout(function () {
                      ValidateV();
                      ValidateH();
                      UpdateTurns();
                }, 800);
            }
        });
       ValidateV();
       ValidateH();
    }


//Valida el movimiento verticalmente si coindice con otros dulces iguales
function ValidateV(){
  var deleted = 0
  for (var x = 1; x <8; x++) {
      var vertical=0;
      var candyPreview="";
      var candysDelete = new Array();
      for (var y = 0; y < 7; y++) {
        var candy= $(".col-"+x).children('img')[y].src;
          if (candy==candyPreview ) {
            vertical+=1;
              if (vertical==1) {
                candysDelete[1]=$(".col-"+x).children('img')[y-1];
              }
              candysDelete[vertical+1]=$(".col-"+x).children('img')[y];
          }
          else if (candy!=candyPreview && vertical<2){
              vertical=0;
              candysDelete = new Array();
          }
          var candyPreview = candy;
      }

      /*Borrado para los dulces*/
      if (vertical>=2){
        for (var i = 1; i <= vertical+1; i++) {          
          candysDelete[i].remove();
          deleted += 1;
        };
        UpdatePoints(candysDelete.length);
      };      
  }
    if (deleted>1) {
      spaceEmpty();
    };
}
//Valida el movimiento horizoltamente si coindice con otros dulces iguales
function ValidateH(){
  var deleted = 0
  for (var x = 1; x < 8; x++) {
    var horizontal=0;
    var candyPreview="";
    var candysDelete = new Array();
    var z=0
    for (var y = 0; y < 7; y++) {
      z+=1
      var candy = $(".col-"+z).children('img')[x-1].src;
      if (candy==candyPreview) {
        horizontal+=1;
        if (horizontal==1) {
          var anterior = z-1
          candysDelete[1]=$(".col-"+anterior).children('img')[x-1];
        }
        candysDelete[horizontal+1]=$(".col-"+z).children('img')[x-1]

      } else if (candy!=candyPreview && horizontal<2){
        horizontal=0;
        candysDelete = new Array();
      };
     var candyPreview = candy;
    };
    if (horizontal>=2){
      /*Borrado de los dulces*/
      for (var h = 1; h <= horizontal+1; h++) {
        candysDelete[h].remove();
        deleted += 1;
      }
      UpdatePoints(candysDelete.length);
    }; 
    if (deleted>1) {spaceEmpty();};
  };
      
}
//Agrega los dulces en los espacios vacios
function spaceEmpty(){
  for (var i = 1; i < 8; i++) {
    var hijos = 7- $(".col-"+i).children('img').length;
    for (var j = 0; j < hijos; j++) {
      var ClaseDulce= Math.floor((Math.random() * 4) + 1);
      var ElementImg=document.createElement('img')
      $(".col-"+i).prepend(ElementImg)
      $(ElementImg).addClass('elemento')
      $(ElementImg).attr('src',"image/"+ClaseDulce+".png")
    };
  };
  
  newCandyEvent();
}

//Contabiliza el tiempo transcurrido
function reloj() {
        var number = document.getElementById('timer');     
        var minutes = 1-minute;
        var seconds = 59-second;

        if (minute==2) {
          tiempo= "0:00:00";
          FinGame();
        }
        else {
         tiempo= "0" + ((minutes < 10) ? ":0" : ":") +(minutes) + ((seconds < 10) ? ":0" : ":") +  (seconds);
         Temporizar = setTimeout("reloj()",1000);
        }
        if (second==59) {
            minute+=1;
            second=0;
        }
        else 
          second += 1;

        number.innerHTML = tiempo;
}

