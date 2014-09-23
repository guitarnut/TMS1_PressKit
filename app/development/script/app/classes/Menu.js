// requires jQuery, gsap

function Menu(el, button, show, hide, overlay) {
    var BUTTON_OFF = .7,
        BUTTON_ON = .95;

    var $el = $(el),
        _show = new SimpleButton(show),
        _hide = new SimpleButton(hide),
        _this = this,
        $show = _show.getEl(),
        $hide = _hide.getEl(),
        $buttons = $(button),
        _overlay = overlay || null,
        _hiddenY;

    $el.css({
        'position': 'absolute',
        'top': '0',
        'z-index': '9000',
        'left': '0',
        'width': '100%'
    });

    $hide.hide();

    $show.click(function () {
        _this.open();
        $('html, body').animate({scrollTop: 0}, 1000);
    });

    $hide.click(function () {
        _this.close();
    });

    this.open = function() {
       // $hide.show();
        //$show.hide();
        TweenLite.to($el, .5, {top: 0, ease: Quad.easeInOut});
        if (_overlay != null) _overlay.dim(.8);
    };

    this.close = function() {
        //$hide.hide();
        //$show.show();
        TweenLite.to($el, .5, {top: _hiddenY, ease: Quad.easeInOut});
        if (_overlay != null) _overlay.hide();
    };

    $buttons.each(function () {
        var $this = $(this),
            b = new SimpleButton($this);
        $this.click(function() {
            _this.close();
        })
    });

    this.showMenu = function () {
        $el.css('opacity', '0');
        $el.show();
        TweenLite.to($el, .5, {opacity:.8});
    };

    this.hideMenu = function () {
        TweenLite.to($el, .5, {opacity: 0, onComplete: function () {
            $el.hide();
        }});
    };

    this.reset = function () {
        _hiddenY = (-1 * ($el.height())) + 'px';
    };

    this.reset();

    $el.css({
        'top': _hiddenY
    });

}