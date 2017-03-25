angular.module('hackspace.route',['ngRoute'])
    .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'shared/index_page/index.client.view.html'
        }).
        when('/signup', {
            templateUrl: 'shared/authentication_form/signup.client.view.html',
            controller: 'SignupController'
        }).
        when('/login', {
            templateUrl: 'shared/authentication_form/login.client.view.html',
            controller: 'LoginController'
        }).
        when('/user', {
            templateUrl: 'shared/user_setting/userSetting.client.view.html',
            controller: 'UserSettingController'
        }).
        when('/device', {
            templateUrl: 'shared/device_list/device.client.view.html',
            controller: 'DeviceController'
        }).
        when('/device/:id', {
            templateUrl: 'shared/data_view/dataview.client.view.html',
            controller: 'DataViewController'
        }).
        when('/device/:id/manage', {
            templateUrl: 'shared/management_page/dataManage.client.view.html',
            controller: 'DataManageController'
        }).
        when('/addnewdevice', {
            templateUrl: 'shared/add_device/addDevice.client.view.html',
            controller: 'AddDeviceController'
        }).
        when('/device/:id/edit', {
            templateUrl: 'shared/device_setting/deviceSetting.client.view.html',
            controller: 'EditDeviceController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);