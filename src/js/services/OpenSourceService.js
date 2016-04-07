app.service('OpenSourceService', ['$http', 'AuthService',function ($http,AuthService) {

    var service = {};

    service.getAll = function(){

        return $http(
            {
                method: 'GET',
                url: "support/opensource"
            }).success(function (data, status) {
                console.log("data",data);
                return data;
            }).error(function (err, status) {
                console.log(err);
            });

    };

    service.create = function(title,description,licence,licenceText){
        var request = {
            title: title,
            description: description,
            licence : licence,
            licenceText : licenceText,
            user : AuthService.getUser()
        };
        return $http(
            {
                method: 'POST',
                url: "support/opensource/create",
                data : request
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

    service.update = function(id,title,description,licence,licenceText){

        var request = {
            id:id,
            title: title,
            description: description,
            licence : licence,
            licenceText : licenceText,
            user : AuthService.getUser()
        };
        return $http(
            {
                method: 'POST',
                url: "support/opensource/update",
                data : request
            }).success(function (data, status) {
                console.log("data",data);
                return data;
            }).error(function (err, status) {
                console.log(err);
            });
    };


    service.get = function(id){

        var request = {
            id:id,
            user: AuthService.getUser()
        };
        return $http(
            {
                method: 'GET',
                url: "support/opensource/read",
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