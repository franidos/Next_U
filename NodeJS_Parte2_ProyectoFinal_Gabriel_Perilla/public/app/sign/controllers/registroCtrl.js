angular.module('Teamapp').controller('registroCtrl', function($scope, $http, $state){

	$scope.usuario = {};

	$scope.register = function(){
		$scope.enviando = true;
		$state.transitionTo('app.dashboard');
		$http.post('/registro' , $scope.usuario)
		.then(function(response){
			var data = response.data;
			if (data.success) {
				if (data.logged) {
					$state.transitionTo('app.dashboard');
				}else{
					
					$state.go('login');
				}
			}else{
				console.log("Error al registrarse!");
				$scope.enviando = false;
			}
		});
	}
});