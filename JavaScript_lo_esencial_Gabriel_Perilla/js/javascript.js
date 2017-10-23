
//objeto json con los datos de estudiantes
var estudiantesJson = [
            {
                "codigo": "52353454",  "nombre": "Juan Roa", "nota": 4.5
            }, {
                "codigo": "225435435","nombre": "Rosa Perez",  "nota": 2.9
            }, {
                "codigo": "654345", "nombre": "Alirio Perez", "nota": 4.1
            }, {
                "codigo": "3453456","nombre": "Juan Martinez",  "nota": 1.2
            }, {
                "codigo": "8435325", "nombre": "Ana Hernandez", "nota": 3.0
            }, {
                "codigo": "11563455", "nombre": "Joan Morales", "nota": 4.9
            }, {
                "codigo": "84345534",  "nombre": "Maria Martinez", "nota": 5.0
            }, {
                "codigo": "3636252","nombre": "Sebas Hernandez","nota": 3.5
            }, {    
                "codigo": "8856766",  "nombre": "Gabriel Martinez", "nota": 1.8
            }, {
                "codigo": "85354544", "nombre": "Ester Vera","nota": 4.8
            }
        ];

//Lista los estudiantes ordenados por nombre en una tabla
function listarEstudiantes() {
        var resultado = "<tr><th>Código</th> <th>Nombre</th>  <th>Nota</th></tr>";
        estudiantesJson.sort(OrdenarNombreAscendente);
       
        for (var i = 0; i < estudiantesJson.length; i++) {
            resultado += " <tr><td>" + estudiantesJson[i].codigo + "</td> " + "<td>" + estudiantesJson[i].nombre + "</td>" + "<td>" + estudiantesJson[i].nota + "</td></tr>";
        }
        document.getElementById("estudiantes").innerHTML = resultado;
    }

//Obtiene la nota promedio del curso
function obtenerNotaPromedio() {
    var tit = "<strong>///-----------Nota Promedio--------///</strong><br>";
    var cantidad = estudiantesJson.length;
    var suma = 0;
    var total = 0;
    //debugger;
    for (i = 0; i < cantidad; i++) {
        suma += estudiantesJson[i].nota;
    }
    if(cantidad !== 0)
        total = suma / cantidad;
    document.getElementById("notaPromedio").innerHTML = tit + "La nota promedio del curso es: " + total;
}

//Obtiene la mejor nota del curso
function obtenerMayorNota() {
    var tit = "<strong>///-----------Mejor Nota-----------///</strong><br>";
    estudiantesJson.sort(OrdenarNotaDescendente);
    //Imprime el primer item que tiene la nota mayor segun el orden
    document.getElementById("mayorNota").innerHTML = tit + estudiantesJson[0].codigo + ": " + estudiantesJson[0].nombre + ":  " + estudiantesJson[0].nota;
}

//Obtiene la peor nota del curso
function obtenerMenorNota() {
    var tit = "<strong>///-----------Peor Nota-----------///</strong><br>";
     var cantidad = estudiantesJson.length;
    estudiantesJson.sort(OrdenarNotaDescendente);
    var estudiante = estudiantesJson[cantidad-1].codigo + ": " + estudiantesJson[cantidad-1].nombre + ":  " + estudiantesJson[cantidad-1].nota;
     //Imprime el ultimo item que tiene la nota menor segun el orden
    document.getElementById("menorNota").innerHTML = tit + estudiante;
}

//Permite ordenar por nota el objeto
function OrdenarNotaDescendente(x,y) {
    var r = (x.nota < y.nota) ? 1 : -1 ;
    return r;
}

//Permite ordenar por nombre el objeto
function OrdenarNombreAscendente(x,y) {
    var r = (x.nombre > y.nombre) ? 1 : -1 ;
    return r;
}

