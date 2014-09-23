// requires jquery, gsap

function Overlay(el) {
    var $el = $(el);

    $el.css('height', window.innerHeight + 'px');

    function destroy() {
        $el.hide();
    };

    this.show = function () {
        $el.show();
        TweenLite.to($el, .5, {opacity: 1});
    };

    this.hide = function () {
        TweenLite.to($el, .5, {opacity: 0, onComplete: destroy});
    };

    this.dim = function (d) {
        $el.show();
        TweenLite.to($el, .5, {opacity: d});
    };

    this.resize = function() {
        $el.css('height', window.innerHeight + 'px');
    }

}