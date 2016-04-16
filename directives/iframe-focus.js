(function() {
    angular.module('iframeFocus', [
        //dependencies
    ]).directive('iframeFocus', iframeFocus);

    function iframeFocus() {
        return {
            link: function(scope, element) {

                element[0].addEventListener('load',function() {
                    //Firefox必须setTimeout，否则无效
                    setTimeout(function() {
                        try {
                            //chrome IE9+
                            element[0].contentWindow.focus();
                        } catch(error) {}
                    }, 0);
                });

            }
        }
    }

})();