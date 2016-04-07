app.controller('DownloadController', ['$scope', 'DownloadService', 'AuthService', function ($scope, DownloadService) {


    $scope.newDownload = {
        title: "",
        url : "",
        type : "",
        description : ""
    };

    $scope.init = function () {
        if ($scope.$parent.isLoggedIn()) {
            console.log("is logged in");
            DownloadService.getAll().then(function (response) {
                $scope.downloads = response.data;
            });
        }
    };

    $scope.createDownload = function () {
        $scope.addedNewDownload = false;
        $scope.downloadLoading = true;
        DownloadService.create(
            $scope.newDownload.title,
            $scope.newDownload.type,
            $scope.newDownload.url,
            $scope.newDownload.description)
            .then(function (data) {
                $scope.addedNewDownload = true;
                $scope.downloadLoading = false;
                console.log(data);
                getAll();
            }, function (err) {
                $scope.addedNewDownload = false;
                window.alert("Could not save post to db." + err);
            });
    };

    $scope.removeDownload = function (id) {
        var confirm = window.confirm("Do you want to delete this?");
        if (confirm) {
            DownloadService.delete(id).then(function (response) {
                console.log(response.data);
                getAll();
            }, function (err) {
                console.log(err);
            });
        }

    };

    $scope.saveDownload = function (download) {
        var confirm = window.confirm("Do you want to save this?");
        if (confirm) {
            DownloadService.update(
                download.id,
                download.title,
                download.description,
                download.url,
                download.type)
                .then(function (response) {
                    console.log(response.data);
                },function(err){
                    console.log(err);
                    window.alert("Could not save. Error: "+err);
                });
        }
    };

    var getAll = function () {
        DownloadService.getAll().then(function (response) {
            console.log("in controller", response.data);
            $scope.downloads = response.data;
            $scope.newDownload = {
                title: "",
                url : "",
                type : "",
                description : ""
            };
        }, function (err) {
            console.log("Could not retrieve users");
            window.alert("Could not retrieve users, try again. " + err);
        });
    };



}]);