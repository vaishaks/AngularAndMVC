﻿var commonModule = angular.module('common', ['ngRoute']);
var mainModule = angular.module('main', ['common']);

commonModule.factory('viewModelHelper', function ($http, $q, $window, $location) { return MyApp.viewModelHelper($http, $q, $window, $location); });
commonModule.factory('validator', function () { return valJs.validator(); });

mainModule.controller("indexViewModel", function ($scope, $http, $q, $routeParams, $window, $location, viewModelHelper) {

    var self = this;

    $scope.sessionName = "ASP.NET MVC with Angular JS";
    $scope.friends = friends;
    $scope.myname = '';
    $scope.newFriend = {};
});

var friends = [
    {
        id: 1,
        first_name: 'Mallika',
        last_name: 'Chawda',
        alias: 'mallic'
    },
    {
        id: 2,
        first_name: 'Yash',
        last_name: 'Mehrotra',
        alias: 'yashm'
    },
    {
        id: 3,
        first_name: 'Aman',
        last_name: 'Swaika',
        alias: 'amansw'
    }
];

(function (myApp) {
    var viewModelHelper = function ($http, $q, $window, $location) {

        var self = this;

        self.modelIsValid = true;
        self.modelErrors = [];

        self.resetModelErrors = function () {
            self.modelErrors = [];
            self.modelIsValid = true;
        }

        self.apiGet = function (uri, data, success, failure, always) {
            self.modelIsValid = true;
            $http.get(MyApp.rootPath + uri, data)
                .then(function (result) {
                    success(result);
                    if (always != null)
                        always();
                }, function (result) {
                    if (failure != null) {
                        failure(result);
                    }
                    else {
                        var errorMessage = result.status + ':' + result.statusText;
                        if (result.data != null && result.data.Message != null)
                            errorMessage += ' - ' + result.data.Message;
                        self.modelErrors = [errorMessage];
                        self.modelIsValid = false;
                    }
                    if (always != null)
                        always();
                });
        }

        self.apiPost = function (uri, data, success, failure, always) {
            self.modelIsValid = true;
            $http.post(MyApp.rootPath + uri, data)
                .then(function (result) {
                    success(result);
                    if (always != null)
                        always();
                }, function (result) {
                    if (failure != null) {
                        failure(result);
                    }
                    else {
                        var errorMessage = result.status + ':' + result.statusText;
                        if (result.data != null && result.data.Message != null)
                            errorMessage += ' - ' + result.data.Message;
                        self.modelErrors = [errorMessage];
                        self.modelIsValid = false;
                    }
                    if (always != null)
                        always();
                });
        }

        self.goBack = function () {
            $window.history.back();
        }

        self.navigateTo = function (path) {
            $location.path(MyApp.rootPath + path);
        }

        self.refreshPage = function (path) {
            $window.location.href = MyApp.rootPath + path;
        }

        self.clone = function (obj) {
            return JSON.parse(JSON.stringify(obj))
        }

        return this;
    };
    myApp.viewModelHelper = viewModelHelper;
}(window.MyApp));
