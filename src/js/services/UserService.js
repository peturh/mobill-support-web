app.service('UserService', ['$http', 'AuthService', function ($http,AuthService) {

    var service = {};

    service.getAllUsers = function(){
        var request = {
            user : AuthService.getUser()
        };
        return $http(
            {
                method: 'POST',
                url: "support/users",
                data: request
            }).success(function (data, status) {
                console.log("data",data);
                return data;
            }).error(function (err, status) {
                console.log(err);
            });
    };

    service.changeUser = function(changedUser){
        /*
            Don't confuse the authentication with the user to be changed.
            User : The user that wants to change it
            changeUser : The user who is going to be changed
         */
        var request = {
            user : AuthService.getUser(),
            changeUser : changedUser
        };
        return $http(
            {
                method: 'POST',
                url: "support/user/edit",
                data: request
            }).success(function (data, status) {
                console.log("data",data);
                return data;
            }).error(function (err, status) {
                console.log(err);
            });
    };

    service.delete = function(id){
        var request = {
            id:id,
            user: AuthService.getUser()
        };
        return $http(
            {
                method: 'POST',
                url: "support/opensource/delete",
                data : request
            }).success(function (data, status) {
                console.log("data",data);
                return data;
            }).error(function (err, status) {
                console.log(err);
            });
    };

    return service;


}]);