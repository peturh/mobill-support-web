
app.directive('editMode', [
    function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click',function(){
                    console.log("this clicks");
                    $("#"+attr.theid+"editMode").toggleClass("hidden");
                    $("#"+attr.theid+"editMode2").toggleClass("hidden");
                    $("#"+attr.theid+"editMode3").toggleClass("hidden");
                    $("#"+attr.theid+"viewMode").toggleClass("hidden");
                });
            }
        };
    }]);
