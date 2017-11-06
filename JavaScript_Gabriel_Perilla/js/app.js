
var operaciones = [];
var operacionCurrent = "";

function designClick(elem) {
		elem.target.style.width = "18%";
		elem.target.style.height = "50px";
		setTimeout(function(){
			    if(elem.target.parentElement.className == "col1"){
					elem.target.style.width = "29%";		
			    }	
			    else if(elem.target.parentElement.className == "col2"){
					elem.target.style.width = "90%";
					elem.target.style.height = "100%";
					return;
			    }
				else{
					elem.target.style.width = "22%";			
				}
				elem.target.style.height = "62.91px";
			}, 20);
		
}

function operar () {
		var num1 = "";
		var num2 = "";
		var res = 0;
		//Valida operaciones prioritarias
		for (var i = 0; i < operaciones.length; i++) {	 	
			 if(operaciones[i] == "r" &&  i >= 0){	
				res = Math.sqrt(parseFloat(operaciones[i+1]));
				
				operaciones[i-1] = res;
				operaciones[i+1] = res;
			}		   		
		}
		for (var i = 0; i < operaciones.length; i++) {	
		    if(operaciones[i] == "/" &&  i > 0){
				res = parseFloat(operaciones[i-1]) / parseFloat(operaciones[i+1]);
				operaciones[i-1] = res;
				operaciones[i+1] = res;
			}					
		}
		for (var i = 0; i < operaciones.length; i++) {	 
		    if(operaciones[i] == "*" &&  i > 0){	
				res = parseFloat(operaciones[i-1]) * parseFloat(operaciones[i+1]);
				operaciones[i-1] = res;
				operaciones[i+1] = res;
			}			
		}
		//Valida operaciones secundarias
		for (var i = 0; i < operaciones.length; i++) {
			 if(operaciones[i] == "-" &&  i > 0){
				res = parseFloat(operaciones[i-1]) - parseFloat(operaciones[i+1]);
				operaciones[i-1] = res;
				operaciones[i+1] = res;
			}
			else if(operaciones[i] == "+" &&  i > 0){
				res = parseFloat(operaciones[i-1]) + parseFloat(operaciones[i+1]);
				operaciones[i-1] = res;
				operaciones[i+1] = res;
			}			
		}
		res = res.toString().length > 8? res.toString().substring(0,8) : res;
		return parseFloat(res);	
		operacionCurrent = parseFloat(res);
		operaciones = [];
		operaciones.push(operacionCurrent);
}


var Calculadora = {
	init: function(){
		var teclas = document.getElementsByClassName("tecla");
		for (var i = 0; i < teclas.length; i++) {
			var elem = teclas[i];
			teclas[i].onclick = this.eventClick;			
	    }
	},
	eventClick: function(elem) {
		
		designClick(elem);
		if(elem.target.id == "on"){
			operaciones = [];
			operacionCurrent = "";
			document.getElementById("display").innerHTML = 0;
			return;
		}		
		else if(elem.target.id == "sign")
			operacionCurrent = operacionCurrent*-1;		
		else if(elem.target.id == "raiz"){
			if (operacionCurrent != "") 
				operaciones.push(operacionCurrent);
			operaciones.push("r");
			operacionCurrent = "";
		}
		else if(elem.target.id == "dividido"){
			operaciones.push(operacionCurrent);
			operaciones.push("/");
			operacionCurrent = "";
		}
		else if(elem.target.id == "por"){	
			operaciones.push(operacionCurrent);
			operaciones.push("*");
			operacionCurrent = "";
		}
		else if(elem.target.id == "menos"){
			operaciones.push(operacionCurrent);
			operaciones.push("-");
			operacionCurrent = "";
		}
		else if(elem.target.id == "mas"){
			operaciones.push(operacionCurrent);
			operaciones.push("+");
			operacionCurrent = "";
		}
		else if(operacionCurrent.length >= 8)
			return;
		else if(elem.target.id == "1")
			operacionCurrent += 1;
		else if(elem.target.id == "2")
			operacionCurrent += 2;
		else if(elem.target.id == "3")
			operacionCurrent += 3;
		else if(elem.target.id == "4")
			operacionCurrent += 4;
		else if(elem.target.id == "5")
			operacionCurrent += 5;
		else if(elem.target.id == "6")
			operacionCurrent += 6;
		else if(elem.target.id == "7")
			operacionCurrent += 7;
		else if(elem.target.id == "8")
			operacionCurrent += 8;
		else if(elem.target.id == "9")
			operacionCurrent += 9;
		else if(elem.target.id == "0")
			operacionCurrent += 0;
		else if(elem.target.id == "punto")
			operacionCurrent += (operacionCurrent != ""? "." : "0.");
		else if(elem.target.id == "igual"){
			operaciones.push(operacionCurrent);
			operacionCurrent = operar();
		}		
		document.getElementById("display").innerHTML = operacionCurrent != "" ? parseFloat(operacionCurrent) : operacionCurrent;	
	}	
}


Calculadora.init();



	



