app.controller('NavController', ['$scope', '$location','$window', 'AuthService', function ($scope, $location,$window,AuthService) {

    $scope.goDownloads = function () {
        $window.scrollTo(0, 0);

        $location.path('downloads');
    };

    $scope.goUsers = function () {
        $window.scrollTo(0, 0);

        $location.path('users');
    };

    $scope.goServiceDesk = function () {
        $window.scrollTo(0, 0);

        $location.path('servicedesk');
    };

    $scope.users = function () {
        $window.scrollTo(0, 0);

        $location.path('users');
    };
    $scope.goOpenSource = function () {
        $window.scrollTo(0, 0);

        $location.path('opensource');
    };

    $scope.goLogin = function () {
        $window.scrollTo(0, 0);

        $location.path('login');
    };

    $scope.goRegister = function () {
        $window.scrollTo(0, 0);

        $location.path('register');
    };

    $scope.goHome = function () {
        $window.scrollTo(0, 0);

        $location.path('/');
    };

    $scope.goStatus = function () {
        $window.scrollTo(0, 0);

        $location.path('status');
    };

    $scope.goLogout = function () {
        $window.scrollTo(0, 0);

        $scope.logout();
        $location.path('/');
    };

    $scope.getUserName = function(){
        if(typeof AuthService.getUser() === 'undefined'){
            return "User";
        }
        else{
            return AuthService.getUser().username;
        }
    };


    $scope.isActive = function (viewLocation) {
        return viewLocation == $location.path();
    };
}]);