Parse.initialize("4QKhC5sL4BCBui2aNuiac4mSuOTXJILnOf3MP1fG", "jcAkgMYW30JRqAj7EQYtg4sxa2poD2d1nopy2s9x");
Parse.serverURL = 'https://tingxuanz.herokuapp.com/parse';
// Parse.serverURL = 'http://localhost:1337/parse';

angular.module('hackspace.addnewdevice',[])
    .controller('AddDeviceController', function($scope, $location){
        $scope.currentuser = Parse.User.current();
        $scope.device = {};
        var Device = Parse.Object.extend("Device");
        $scope.addDevice = function() {
            //validate the device name
            var name = $scope.device.name,
                location = $scope.device.location,
                collectInterval = $scope.device.collectInterval,
                access = $scope.device.accessibility;
            //status   = $scope.device.status;

            var device = new Device();

            device.set("deviceName", name);
            device.set("deviceLocation", location);
            device.set("interval", collectInterval);
            device.set("accessibility", access);
            //device.set("status", status);
            device.set("belongsTo", $scope.currentuser);
            var deviceQuery = new Parse.Query(Device);
            deviceQuery.equalTo("deviceName", name);
            deviceQuery.find({
                success: function (results) {
                    if (results.length > 0) {
                        alert("Device name already existed.");
                    } else {
                        device.save(null, {
                            success: function (device) {
                                //save done
                                alert("Device created, device ID: " + device.id);
                                $location.path("/device");
                                $scope.$apply();
                                //$scope.device = {};
                                //refresh the page
                            },
                            error: function (device, error) {
                                alert('Failed to create new device, with error code: ' + error.message);
                            }
                        });
                    }
                }
            });
        };

        $scope.goback = function(){
            $location.path('/device');
        };
    });
