var KeyListener = (function() {

    var _listeners = [];

    window.onkeyup = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;

        for (var i = 0; i < _listeners.length; i++) {
            if (key === _listeners[0][0]) {
               var m = _listeners[0][1];
                m();
            }
        }
    };

    function setMethod(e,f) {
        _listeners.push([e,f]);
    }

    return {
        setMethod: setMethod
    }

})();