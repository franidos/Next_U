
    //forma de validar el form
    jQuery(document).ready(function($){
            $("#formulario").validate();
    });   

//Lista los estudiantes en una tabla
function listarEstudiantes() {

    var tabla = "";
    var tablaBase = $("#estudiantes");
    tabla += '<tr><th><center>CODIGO</center></th><th><center>NOMBRES</center></th><th><center>NOTA</center></th><th><center>MODIFICAR</center></th><th><center>ELIMINAR</center></th></tr>';
    for (var i = 0; i < localStorage.length; i++) {

        var clave = localStorage.key(i);
        var estudiante = $.parseJSON(localStorage.getItem(clave));

        tabla += '<tr>';
        tabla += '<td>' + estudiante.codigo + '</td>';
        tabla += '<td>' + estudiante.nombre + '</td>';
        tabla += '<td><center>' + estudiante.nota + '</center></td>';
        tabla += '<td><center><button onclick="editarEstudiante(\'' + estudiante.codigo + '\');">Editar</button></center></td>';
        tabla += '<td><center><button onclick="eliminarEstudiante(\'' + estudiante.codigo + '\');">Eliminar</button></center></td>';
        tabla += '</tr>';
    }
    $(tablaBase).html(tabla);
}

//Elimina un estudiante
function eliminarEstudiante(estudiante) {
    localStorage.removeItem(estudiante);
    listarEstudiantes();
}   
 //Edita un estudiante
function editarEstudiante(estudiante) {
    for (var i = 0; i < localStorage.length; i++) {

        var clave = localStorage.key(i);
        if (clave == estudiante) {
            estudiante = $.parseJSON(localStorage.getItem(clave));
            $("#codigo").val(estudiante.codigo);
            $("#nombres").val(estudiante.nombre);
            $("#nota").val(estudiante.nota);
        }
    }
}
//restablece los datos
function reestablecer() {
        $("#codigo").val("");
        $("#nombres").val("");
        $("#nota").val("");
}  

//Permite ordenar por nota el objeto
function OrdenarNotaDescendente(x,y) {
    var r = (x.nota < y.nota) ? 1 : -1 ;
    return r;
}

function listarJSON() {
    var estudiantesJson = new Array();
    for (var i = 0; i < localStorage.length; i++) {

            var clave = localStorage.key(i);
            var estudiante = $.parseJSON(localStorage.getItem(clave));
            estudiantesJson.push(estudiante);
    }
     estudiantesJson.sort(OrdenarNotaDescendente);
    return estudiantesJson;
}


//JQUERY
$().ready(function() {
   
    //Lista los estudiantes ordenados por nombre en una tabla
    $("#btnRegistrar").click(function() {

        var codigo = $("#codigo").val();
        var nombre = $("#nombres").val();
        var nota = $("#nota").val();
         if (nota == "") {
            nota = 0; }
        var estudiante = {
            codigo: codigo,
            nombre: nombre,
            nota: parseFloat(nota)
        };

        localStorage.setItem(codigo, JSON.stringify(estudiante));

        listarEstudiantes();
        reestablecer();
    });

    //Obtiene la nota promedio del curso
    $("#btnPromedio").click(function() {
        var tit = "<strong>///-----------Nota Promedio--------///</strong><br>";
        var cantidad = localStorage.length;
        var suma = 0;
        var total = 0;
        
        var estudiantesJson = listarJSON();

        for (i = 0; i < cantidad; i++) {
            suma += estudiantesJson[i].nota;
        }
        if(cantidad !== 0)
            total = suma / cantidad;
        $("#notaPromedio").html(tit + "La nota promedio del curso es: " + total);
        alert("La nota promedio del curso es: " + total);
    });

    //Obtiene la mejor nota del curso
    $("#btnMayorNota").click(function() {
        var tit = "<strong>///-----------Mejor Nota-----------///</strong><br>";
         var estudiantesJson = listarJSON();
        //Imprime el primer item que tiene la nota mayor segun el orden
        $("#mayorNota").html(tit + estudiantesJson[0].codigo + ": " + estudiantesJson[0].nombre + ":  " + estudiantesJson[0].nota);
         alert("Mejor Nota: " + estudiantesJson[0].codigo + ": " + estudiantesJson[0].nombre + ":  " + estudiantesJson[0].nota);
    });

    //Obtiene la peor nota del curso
    $("#btnMenorNota").click(function() {
        var tit = "<strong>///-----------Peor Nota-----------///</strong><br>";
         var cantidad = localStorage.length;
        var estudiantesJson = listarJSON();
        var estudiante = estudiantesJson[cantidad-1].codigo + ": " + estudiantesJson[cantidad-1].nombre + ":  " + estudiantesJson[cantidad-1].nota;
         //Imprime el ultimo item que tiene la nota menor segun el orden
        $("#menorNota").html(tit + estudiante);
        alert("Peor Nota: " + estudiante);
    });

    //Lista los datos
     listarEstudiantes();
   
});  
   