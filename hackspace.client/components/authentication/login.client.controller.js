Parse.initialize("4QKhC5sL4BCBui2aNuiac4mSuOTXJILnOf3MP1fG", "jcAkgMYW30JRqAj7EQYtg4sxa2poD2d1nopy2s9x");
Parse.serverURL = 'https://hack-space.herokuapp.com/parse';
// Parse.serverURL = 'http://localhost:1337/parse';

angular.module('hackspace.login',[])
    .controller('LoginController', function($scope,$location){
        $scope.user = {};
        $scope.currentuser = Parse.User.current();
        if ($scope.currentuser){
            Parse.User.logOut();
        }
    $scope.login = function(){
            Parse.User.logIn($scope.user.username, $scope.user.password).then(
                function(user) {
                    // Do stuff after successful login
                    if (user.get("emailVerified") != false){

                        $scope.$apply(function(){
                            alert("Log in success!");
                            $location.path("/device");
                        });
                    } else {
                        alert("Please verify your email first.")
                    }

                },
                function(error) {
                    // The login failed. Check error to see why.
                    alert("Error: " + error.code + " " + error.message);
                });

        };
    });
