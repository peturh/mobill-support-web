app.controller('LoginController', ['$scope', '$window', 'AuthService', function ($scope, $window, AuthService) {


    $scope.userLogin = {
        "password": "",
        "username": "",
        "type": "",
        "token": ""
    };
    $scope.login = function () {
        $scope.wrongUsernameOrPassword = false;
        $scope.loginLoading = true;
        $scope.error = false;

        AuthService.login($scope.userLogin).then(function (response) {
            $scope.loginLoading = false;
            if (response.data.successfull === true) {
                console.log("data", response.data);
                $scope.userLogin.type = response.data.type;
                $scope.userLogin.token = response.data.token;
                AuthService.setUser($scope.userLogin);
                var loginObject = {
                    user: AuthService.getUser(),
                    time: new Date()
                };
                localStorage.setItem("login", JSON.stringify(loginObject));
                AuthService.setUser(response.data);
                $window.scrollTo(0, 0);
            }
            else{
                $scope.wrongUsernameOrPassword = true;
            }
        }, function(err){
            $scope.loginLoading = false;
            $scope.error = true;

        });
    };

}]);