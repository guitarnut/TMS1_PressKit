// requres jquery, gsap

var TitleArt = function (el, el2, top, left, right, width, maxWidth) {

    var _ta = new PositionedElement(el, top, left, right, width, maxWidth),
        _delay = 8000,
        $el = $(el),
        $el2 = $(el2),
        _complete = false;

    // hide the resolving ta
    $el2.css('opacity', '0');

    function arm() {
        TweenLite.from($el, 2, {y: 50, opacity: 0, ease: Quad.easeInOut, delay: 1});
        // if nothing happens, stick to the plan and transition
        setTimeout(function () {
            if (!_complete) {
                _complete = true;
                start();
            }
        }, _delay);
    }

    // hide big ta
    function start() {
        TweenLite.to($el, 1, {opacity: 0, onComplete: transitionTA});
    }

    // show small ta
    function transitionTA() {
        $el.hide();
        TweenLite.to($el2, 2, {opacity: 1});
    }


    // resize the big ta if needed, while it's still showing
    function reset() {
        if (!_complete) _ta.reset();
    }

    // don't wait, transition them now
    function cancel() {
        _complete = true;
        start();
    }

    return {
        reset: reset,
        cancel: cancel,
        arm: arm
    }
};