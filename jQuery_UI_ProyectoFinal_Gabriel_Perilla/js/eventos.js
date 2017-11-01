$(document).ready(function() {
	
	$(".fichaRed").draggable({ 
				cursor: 'pointer',
				revert: 'invalid' });
	$(".fichaAzul").draggable({ 
				cursor: 'pointer',
				revert: 'invalid' });

	for(i = 1; i<= 9; i++) {
	for(y = 1; y <= 8; y++) {
		celda_id = 'row-' + i + '-col-' + y;
		$("#" + celda_id).droppable({
			drop: function(event, ui) {
				 $(ui.draggable).appendTo($(this));
				 if(ui.draggable.hasClass("fichaRed")){ 
				 	$("#turno").text("-(Tu turno azul)");
				 	$("#turno").css("color","#1c94c4");
				 }
				 else{
				 	$("#turno").text("-(Tu turno rojo)");
				 	$("#turno").css("color","red");}					 	
				 },
			accept: function(d) { 
				var padreDiv = d.parent().prop('id');					
				var row = parseInt(padreDiv.substr(4, 1));
				var col = parseInt(padreDiv.substr(10, 1));
				var row_drop = parseInt($(this).attr("data-row"));
				var col_drop = parseInt($(this).attr("data-col"));
				if (d.hasClass( "fichaRed" )) {	
					return ((row_drop - 1) == row && (col_drop -1 == col || col_drop + 1 == col) && (! $(this).children().length > 0 ));	
				} 
				else if (d.hasClass( "fichaAzul" )){	
					return ((row_drop + 1) == row && (col_drop -1 == col || col_drop + 1 == col) && (! $(this).children().length > 0 ));						
				}
	    }
		});
		}
	}
});