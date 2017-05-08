Parse.initialize("4QKhC5sL4BCBui2aNuiac4mSuOTXJILnOf3MP1fG", "jcAkgMYW30JRqAj7EQYtg4sxa2poD2d1nopy2s9x");
Parse.serverURL = 'https://hack-space.herokuapp.com/parse';

// Parse.serverURL = 'http://localhost:1337/parse';

angular.module('hackspace.usersetting',[])
    .controller('UserSettingController', function($scope, $location) {
        $scope.currentuser = Parse.User.current();

        if ($scope.currentuser){
            $scope.greeting = "Welcome, " + $scope.currentuser.get("displayName");
        } else {
            $scope.greeting = "Please log in"
        }

        $scope.update = function(){
            var username = $scope.user.username,
                password = $scope.user.password;

            if (username !== "keep" && password != "keep"){
                $scope.currentuser.set("displayName", username);
                $scope.currentuser.set("password", password);
                $scope.currentuser.save()
                    .then(
                    function(user) {
                        return user.fetch();
                    }
                    )
                    .then(
                        function(user) {
                            console.log('Updated', user);
                        },
                        function(error) {
                            console.log('Something went wrong', error);
                        }
                    );
            } else if (username !== "keep" && password == "keep"){
                $scope.currentuser.set("displayName", username);
                $scope.currentuser.save()
                    .then(
                        function(user) {
                            return user.fetch();
                        }
                    )
                    .then(
                        function(user) {
                            console.log('Updated', user);
                        },
                        function(error) {
                            console.log('Something went wrong', error);
                        }
                    );
            } else if (username == "keep" && password !== "keep"){
                $scope.currentuser.set("password", password);
                $scope.currentuser.save()
                    .then(
                        function(user) {
                            return user.fetch();
                        }
                    )
                    .then(
                        function(user) {
                            console.log('Updated', user);
                        },
                        function(error) {
                            console.log('Something went wrong', error);
                        }
                    );
            } else if (username.length <= 0 && password.length <= 0){
                alert("Nothing to update");
            }

        };



        $scope.logout = function(){
            Parse.User.logOut();
            $location.path("/");
            $scope.$apply();
        };

    });
