// requires jQuery, gsap

function ScrollDiv(el, quote, color) {
    var FADE_SPEED = 500,
        PAUSE,
        TWEEN;

    var $el = $(el),
        $img = $(el).children('img:eq(0)'),
        _quote = new CenterElement($(el).children(quote + ':eq(0)')) || null,
        _screenWidth = window.innerWidth,
        _next,
        _color = color,
        _this = this;

    $el.css({
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'z-index': '10000'
    });

    if (_color) {
        $el.css({
            'background-color': _color
        });
    }

    $img.css({
        'position': 'absolute',
        'top': '0'
    });

    function animate(d, t) {

        TWEEN = t;

        if (!_color) {
            var _endX, _imgWidth;

            _imgWidth = $img.width();

            switch (d) {
                case 'left':
                    $img.css({
                        'left': '0'
                    });
                    _endX = (_screenWidth - _imgWidth) + 'px';
                    break;
                case 'right':
                    $img.css({
                        'right': '0'
                    });
                    _endX = -1 * (_screenWidth - _imgWidth) + 'px';
                    break;
                default:
                    break;
            }

            TweenLite.to($img, t, {x: _endX, ease: Quad.easeInOut, onComplete: hide})
        } else {
            setTimeout(function () {
                hide();
            }, TWEEN);
        }
    };

    function hide() {
        $el.delay(PAUSE).fadeTo(FADE_SPEED, 0, function () {
            reset();
        });
    };

    function reset() {
        $el.hide();
        if (_next != null) _next();
    };

    this.resize = function () {
        // get content area size
        var _h = window.innerHeight,
            _w = window.innerWidth;

        $el.css({
            'height': _h + 'px',
            'width': _w + 'px'
        });

        // is it wide enough?  stretch it.
        if ($img.width() < _w) {
            $img.css({
                'width': _w + 'px',
                'height': 'auto'
            });
        };

        // is it too short after being widened? grow it.
        if($img.height() < _h) {
            $img.css({
                'height': _h + 'px',
                'width': 'auto'
            });
        }

    };

    this.show = function (direction, tween, delay, pause, callback) {
        _this.resize();

        PAUSE = pause * 1000;
        _next = callback || null;

        var _delay = delay || 0;

        $el.css({'opacity': '0'});
        $el.show();

        _quote.reset();

        $el.delay(_delay * 1000).fadeTo(FADE_SPEED, 1, function () {
            animate(direction, tween);
        });
    };

    this.totalTime = function () {
        return (PAUSE + FADE_SPEED * 2 + TWEEN * 1000) / 1000;
    };

    this.resize();
    reset();
}