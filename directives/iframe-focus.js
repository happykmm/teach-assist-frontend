(function() {
    angular.module('iframeFocus', [
        //dependencies
    ]).directive('iframeFocus', iframeFocus);

    function iframeFocus() {
        return {
            link: function(scope, element) {
                element[0].addEventListener('load',function() {
                    setTimeout(function() {
                        try {
                            //chrome IE9+
                            element[0].contentWindow.focus();
                            //IE
                            //element[0].document.getElementsByTagName('body')[0].focus()
                        } catch(error) {}
                    }, 1000);

                });

            }
        }
    }

})();