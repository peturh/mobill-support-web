/**
 * Created by petur on 2015-04-08.
 */

var app = angular.module('app', ['templates-main', 'ngTouch', 'ngRoute', 'angular-ladda']);

app.run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event) {

        /*if (!AuthService.isLoggedIn()) {
         console.log('DENY');
         //event.preventDefault();
         var path = $location.path();
         $location.path('login');
         }
         else {
         console.log('ALLOW');
         //$location.path('home');
         }*/
    });
}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'parts/start.html',
            controller: 'MainController'
        })
        .when('/servicedesk', {
            templateUrl: 'parts/servicedesk.html',
            controller: 'ServiceDeskController'
        })
        .when('/opensource', {
            templateUrl: 'parts/opensource.html',
            controller: 'OpenSourceController'
        })
        .when('/downloads', {
            templateUrl: 'parts/downloads.html',
            controller: 'DownloadController'
        })
        .when('/users', {
            templateUrl: 'parts/users.html',
            controller: 'UsersController'
        }).when('/login', {
            templateUrl: 'parts/login.html',
            controller: 'LoginController'
        }).when('/register', {
            templateUrl: 'parts/register.html',
            controller: 'RegisterController'
        }).when('/status', {
            templateUrl: 'parts/status.html',
            controller: 'StatusController'
        }).otherwise({redirectTo: '/'});

}])

    /*

     Init WOW

     */
    .config(function () {
        new WOW().init();
    });