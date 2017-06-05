Parse.initialize("4QKhC5sL4BCBui2aNuiac4mSuOTXJILnOf3MP1fG", "jcAkgMYW30JRqAj7EQYtg4sxa2poD2d1nopy2s9x");
// Parse.serverURL = 'https://hack-space.herokuapp.com/parse';

Parse.serverURL = 'http://localhost:1337/parse';

angular.module('hackspace.dataview',[])
    .controller('DataViewController', function($scope, $location, $routeParams, $http, $rootScope, NgMap){
      $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6-1guqbVE7yZwtNTm3b7P96dcqzBCI2M";
      NgMap.getMap().then(function(map) {
          console.log(map.getCenter());
          console.log('markers', map.markers);
          console.log('shapes', map.shapes);
        });
        //query the device name based on the device id
        // var url = "http://api.openweathermap.org/data/2.5/";
        // var url_weather = "weather?q=";
        // var url_forecast = "forecast?q=";
        // var url_options = "&mode=json&units=metric&appid=854164c5a375ff1614325cce73850dbe";

        var device_id = $routeParams.id;
        var Device = Parse.Object.extend("Device");
        var deviceQuery = new Parse.Query(Device);

        deviceQuery.equalTo("objectId", device_id);
        deviceQuery.find({
            success:function(results){
                // console.log(results.length);
                if (results.length > 0){
                    $scope.$apply(function(){
                        $scope.device_name = results[0].get("deviceName");

                        $rootScope.dataCollection = {
                            deviceName: $scope.device_name,
                            deviceID: device_id,
                            // deviceAttributes: $scope.attributes
                            deviceAttributes: []
                        };
                    })
                }
            },
            error:function(error){
                alert("Error: " + error.code + " " + error.message);
            }
        });

        var initialStatus = Parse.Object.extend("RealtimeStatus");
        var initialStatusQuery = new Parse.Query(initialStatus);
        initialStatusQuery.equalTo('device_id', device_id);
        initialStatusQuery.find({
          success: function(results) {
            console.log(results);
            var initial_status = results[0].get("data");
            console.log("initial_status", initial_status);
            $scope.$apply(function () {
              $scope.device_status = initial_status[0];

              var binElement = document.getElementById('bin-container');
              var wrappedBinElement = angular.element(binElement);
              wrappedBinElement.attr("bin-status", $scope.device_status * 100 + "%");

              if ($scope.device_status <= 0.3) {
                $scope.bin_style = {"background-color": "green"}
              } else if ($scope.device_status > 0.3 && $scope.device_status <= 0.7) {
                $scope.bin_style = {"background-color": "orange"}
              } else {
                $scope.bin_style = {
                  "background-color": "red"
                }
              }
            });
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });

        //live query of real time status
        var Status = Parse.Object.extend("RealtimeStatus");
        var statusQuery = new Parse.Query(Status);
        statusQuery.equalTo('device_id', device_id);
        var subscription = statusQuery.subscribe();
        subscription.on('open', () => {
          console.log('subscription opened');
        });

        subscription.on('update', (data) => {
          var status = data.get('data');
          console.log(status[0]);
          $scope.$apply(function () {
            $scope.device_status = status[0];
            var binElement = document.getElementById('bin-container');
            var wrappedBinElement = angular.element(binElement);
            wrappedBinElement.attr("bin-status", $scope.device_status * 100 + "%");
            if ($scope.device_status <= 0.3) {
              $scope.bin_style = {"background-color": "green"}
            } else if ($scope.device_status > 0.3 && $scope.device_status <= 0.7) {
              $scope.bin_style = {"background-color": "orange"}
            } else {
              $scope.bin_style = {
                "background-color": "red"
              }
            }
          });
        });

        $scope.goback = function(){
            $location.path('/device');
        };

        $scope.goManage = function(){
            $location.path('/device/'+device_id+'/manage');
        };

    });
