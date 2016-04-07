app.controller('MainController', ['$scope', '$interval', '$window', 'AuthService', function ($scope, $interval, $window, AuthService) {

    $scope.init = function () {
        console.log("This runs");
        var loginObject = JSON.parse(localStorage.getItem('login'));
        if (loginObject !== null) {
            var diff = moment().diff(loginObject.time, 'minutes');
            if (diff < 15 && typeof loginObject.user !== "undefined") {
                AuthService.setUser(loginObject.user);
                $scope.userLogin = loginObject.user;
            }
        }
        var cookies = JSON.parse(localStorage.getItem('cookies'));
        if(cookies){
            $scope.acceptedCookies = true;
        }
        else{
            $scope.acceptedCookies = false;
        }

    };

    $interval(function () {
        //Logout the user after 15 minutes
        $scope.logout();

        //every fifteen minutes 60 * 1000 * 15
    }, 60 * 1000 *60);


    $scope.isLoggedIn = function () {
        return AuthService.isLoggedIn();
    };

    $scope.isAdmin = function () {
        return AuthService.isAdmin();
    };

    $scope.acceptCookies = function(){
      localStorage.setItem('cookies',true);
    };

    $scope.adminColumnClass = function () {
        if (AuthService.isAdmin()) {
            return "col-md-6";
        }
        else {
            return "col-md-12";
        }
    };

    $scope.userColumnClass = function () {
        if (AuthService.isUser()) {
            return "col-md-6";
        }
        else {
            return "col-md-12";
        }
    };


    $scope.isUser = function () {
        return AuthService.isUser();
    };

    $scope.logout = function () {
        $window.scrollTo(0, 0);
        localStorage.setItem("login", JSON.stringify({}));
        AuthService.logout();
    };

}]);