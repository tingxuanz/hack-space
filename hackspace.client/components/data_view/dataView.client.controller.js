Parse.initialize("4QKhC5sL4BCBui2aNuiac4mSuOTXJILnOf3MP1fG", "jcAkgMYW30JRqAj7EQYtg4sxa2poD2d1nopy2s9x");
// Parse.serverURL = 'https://hack-space.herokuapp.com/parse';
Parse.serverURL = 'https://tingxuanz.herokuapp.com/parse';
// Parse.serverURL = 'http://localhost:1337/parse';

angular.module('hackspace.dataview',[])
    .controller('DataViewController', function($scope, $location, $routeParams, $http, $rootScope, NgMap){
      $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6-1guqbVE7yZwtNTm3b7P96dcqzBCI2M";
      NgMap.getMap().then(function(map) {
          console.log(map.getCenter());
          console.log('markers', map.markers);
          console.log('shapes', map.shapes);
        });
        //query the device name based on the device id
        var url = "http://api.openweathermap.org/data/2.5/";
        var url_weather = "weather?q=";
        var url_forecast = "forecast?q=";
        var url_options = "&mode=json&units=metric&appid=854164c5a375ff1614325cce73850dbe";

        var device_id = $routeParams.id;
        var Device = Parse.Object.extend("Device");
        var deviceQuery = new Parse.Query(Device);
        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        var generateStatOfArray = function(array){
            var counts = {};
            array.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
            return counts;
        };
        deviceQuery.equalTo("objectId", device_id);
        deviceQuery.find({
            success:function(results){
                // console.log(results.length);
                if (results.length > 0){
                    $scope.$apply(function(){
                        $scope.device_name = results[0].get("deviceName");

                        $scope.device_location = results[0].get("deviceLocation");

                        $rootScope.dataCollection = {
                            deviceName: $scope.device_name,
                            deviceID: device_id,
                            // deviceAttributes: $scope.attributes
                            deviceAttributes: []
                        };

                        var requestUrl = url + url_weather + $scope.device_location + url_options;
                        var forecastUrl = url + url_forecast + $scope.device_location + url_options;
                        $scope.forecast = [];
                        // Refresh page
                        var Data = Parse.Object.extend("EnvironmentalData");
                        var dataQuery = new Parse.Query(Data);
                        dataQuery.equalTo("devicename", $scope.device_name);
                        dataQuery.find({
                            success:function(results){
                              // console.log("dataQuery" + results.length);
                                $scope.$apply(function() {

                                    if (results.length > 0) {
                                        $scope.envData = results.slice(Math.max(results.length - 10 , 1));
                                        //alert(JSON.stringify(results));
                                        //create the canvas
                                        //init the chart data obj
                                        $scope.chartDataArray = [];
                                        var timestamps = [];
                                        $scope.attributes = [];
                                        var envData = JSON.parse(JSON.stringify($scope.envData));
                                        // figure out how many attributes the JSON message has and how many timestamps
                                        for (var data in envData) {
                                            for (var attr in envData[data]) {
                                                //alert(JSON.stringify(attr));
                                                if (attr == "createdAt") {
                                                    timestamps.push(envData[data][attr]);
                                                } else if ((attr != "objectId") && (attr != "devicename") && (attr != "updatedAt") && ($scope.attributes.indexOf(attr) < 0)) {
                                                    $scope.attributes.push(attr);
                                                }
                                            }
                                        }
                                        //generate the corresponding data structure
                                        for (var attr in $scope.attributes){
                                            var random_r = getRandomInt(0,255).toString();
                                            var random_g = getRandomInt(0,255).toString();
                                            var random_b = getRandomInt(0,255).toString();
                                            var data = {
                                                labels: timestamps,
                                                datasets: [
                                                    {
                                                        label: $scope.attributes[attr],
                                                        //random the color
                                                        fillColor: "rgba("+random_r+","+random_g+","+random_b+",0.5)",
                                                        strokeColor: "rgba("+random_r+","+random_g+","+random_b+",0.5)",
                                                        highlightFill: "rgba("+random_r+","+random_g+","+random_b+",1)",
                                                        highlightStroke: "rgba("+random_r+","+random_g+","+random_b+",1)",
                                                        data:[]
                                                    }
                                                ]
                                            };
                                            $scope.chartDataArray.push(data);
                                        }

                                        //add the corresponding data in the data structure
                                        for (var attr in $scope.attributes) {
                                            var name = $scope.attributes[attr];
                                            for (data in envData) {
                                                var val = envData[data][name];
                                                for (var obj in $scope.chartDataArray) {
                                                    if ($scope.chartDataArray[obj].datasets[0].label == name) {
                                                        $scope.chartDataArray[obj].datasets[0].data.push(val);
                                                    }
                                                }
                                            }
                                        }

                                        for (var i = 0; i < $scope.attributes.length; i++){
                                            //alert(typeof $scope.chartDataArray[i].datasets[0].data[0]);
                                            var ctx = document.getElementById("dataChart"+ i.toString()).getContext("2d");
                                            if (typeof $scope.chartDataArray[i].datasets[0].data[0] == "number"){
                                                //alert("dataChart"+ i.toString());
                                                var myChart = new Chart(ctx).Line($scope.chartDataArray[i]);
                                            } else if (typeof $scope.chartDataArray[i].datasets[0].data[0] == "string" || typeof $scope.chartDataArray[i].datasets[0].data[0] == "boolean"){
                                                var pieData = generateStatOfArray($scope.chartDataArray[i].datasets[0].data);
                                                $scope.chartDataArray[i] = [];
                                                for (var item in pieData){
                                                    var random_rp = getRandomInt(0,255).toString();
                                                    var random_gp = getRandomInt(0,255).toString();
                                                    var random_bp = getRandomInt(0,255).toString();
                                                    var onePieLabelData = {
                                                        value: pieData[item],
                                                        color: "rgba("+random_rp+","+random_gp+","+random_bp+",0.5)",
                                                        highlight: "rgba("+random_rp+","+random_gp+","+random_bp+",1)",
                                                        label: item
                                                    };
                                                    $scope.chartDataArray[i].push(onePieLabelData);
                                                }
                                                var myChart = new Chart(ctx).Doughnut($scope.chartDataArray[i]);
                                            }

                                        }
                                        $scope.tablehead = $scope.attributes;
                                        $scope.tablehead.unshift("createdAt");

                                        $http({
                                            method : "GET",
                                            url : requestUrl
                                        }).then(function mySuccess(response) {
                                            $scope.weather = response.data.weather[0].main;
                                            $scope.currentTemp = response.data.main.temp;
                                        }, function myError(response) {
                                            $scope.myWelcome = response;
                                        });
                                        $http({
                                            method : "GET",
                                            url : forecastUrl
                                        }).then(function mySuccess(response) {
                                            var forecastDetail = response.data.list;
                                            for(var i = 0; i < 7; i++){
                                                var forecastObj = {
                                                    timestamp: forecastDetail[i].dt_txt.substr(10,11),
                                                    forecastWeather: forecastDetail[i].weather[0].main,
                                                    forecastTemp: forecastDetail[i].main.temp
                                                };

                                                $scope.forecast.push(forecastObj);
                                            }
                                        }, function myError(response) {
                                            $scope.myWelcome = response;
                                        });

                                        // $rootScope.dataCollection = {
                                        //     deviceName: $scope.device_name,
                                        //     deviceID: device_id,
                                        //     deviceAttributes: $scope.attributes
                                        // }
                                    }
                                });
                            },
                            error:function(error){
                                alert("Error: " + error.code + " " + error.message);
                            }
                        })
                    });
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
          });
        });

        $scope.goback = function(){
            $location.path('/device');
        };

        $scope.goManage = function(){
            $location.path('/device/'+device_id+'/manage');
        };

    });
