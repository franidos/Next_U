<?php

if(isset($_GET['metod']) && !empty($_GET['metod'])) {
      $metod = $_GET['metod'];

      if($metod == 'getAll'){
            $list = getAll();
            echo json_encode($list);
      }
      else if($metod == 'filters'){
            $precioInit =  $_GET['precioInit'];
            $precioFin =  $_GET['precioFin'];
            $tipo =  $_GET['tipo'];
            $ciudad =  $_GET['ciudad'];
            $listFilter = filters($precioInit, $precioFin, $tipo, $ciudad);
            echo json_encode($listFilter);
      }
  }
  // Obtiene y devuelve los datos de  data-1.json"
  function getAll(){
    $file = fopen("../data-1.json","r");
    $leer=fread($file, filesize("../data-1.json"));
    $data=json_decode($leer,true);
     fclose($file);
    return $data;
   
  }

 // Obtiene y devuelve los datos de  data-1.json con filtros deseados
  function filters($precioInit, $precioFin, $tipo, $ciudad){

    //Trae los datos
    $list=getAll();
    $listFilter = array();
    $precioItem = 0;
    $valid = true;
    //recorre los datos y filtra
    foreach ($list as $key => $value) {
            $valid = true;
            $precioItem = str_replace(array('$', ','), '' , $value['Precio']);
            if($precioItem < $precioInit || $precioFin < $precioItem)
              $valid = false;            

            if(!empty($ciudad) && $valid){
              if($ciudad != $value['Ciudad'])
                  $valid = false;              
            }
            if(!empty($tipo) && $valid){
              if($tipo != $value['Tipo'])
                  $valid = false;              
            }          

            if($valid)
              $listFilter[] = $value;            
    }
    return $listFilter;
  }
