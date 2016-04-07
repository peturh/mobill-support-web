

app.directive('loadPictures', [
    function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                /**
                    Neat script to download all pictures before going to different pages, first pageload will be slower,
                    but rest of user experience will be greatly enhanced.
                 */
                var images = [
                    'img/401.jpg',
                    'background.png',

                    'img/cellphonebright.jpg',
                    'img/cellphonedark.jpg',
                    'img/celphonetable.jpg',
                    'img/computer.jpg',
                    'img/crowd.jpg',
                    'img/log.jpg',
                    'img/status.jpg',
                    'img/typewriter.jpg',
                    'img/coputerdark.jpg'

                ];
                $(images).each(function() {
                    var image = $('<img />').attr('src', this);
                    console.log(image);
                });
            }
        };
    }]);



