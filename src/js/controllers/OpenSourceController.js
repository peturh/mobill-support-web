/**
 * Created by petur on 2015-09-11.
 */


app.controller('OpenSourceController', ['$scope', 'OpenSourceService', function ($scope, OpenSourceService) {


    $scope.newOpenSourceLibrary = {
        "name": "",
        "licence": "",
        "text": ""
    };


    $scope.init = function () {
        getAll();
    };

    $scope.createOpenSource = function () {
        $scope.addedNewOpenSource = false;
        $scope.openSourceLoading = true;
        OpenSourceService.create(
            $scope.newOpenSourceLibrary.title,
            $scope.newOpenSourceLibrary.description,
            $scope.newOpenSourceLibrary.licence,
            $scope.newOpenSourceLibrary.licenceText)
            .then(function (data) {
                $scope.newOpenSourceLibrary = {
                    "name": "",
                    "licence": "",
                    "text": ""
                };
                $scope.openSourceLoading = false;
                $scope.addedNewOpenSource = true;
                console.log(data);
                getAll();
            }, function (err) {
                $scope.openSourceLoading = true;
                window.alert("Could not save post to db." + err);
            });
    };

    $scope.removeOpenSource = function (id) {
        var confirm = window.confirm("Do you want to delete this?");
        if (confirm) {
            OpenSourceService.delete(id).then(function (response) {
                console.log(response.data);
                getAll();
            }, function (err) {
                console.log(err);
            });
        }

    };

    $scope.saveOpenSource = function (openSource) {
        var confirm = window.confirm("Do you want to save this?");
        if (confirm) {
            OpenSourceService.update(
                openSource.id,
                openSource.title,
                openSource.description,
                openSource.licence,
                openSource.licenceText)
                .then(function (response) {
                    console.log(response.data);
                },function(err){
                    console.log(err);
                    window.alert("Could not save. Error: "+err);
                });
        }
    };

    var getAll = function () {
        OpenSourceService.getAll().then(function (response) {
            console.log("in controller", response.data);
            $scope.openSourceList = response.data;
        }, function (err) {
            console.log("Could not retrieve users", err);
        });
    };


}]);