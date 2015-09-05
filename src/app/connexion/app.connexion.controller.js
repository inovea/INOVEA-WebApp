(function () {
    'use strict';

    angular
    .module('app')
    .controller('ConnexionCtrl', ConnexionCtrl);

    ConnexionCtrl.$inject = ['$log', '$scope', '$http', '$location'];

    /* @ngInject */
    function ConnexionCtrl($log, $scope, $http, $location) {

            $scope.userMail ="";
            $scope.userPassword="";
            var serverUrl = "https://pure-tor-1824.herokuapp.com";
           

    		//Animation du panneau de connexion
    		$('#connexionPanel')
    		  .transition('hide')
 				.transition({
 					animation : 'drop',
 					duration   : '1.3s',
 			    })
            ;


 			//On connexionBtn click ==> Webservice connexion
    		$scope.connect = function(){

    		  $('#connexionBtn')
                .transition({
                    animation : 'jiggle',
                    duration : '0.5s'
                });

    	       setTimeout(function(){
                    //Stop loader and able inputs
                    startLoading();
                    
                }, 800);

    			

                var data = {
                    mail : $scope.userMail,
                    password : $scope.userPassword
                };


                console.log(JSON.stringify(data));
               $http.post(serverUrl+"/connexion", data).success(function(result){

                if(result.mail){
                    console.log(JSON.stringify(result));
                    alert('connexion réussie');
                    
                }
                   
                else{
                   alert('echec');
                   console.log(JSON.stringify(result));
                }
                    
                })


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


            $scope.showForgottenPassword = function(){
                $('.forgottenPasswordDimmer').dimmer('show');
            }

            $scope.hideForgottenPassword = function(){
                $('.forgottenPasswordDimmer').dimmer('hide');
            }

            
    	 }
})();