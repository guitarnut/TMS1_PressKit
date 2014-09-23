// requires jquery, gsap

function SimpleButton(el) {
    var BUTTON_OFF = .7,
        BUTTON_ON = .95;

    var $el = $(el);

    $el.css({
        'opacity': BUTTON_OFF,
        'cursor': 'pointer'
    });

    $el.mouseover(function () {
        TweenLite.to($el, .5, {opacity: BUTTON_ON});
    });

    $el.mouseout(function () {
        TweenLite.to($el, .5, {opacity: BUTTON_OFF});
    });

    this.getEl = function() {
        return $el;
    }

}