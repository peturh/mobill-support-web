
app.directive('hideShow', [
    function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click',function(){
                    console.log("clicking");
                    $("#"+attr.theid).toggleClass('truncate');
                    $("#"+attr.theid+"editAndRemove").toggleClass('hidden');
                });
            }
        };
    }]);
