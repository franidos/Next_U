'use strict';

/* Services */
/* Se aplica el uso de servicios*/
var motoAppServices = angular.module('motoAppServices', ['ngResource']); //<---- Se agrega ng-resoruce para poder usar la libreria interna de angular

//Se declara el servicio moto! con una sola propiedad
motoAppServices.factory('Moto', ['$resource',
  function($resource){
    return $resource('motos/:motoId.json', {}, {
      query: {method:'GET', params:{motoId:'motos'}, isArray:true}
    });
  }]);
