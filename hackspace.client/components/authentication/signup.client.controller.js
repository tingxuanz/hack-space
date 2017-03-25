Parse.initialize("4QKhC5sL4BCBui2aNuiac4mSuOTXJILnOf3MP1fG", "jcAkgMYW30JRqAj7EQYtg4sxa2poD2d1nopy2s9x");

angular.module('hackspace.signup',[])
    .controller('SignupController', function($scope, $location){
        $scope.user = {};
        var parseUser = new Parse.User();
        $scope.currentuser = Parse.User.current();
        if ($scope.currentuser){
            Parse.User.logOut();
        }
        $scope.signup = function(){
            var username  = $scope.user.username,
                password  = $scope.user.password,
                email     = $scope.user.emailaddress;
                //studentid = $scope.user.studentid;
    //
    // Parse only support usename log in so I swap the username field and email field in the database
    //
            parseUser.set("username", email);
            parseUser.set("password", password);
            parseUser.set("email", email);
            parseUser.set("displayName", username);
    // other fields can be set just like with Parse.Object
    //        if (studentid.length != 0){
    //            parseUser.set("studentId", studentid);
    //        } else {
    //            parseUser.set("studentId", 000000);
    //        }
            parseUser.signUp(null, {
                success: function(user) {
                    // Hooray! Let them use the app now.
                    alert("Please Verify your Email first. Thank you!");
                    $location.path("/login");
                    $scope.$apply();
                },
                error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        };
    });