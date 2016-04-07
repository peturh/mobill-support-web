/**
 * Created by petur on 2015-09-11.
 */

/**
 * Created by petur on 2015-08-06.
 */

app.directive("toggleMenu",[function () {
    return function(scope, element, attrs) {

        element.bind('click',function(e) {
            console.log("click");
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    };
}]);