/**
 * Created by petur on 2015-09-21.
 */


app.controller('RegisterController', ['$scope', '$window', 'AuthService', function ($scope, $window, AuthService) {

    $scope.registerUser = {
        username: "",
        repeatPassword: "",
        password: "",
        description: "",
        type : "user"
    };

    $scope.userRoles = ['user','guest','admin'];


    $scope.init = function () {
        $scope.registered = false;
    };

    $scope.register = function () {
        $scope.registerUserLoading = true;
        $scope.error = false;
        if ($scope.registerUser.repeatPassword === $scope.registerUser.password) {
            AuthService.register($scope.registerUser).then(function (response) {
                if (response.data.successfull === true) {
                    console.log("Register response", response.data);
                    $scope.registerUserLoading = false;
                    $scope.registered = true;
                    $window.scrollTo(0, 0);
                    $scope.registerUser = {
                        username: "",
                        repeatPassword: "",
                        password: "",
                        description: "",
                        type : "user"
                    };
                }
                else{
                    $scope.registerUserLoading = false;
                    $scope.error = true;
                }
            });
        }
        else {
            $scope.notMatching = true;
            $scope.registerUserLoading = false;

        }
    };

}]);