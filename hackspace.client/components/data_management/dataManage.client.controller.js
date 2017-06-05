Parse.initialize("4QKhC5sL4BCBui2aNuiac4mSuOTXJILnOf3MP1fG", "jcAkgMYW30JRqAj7EQYtg4sxa2poD2d1nopy2s9x");

// Parse.serverURL = 'https://hack-space.herokuapp.com/parse';
Parse.serverURL = 'http://localhost:1337/parse';

angular.module('hackspace.datamanage',[])
    .controller('DataManageController', function($scope, $location, $rootScope, outputCategories, arduino, philiphue, screen, twitter, setNulls){
        //inherit root scope data
        console.log($rootScope.dataCollection);

        $scope.device_name = $rootScope.dataCollection.deviceName;
        $scope.device_id = $rootScope.dataCollection.deviceID;
        $scope.attributes = $rootScope.dataCollection.deviceAttributes;
        //go back button
        $scope.goback = function(){
            $rootScope.dataCollection = {};
            $location.path('/device/' + $scope.device_id);
        };

        $scope.choices = [
            {
                id: 'choice1',
                datatype:   {
                                availableOptions: [
                                    {id: '0', name: 'Select data type'},
                                    {id: '1', name: 'Instagram_hashtag'},
                                    {id: '2', name: 'Instagram_number'},
                                    {id: '3', name: 'Status'}
                                ],
                                selectedOption: {id: '0', name: 'Select data type'}
                            },
                operation:  {
                                availableOptions: [
                                    {id: '0', name: 'Select operation'},
                                    {id: '1', name: '<'},
                                    {id: '2', name: '<='},
                                    {id: '3', name: '=='},
                                    {id: '4', name: '>='},
                                    {id: '5', name: '>'},
                                    {id: '6', name: '!='}
                                ],
                                selectedOption: {id: '0', name: 'Select operation'}
                            },
                logicgate:  {
                                availableOptions: [
                                    {id: '0', name: 'Select logic gate'},
                                    {id: '1', name: 'AND'},
                                    {id: '2', name: 'OR'},
                                    {id: '3', name: 'NOT'}
                                ],
                                selectedOption: {id: '0', name: 'Select logic gate'}
                            }
            }
          //  ,{
          //       id: 'choice2',
          //       datatype:   {
          //           availableOptions: [
          //               {id: '0', name: 'Select data type'},
          //               {id: '1', name: 'Instagram_hashtag'},
          //               {id: '2', name: 'Instagram_number'}
          //           ],
          //           selectedOption: {id: '0', name: 'Select data type'}
          //       },
          //       operation:  {
          //           availableOptions: [
          //               {id: '0', name: 'Select operation'},
          //               {id: '1', name: '<'},
          //               {id: '2', name: '<='},
          //               {id: '3', name: '=='},
          //               {id: '4', name: '>='},
          //               {id: '5', name: '>'},
          //               {id: '6', name: '!='}
          //           ],
          //           selectedOption: {id: '0', name: 'Select operation'}
          //       },
          //       logicgate:  {
          //           availableOptions: [
          //               {id: '0', name: 'Select logic gate'},
          //               {id: '1', name: 'AND'},
          //               {id: '2', name: 'OR'},
          //               {id: '3', name: 'NOT'}
          //           ],
          //           selectedOption: {id: '0', name: 'Select logic gate'}
          //       }
          //   }
        ];

        // Add attributes in the datatype dropdown list
        for(var i = 0; i < $scope.attributes.length; i++){
            var id = (i + 3).toString();
            var obj = {
                id: id ,
                name: $scope.attributes[i]
            };
            for(var j = 0; j < $scope.choices.length; j++){
                $scope.choices[j].datatype.availableOptions.push(obj);
            }

        }


        // $scope.date = {
        //     availableOptions: [
        //         {id: '0', name: 'Select day'},
        //         {id: '1', name: 'Monday'},
        //         {id: '2', name: 'Tuesday'},
        //         {id: '3', name: 'Wednesday'},
        //         {id: '4', name: 'Thursday'},
        //         {id: '5', name: 'Friday'}
        //     ],
        //     selectedOption: {id: '0', name: 'Select day'}
        // };
        // $scope.time = {
        //     availableOptions: [
        //         {id: '0', name: 'Select time'},
        //         {id: '1', name: '9:00'},
        //         {id: '2', name: '10:00'},
        //         {id: '3', name: '11:00'},
        //         {id: '4', name: '12:00'},
        //         {id: '5', name: '13:00'},
        //         {id: '6', name: '14:00'},
        //         {id: '7', name: '15:00'},
        //         {id: '8', name: '16:00'},
        //         {id: '9', name: '17:00'}
        //     ],
        //     selectedOption: {id: '0', name: 'Select time'}
        // };



        $scope.outputCategories = outputCategories;
        //$scope.itemsuper.text = "Select Output";
        $scope.types = setNulls;
        $scope.changeData = function() {
            //console.log($scope.itemsuper);

            if($scope.itemsuper.text == "Arduino") {
                $scope.types = arduino;
            } else if($scope.itemsuper.text == "Philip Hue") {
                $scope.types = philiphue;
            } else if($scope.itemsuper.text == "Screen") {
                $scope.types = screen;
            } else if($scope.itemsuper.text == "Twitter") {
                $scope.types = twitter;
            } else {
                $scope.types = setNulls;
            }
        };
        $scope.addNewCondition = function(){
            var newItemNo = $scope.choices.length+1;
            var newID = 'choice'+newItemNo;
            var newObj = {
                id: newID,
                datatype:   {
                    availableOptions: [
                        {id: '0', name: 'Select data type'},
                        {id: '1', name: 'Instagram_hashtag'},
                        {id: '2', name: 'Instagram_number'},
                        {id: '3', name: 'Status'}
                    ],
                    selectedOption: {id: '0', name: 'Select data type'}
                },
                operation:  {
                    availableOptions: [
                        {id: '0', name: 'Select operation'},
                        {id: '1', name: '<'},
                        {id: '2', name: '<='},
                        {id: '3', name: '=='},
                        {id: '4', name: '>='},
                        {id: '5', name: '>'},
                        {id: '6', name: '!='}
                    ],
                    selectedOption: {id: '0', name: 'Select operation'}
                },
                logicgate:  {
                    availableOptions: [
                        {id: '0', name: 'Select logic gate'},
                        {id: '1', name: 'AND'},
                        {id: '2', name: 'OR'},
                        {id: '3', name: 'NOT'}
                    ],
                    selectedOption: {id: '0', name: 'Select logic gate'}
                }
            };
            for(var i = 0; i < $scope.attributes.length; i++){
                var id = (i + 3).toString();
                var obj = {
                    id: id ,
                    name: $scope.attributes[i]
                };
                newObj.datatype.availableOptions.push(obj);
            }
            $scope.choices.push(newObj);

        };

        $scope.removeChoice = function(){
            var lastItem = $scope.choices.length-1;
            $scope.choices.splice(lastItem);
        };
        $scope.submitrule = function(){
            //check the availability first
            //Parse.Cloud.run('checkAvailability', { day: $scope.date.selectedOption.name.toString(), time: $scope.time.selectedOption.name.toString() })
            //    .then(function(result) {
            //        alert("cloud code worked!");
            //        if (result == "200"){
                        //success: save rules
                        var Rule = Parse.Object.extend("Rule");
                        var newRule = new Rule();
                        var counter = 0;
                        for(var i = 0; i < $scope.choices.length; i++){
                            counter = counter + 1;
                            var newID = i + 1;
                            if ($scope.choices[i].datatype.selectedOption.name != "Select data type")
                            newRule.set("DataType"+newID, $scope.choices[i].datatype.selectedOption.name);
                            newRule.set("Operation"+newID, $scope.choices[i].operation.selectedOption.name);
                            newRule.set("DataValue"+newID, $scope.choices[i].datavalue);
                            if (i < $scope.choices.length - 1) {
                                newRule.set("LogicGate" + newID, $scope.choices[i].logicgate.selectedOption.name);
                            }
                        }
                        newRule.set("RuleCount", counter);
                        newRule.set("OutputType", $scope.itemsuper.text);
                        newRule.set("OutputAction", $scope.selectedAction.text);
                        // newRule.set("BookedDay", $scope.date.selectedOption.name);
                        // newRule.set("BookedHour", $scope.time.selectedOption.name);
                        newRule.set("targetDevice", $scope.device_name);
                        newRule.set("targetDeviceId", $scope.device_id);
                        newRule.save(null, {
                            success: function(result) {
                                // Execute any logic that should take place after the object is saved.
                                alert("Rule created. Thanks for using!");
                            },
                            error: function(result,error) {
                                // Execute any logic that should take place if the save fails.
                                // error is a Parse.Error with an error code and message.
                                alert('Failed to create new object, with error: ' + JSON.stringify(error.message));
                            }
                        });
            //        } else {
            //            //failed
            //            alert("Sorry, that time has been taken. Please change another time.")
            //        }
            //});


        };

    })
    .factory('outputCategories', function(){
        var categories = {};
        categories.cast = [
            {
                value: 'outputCategory_001',
                text: 'Arduino'
            },
            {
                value: 'outputCategory_002',
                text: 'Philip Hue'
            },
            {
                value: 'outputCategory_003',
                text: 'Screen'
            },
            {
                value: 'outputCategory_004',
                text: 'Twitter'
            }
        ];
        return categories;
    })
    .factory('arduino', function(){
        var arduino = {};
        arduino.cast = [
            {
                value: 'arduinoCategory_001',
                text: 'Play audio'
            },
            {
                value: 'arduinoCategory_002',
                text: 'Light'
            },
            {
                value: 'arduinoCategory_003',
                text: 'Customised'
            }
        ];
        return arduino;
    })
    .factory('philiphue', function(){
        var philip = {};
        philip.cast = [
            {
                value: 'philipCategory_001',
                text: 'Change light color'
            },
            {
                value: 'philipCategory_002',
                text: 'Customised'
            }
        ];
        return philip;
    })
    .factory('screen', function(){
        var screen = {};
        screen.cast = [
            {
                value: 'screenCategory_001',
                text: 'Start game'
            },
            {
                value: 'screenCategory_002',
                text: 'Customised'
            }
        ];
        return screen;
    })
    .factory('twitter', function(){
        var twitter = {};
        twitter.cast = [
            {
                value: 'screenCategory_001',
                text: 'New post'
            }
        ];
        return twitter;
    })
    .factory('setNulls',function(){
        var setNulls = {};
        setNulls.cast = [
            {
                value: "00",
                text: "Select Main"
            }
        ];
        return setNulls;
    });
