(function () {
    'use strict';

    angular
    .module('app')
    .controller('ConnexionCtrl', ConnexionCtrl);

    ConnexionCtrl.$inject = ['$log', '$scope', '$http'];

    /* @ngInject */
    function ConnexionCtrl($log, $scope, $http) {

    		//Animation du panneau de connexion
    		$('#connexionPanel')
    		.transition('hide')
 				.transition({
 					animation : 'scale',
 					duration   : '1s',
 			});


 			//On connexionBtn click ==> Webservice connexion
    		$scope.connect = function(){

    		
    			startLoading();


    			setTimeout(function(){
    				//Stop loader and able inputs
    				stopLoading();
    				
    			}, 2000);
    		}

    		/*
    			startLoading() : Disable inputs and start loader inside connexion button
    		*/
    		function startLoading(){
    			$('#username').attr("disabled", true);
    			$('#password').attr("disabled", true);
    			$("#connexionBtn").addClass("loading");
    		}

    		/*
    			stopLoading() : Able inputs and stop loader inside connexion button
    		*/
    		function stopLoading(){
    			$('#username').attr("disabled", false);
    			$('#password').attr("disabled", false);	
    			$("#connexionBtn").removeClass("loading");
    		}
    	 }
})();