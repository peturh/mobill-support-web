app.service('DownloadService', ['$http', 'AuthService', function ($http, AuthService) {

    var service = {};

    service.getAll = function () {
        var request = {
            user: AuthService.getUser()
        };

        return $http(
            {
                method: 'POST',
                url: "support/download",
                data: request
            }).success(function (data, status) {
                console.log("data", data);
                return data;
            }).error(function (err, status) {
                console.log(err);
            });

    };

    service.create = function (title, type, url, description) {
        var request = {
            title: title,
            type: type,
            url: url,
            description: description,
            user: AuthService.getUser()
        };
        return $http(
            {
                method: 'POST',
                url: "support/download/create",
                data: request
            }).success(function (data, status) {
                console.log("data", data);
                return data;
            }).error(function (err, status) {
                console.log(err);
            });
    };

    service.delete = function (id) {
        var request = {
            id: id,
            user: AuthService.getUser()
        };
        return $http(
            {
                method: 'POST',
                url: "support/download/delete",
                data: request
            }).success(function (data, status) {
                console.log("data", data);
                return data;
            }).error(function (err, status) {
                console.log(err);
            });
    };

    service.update = function (id, title, description, url, type) {

        var request = {
            id: id,
            title: title,
            description: description,
            type: type,
            url: url,
            user: AuthService.getUser()
        };
        return $http(
            {
                method: 'POST',
                url: "support/download/update",
                data: request
            }).success(function (data, status) {
                console.log("data", data);
                return data;
            }).error(function (err, status) {
                console.log(err);
            });
    };


    service.get = function (id) {

        var request = {
            id: id
        };
        return $http(
            {
                method: 'GET',
                url: "support/download/read",
                data: request
            }).success(function (data, status) {
                console.log("data", data);
                return data;
            }).error(function (err, status) {
                console.log(err);
            });
    };


    return service;


}]);