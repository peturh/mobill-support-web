app.controller('UsersController', ['$scope', 'UserService', function ($scope, UserService) {


    $scope.userRoles = ['user','guest','admin'];

    $scope.init = function () {
        if ($scope.$parent.isAdmin()) {
            getAll();
        }
    };

    $scope.saveUser = function(user){
        console.log("YAY");
        UserService.changeUser(user).then(function(response){
            console.log(response.data);
            getAll();
            window.alert("User successfully changed and saved.");
        },function(err){
            console.log("Error ",err);
        });
    };

    $scope.removeUser = function(id) {
        UserService.delete(id).then(function(){
            console.log(response.data);
            getAll();
            window.alert("User has been removed.");
        },function(err){
            console.log("Error"+ err);
        });
    };

    function getAll() {
        UserService.getAllUsers().then(function (response) {
            console.log("in controller", response.data);
            $scope.users = response.data;
        }, function (err) {
            console.log("Could not retrieve users",err);
        });
    }


}]);