Parse.initialize("4QKhC5sL4BCBui2aNuiac4mSuOTXJILnOf3MP1fG", "jcAkgMYW30JRqAj7EQYtg4sxa2poD2d1nopy2s9x");
Parse.serverURL = 'https://hack-space.herokuapp.com/parse';
// Parse.serverURL = 'http://localhost:1337/parse';

angular.module('hackspace.editdevice',[])
    .controller('EditDeviceController', function($scope, $location, $routeParams){
        $scope.currentuser = Parse.User.current();
        var device_id = $routeParams.id;
        var changed = false;
        $scope.device = {}
        var Device = Parse.Object.extend("Device");
        $scope.editDevice = function() {
            var query = new Parse.Query(Device);
            query.equalTo("objectId", device_id);
            query.find().then(function(results) {
                var result = results[0];
                var loc, col, acc;
                // The object was retrieved successfully.
                if ($scope.device.location != null) {
                    loc = $scope.device.location;
                } else {
                    loc = result.get("deviceLocation");
                }
                if ($scope.device.collectInterval != null) {
                    col = $scope.device.collectInterval;
                } else {
                    col = result.get("interval");
                }
                if ($scope.device.accessibility != null) {
                    acc = $scope.device.accessibility;
                } else {
                    acc = result.get("accessibility");
                }
                return result.save({
                    deviceLocation: loc,
                    interval: col,
                    accessibility: acc
                });
            }).then(function(results, error) {
                changed = true;
                return changed;
            });
            alert("Device updated." );
            $location.path("/device");
            $scope.$apply();
        };

        $scope.goback = function(){
            $location.path('/device');
        };
    });
