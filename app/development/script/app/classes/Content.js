// requires jquery, gsap

function Content(el, width, bg, closeButton, noBG) {
    var $el = $(el),
        $close = $el.find(closeButton + ':eq(0)'),
        _this = this,
        _animating = false,
        _margin = (100 - width)/ 2,
        _bg = bg;

    // hack for now
    var $tasm = $('#ta2');

    $el.css({
        'position': 'absolute',
        'width': width + '%',
        'margin-left': _margin + '%',
        'margin-right': _margin + '%',
        'opacity': '0',
        'display': 'none'
    });

    if(noBG) {
        $el.css({
            'background': 'none'
        });
    }

    this.resize = function () {

    };

    this.resize();

    this.show = function () {
        _animating = true;
        $el.show();
        bg.setDim(.1);

        TweenLite.to($el,.3, {opacity: 1, ease: Quad.easeInOut, onComplete: function () {
            complete();
        }})
    };

    this.hide = function (c) {
        _animating = true;
        bg.setDim(1);

        TweenLite.to($el,.3, {opacity: 0, ease: Quad.easeInOut, onComplete: function () {
            complete();
            $el.hide();
            if (c)c.show();
        }})
    };

    function complete() {
        _animating = false;
    }

    if (closeButton) {
        $close.click(function () {
            _this.hide();
            // hack for now
            $tasm.fadeTo('fast', 1);
        });
    }

}