Parse.initialize("4QKhC5sL4BCBui2aNuiac4mSuOTXJILnOf3MP1fG", "jcAkgMYW30JRqAj7EQYtg4sxa2poD2d1nopy2s9x");
Parse.serverURL = 'https://hack-space.herokuapp.com/parse';

// Parse.serverURL = 'http://localhost:1337/parse';

angular.module('hackspace.device',[])
    .controller('DeviceController', function($scope, $location){
        //set the nav tab number
        $scope.nav = 2;
        //retrieve current user
        $scope.currentuser = Parse.User.current();
        //retrieve public devices
        var Device = Parse.Object.extend("Device");
        var publicQuery = new Parse.Query(Device);
        publicQuery.equalTo("accessibility", "public");
        publicQuery.find({
            success:function(results){
                $scope.$apply(function(){
                    $scope.public_device = results;
                });
            },
            error:function(error){
                alert("Error: " + error.code + " " + error.message);
            }
        });

        //retrieve user's private devices
        //var Device = Parse.Object.extend("Device");
        var ownershipQuery = new Parse.Query(Device);
        ownershipQuery.equalTo("belongsTo", $scope.currentuser);
        ownershipQuery.equalTo("accessibility", "private");
        ownershipQuery.find({
            success:function(results){
                $scope.$apply(function(){
                    $scope.private_device = results;
                });
            },
            error:function(error){
                alert("Error: " + error.code + " " + error.message);
            }
        });

        $scope.device = {};
        if ($scope.currentuser){
            $scope.greeting = "Welcome, " + $scope.currentuser.get("displayName");
        } else {
            $scope.greeting = "Please log in"
        }

        $scope.addnew = function(){
            $location.path('/addnewdevice');
        };

        $scope.getUser = function(device){
            var user = JSON.stringify(device.get("belongsTo"));
            var current = JSON.stringify($scope.currentuser);

            //alert(JSON.stringify(user));
            if (user == current) {
                //alert("true");
                return true;
            } else {
                //alert("false");
                return false;
            }
        }

        //$scope.addDevice = function(){
        //    //validate the device name
        //    var name     = $scope.device.name,
        //        location = $scope.device.location,
        //        collectInterval = $scope.device.collectInterval,
        //        access = $scope.device.accessibility;
        //        //status   = $scope.device.status;
        //
        //    var device = new Device();
        //
        //    device.set("deviceName", name);
        //    device.set("deviceLocation", location);
        //    device.set("interval", collectInterval);
        //    device.set("accessibility", access);
        //    //device.set("status", status);
        //    device.set("belongsTo", $scope.currentuser);
        //    var deviceQuery = new Parse.Query(Device);
        //    deviceQuery.equalTo("deviceName", name);
        //    deviceQuery.find({
        //       success:function(results){
        //           if (results.length > 0) {
        //               alert("Device name already existed.");
        //           } else {
        //               device.save(null, {
        //                   success: function(device){
        //                       //save done
        //                       alert("Device created, device ID: " + device.id);
        //                       $location.path("/device");
        //                       //$scope.device = {};
        //                       //refresh the page
        //                   },
        //                   error: function(device, error){
        //                       alert('Failed to create new device, with error code: ' + error.message);
        //                   }
        //               });
        //           }
        //       }
        //    });
        //
        //};

    });
